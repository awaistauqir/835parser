// app/components/AnalyticsDashboard.tsx
"use client";

import { useMemo, useState } from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";

import { AdustmenCodes } from "@/lib/adustment-codes";
import { RemittanceCodes } from "@/lib/remittance-codes";
import type { Claim, ParsedEdiFile } from "@/types/edi";

// Lookup maps for descriptions
const adjustmentCodeMap = new Map(
  AdustmenCodes.map((c) => [c.code, c.description]),
);
const remarkCodeMap = new Map(
  RemittanceCodes.map((c) => [c.code, c.description]),
);

const ENCOUNTER_CODES = new Set(["T1015", "T1040", "G0467", "G0470", "D0999"]);

export function getClaimDashboardStatus(
  claim: Claim,
): "Paid" | "Denied" | "Pending" {
  const hasPaidEncounter = claim.serviceLines.some(
    (sl) => ENCOUNTER_CODES.has(sl.cpt) && sl.paidAmount > 0,
  );
  if (hasPaidEncounter) {
    return "Paid";
  }
  if (claim.claimStatusCode === "4") {
    return "Denied";
  }
  const pendingCodes = ["15", "16", "17", "25"];
  if (pendingCodes.includes(claim.claimStatusCode)) {
    return "Pending";
  }
  return "Paid";
}

interface DashboardFilter {
  type: "status" | "denial" | "adjustment" | "remark" | "date" | "payer";
  value: string;
  label: string;
}

interface AnalyticsDashboardProps {
  file: ParsedEdiFile;
  activeFilter: DashboardFilter | null;
  onSelectFilter: (filter: DashboardFilter | null) => void;
}

export default function AnalyticsDashboard({
  file,
  activeFilter,
  onSelectFilter,
}: AnalyticsDashboardProps) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  // State to track hovered chart element for tooltip display
  const [hoveredItem, setHoveredItem] = useState<{
    label: string;
    value: string | number;
    x: number;
    y: number;
  } | null>(null);

  // Extract all claims
  const allClaims = useMemo(() => {
    return file.checks.flatMap((check) => check.claims);
  }, [file]);

  // Aggregate Metrics
  const metrics = useMemo(() => {
    const totalClaims = allClaims.length;
    let paidCount = 0;
    let deniedCount = 0;
    let pendingCount = 0;

    let totalBilled = 0;
    let totalAllowed = 0;
    let totalPaid = 0;
    let totalPR = 0;
    let totalCO = 0;
    let totalWriteOffs = 0;

    // Financial calculations
    for (const claim of allClaims) {
      const status = getClaimDashboardStatus(claim);
      if (status === "Paid") paidCount++;
      else if (status === "Denied") deniedCount++;
      else if (status === "Pending") pendingCount++;

      totalBilled += claim.chargedAmount || 0;
      totalAllowed += claim.allowedAmount || 0;
      totalPaid += claim.paidAmount || 0;
      totalPR += claim.patientResponsibility || 0;

      const claimAdjustments = [
        ...claim.adjustments,
        ...claim.serviceLines.flatMap((sl) => sl.adjustments),
      ];

      for (const adj of claimAdjustments) {
        if (adj.code.startsWith("CO-")) {
          totalCO += adj.amount;
        }
        if (
          adj.code.startsWith("CO-") ||
          adj.code.startsWith("OA-") ||
          adj.code.startsWith("PI-")
        ) {
          totalWriteOffs += adj.amount;
        }
      }
    }

    return {
      totalClaims,
      paidCount,
      deniedCount,
      pendingCount,
      totalBilled,
      totalAllowed,
      totalPaid,
      totalPR,
      totalCO,
      totalWriteOffs,
    };
  }, [allClaims]);

  // Top Denial Reasons (Group identical CARC + RARC combinations together)
  const topDenials = useMemo(() => {
    const deniedClaims = allClaims.filter(
      (c) => getClaimDashboardStatus(c) === "Denied",
    );

    const counts: Record<
      string,
      { count: number; carc: string; rarc: string }
    > = {};

    for (const claim of deniedClaims) {
      // Find all unique CARC + RARC pairs in this claim
      const claimCARCs = new Set<string>();
      const claimRARCs = new Set<string>();

      // Claim level
      for (const adj of claim.adjustments) {
        claimCARCs.add(adj.code);
      }
      for (const r of claim.remarkCodes) {
        claimRARCs.add(r);
      }

      // Service line level
      for (const sl of claim.serviceLines) {
        for (const adj of sl.adjustments) {
          claimCARCs.add(adj.code);
        }
        for (const r of sl.remarkCodes) {
          claimRARCs.add(r);
        }
      }

      // Create unique pairs
      const carcs = Array.from(claimCARCs);
      const rarcs = Array.from(claimRARCs);

      if (carcs.length === 0 && rarcs.length === 0) {
        const key = "Unknown/None";
        counts[key] = counts[key] || { count: 0, carc: "", rarc: "" };
        counts[key].count++;
      } else {
        const pairs: [string, string][] = [];
        if (carcs.length > 0 && rarcs.length > 0) {
          for (const c of carcs) {
            for (const r of rarcs) {
              pairs.push([c, r]);
            }
          }
        } else if (carcs.length > 0) {
          for (const c of carcs) {
            pairs.push([c, ""]);
          }
        } else {
          for (const r of rarcs) {
            pairs.push(["", r]);
          }
        }

        // De-duplicate pairs per claim so we count "affected claims"
        const seenPairs = new Set<string>();
        for (const [carc, rarc] of pairs) {
          const pairKey = `${carc}||${rarc}`;
          if (!seenPairs.has(pairKey)) {
            seenPairs.add(pairKey);
            counts[pairKey] = counts[pairKey] || { count: 0, carc, rarc };
            counts[pairKey].count++;
          }
        }
      }
    }

    const totalDenied = deniedClaims.length;

    return Object.values(counts)
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)
      .map((item) => {
        const carcDesc = item.carc
          ? adjustmentCodeMap.get(item.carc.split("-")[1] || item.carc) || ""
          : "";
        const rarcDesc = item.rarc ? remarkCodeMap.get(item.rarc) || "" : "";

        let label = "Unknown Denial Reason";
        if (item.carc && item.rarc) {
          label = `${item.carc} + ${item.rarc}`;
        } else if (item.carc) {
          label = item.carc;
        } else if (item.rarc) {
          label = item.rarc;
        }

        let description = "";
        if (carcDesc && rarcDesc) {
          description = `${carcDesc} | ${rarcDesc}`;
        } else {
          description = carcDesc || rarcDesc || "No details available";
        }

        return {
          key: `${item.carc}||${item.rarc}`,
          label,
          description,
          count: item.count,
          percentage: totalDenied > 0 ? (item.count / totalDenied) * 100 : 0,
        };
      });
  }, [allClaims]);

  // Top CARC codes (All claims)
  const topAdjustments = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const claim of allClaims) {
      const uniqueCARCs = new Set<string>();
      for (const adj of claim.adjustments) {
        uniqueCARCs.add(adj.code);
      }
      for (const sl of claim.serviceLines) {
        for (const adj of sl.adjustments) {
          uniqueCARCs.add(adj.code);
        }
      }
      for (const carc of uniqueCARCs) {
        counts[carc] = (counts[carc] || 0) + 1;
      }
    }
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([code, count]) => {
        const plainCode = code.includes("-") ? code.split("-")[1] : code;
        return {
          code,
          description: adjustmentCodeMap.get(plainCode) || "Adjustment Reason",
          count,
        };
      });
  }, [allClaims]);

  // Payments by Check Date
  const paymentsByDate = useMemo(() => {
    const payments: Record<string, number> = {};
    for (const check of file.checks) {
      const date = check.issueDate || "No Date";
      payments[date] = (payments[date] || 0) + check.checkAmount;
    }
    return Object.entries(payments)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([date, amount]) => ({ date, amount }));
  }, [file]);

  // Payments by Payer
  const paymentsByPayer = useMemo(() => {
    const payments: Record<string, number> = {};
    for (const check of file.checks) {
      const payer = check.payerName || "Unknown Payer";
      payments[payer] = (payments[payer] || 0) + check.checkAmount;
    }
    return Object.entries(payments)
      .sort((a, b) => b[1] - a[1])
      .map(([payer, amount]) => ({ payer, amount }));
  }, [file]);

  // Chart segment click helper
  const handleChartClick = (
    type: DashboardFilter["type"],
    value: string,
    label: string,
  ) => {
    if (activeFilter?.type === type && activeFilter?.value === value) {
      onSelectFilter(null);
    } else {
      onSelectFilter({ type, value, label });
    }
  };

  // Render Pie Chart
  const renderPieChart = () => {
    const { paidCount, deniedCount, pendingCount } = metrics;
    const total = paidCount + deniedCount + pendingCount;
    if (total === 0) {
      return renderEmptyState("No Claim Data Available");
    }

    const pieData = [
      { id: 0, value: paidCount, label: "Paid", color: "#10b981" },
      { id: 1, value: deniedCount, label: "Denied", color: "#ef4444" },
      { id: 2, value: pendingCount, label: "Pending", color: "#f59e0b" },
    ].filter((d) => d.value > 0);

    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: 200,
        }}
      >
        <PieChart
          series={[
            {
              data: pieData,
              innerRadius: 30,
              outerRadius: 80,
              paddingAngle: 2,
              cornerRadius: 4,
            },
          ]}
          height={200}
          onItemClick={(_, item) => {
            const clicked = pieData[item.dataIndex];
            if (clicked) {
              handleChartClick(
                "status",
                clicked.label,
                `${clicked.label} Claims`,
              );
            }
          }}
        />
      </Box>
    );
  };

  // Render Horizontal Bar Chart
  const renderHorizontalBarChart = (
    data: { key: string; label: string; count: number; description?: string }[],
    type: DashboardFilter["type"],
  ) => {
    if (data.length === 0) {
      return renderEmptyState("No Data Available");
    }

    const dataset = [...data].reverse().map((d) => ({
      count: d.count,
      label: d.label,
      fullLabel: d.label,
      key: d.key,
      description: d.description,
    }));

    return (
      <Box sx={{ width: "100%", height: 260 }}>
        <BarChart
          dataset={dataset}
          yAxis={[{ scaleType: "band", dataKey: "label" }]}
          series={[
            {
              dataKey: "count",
              label: type === "denial" ? "Denied Claims" : "Adjustments Count",
              color:
                type === "denial"
                  ? theme.palette.error.main
                  : theme.palette.primary.main,
            },
          ]}
          layout="horizontal"
          height={260}
          margin={{ left: 20, right: 20, top: 20, bottom: 30 }}
          onItemClick={(_, item) => {
            const clicked = dataset[item.dataIndex];
            if (clicked) {
              handleChartClick(
                type,
                clicked.key,
                `${type.toUpperCase()}: ${clicked.fullLabel}`,
              );
            }
          }}
        />
      </Box>
    );
  };

  // Render Vertical Bar Chart (Payer, Date)
  const renderVerticalBarChart = (
    data: { label: string; amount: number; key: string }[],
    type: DashboardFilter["type"],
  ) => {
    if (data.length === 0) {
      return renderEmptyState("No Payments Recorded");
    }

    const dataset = data.map((d) => ({
      amount: d.amount,
      label: d.label.length > 15 ? `${d.label.substring(0, 12)}...` : d.label,
      fullLabel: d.label,
      key: d.key,
    }));

    return (
      <Box sx={{ width: "100%", height: 180 }}>
        <BarChart
          dataset={dataset}
          xAxis={[{ scaleType: "band", dataKey: "label" }]}
          series={[
            {
              dataKey: "amount",
              label: "Payment Amount ($)",
              color: type === "date" ? "#f59e0b" : "#8b5cf6",
            },
          ]}
          height={180}
          margin={{ left: 60, right: 10, top: 10, bottom: 30 }}
          onItemClick={(_, item) => {
            const clicked = dataset[item.dataIndex];
            if (clicked) {
              handleChartClick(
                type,
                clicked.key,
                `${type === "date" ? "Date" : "Payer"}: ${clicked.fullLabel}`,
              );
            }
          }}
        />
      </Box>
    );
  };

  const renderEmptyState = (msg: string) => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 160,
        backgroundColor: isDarkMode
          ? "rgba(255, 255, 255, 0.02)"
          : "rgba(0, 0, 0, 0.01)",
        borderRadius: 2,
        border: `1px dashed ${isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}`,
      }}
    >
      <Typography variant="body2" color="text.secondary">
        {msg}
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ mb: 4 }}>
      {/* Active Filter Bar */}
      {activeFilter && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 1.5,
            px: 2,
            mb: 3,
            borderRadius: 2,
            backgroundColor: `${theme.palette.primary.main}15`,
            border: `1px solid ${theme.palette.primary.main}40`,
          }}
        >
          <Typography variant="body2" color="primary.main" fontWeight="bold">
            Active Filter: {activeFilter.label}
          </Typography>
          <Button
            size="small"
            variant="contained"
            onClick={() => onSelectFilter(null)}
          >
            Clear Filter
          </Button>
        </Box>
      )}

      {/* Metrics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card
            sx={{
              background: isDarkMode
                ? "linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)"
                : "linear-gradient(135deg, #e0e7ff 0%, #ffffff 100%)",
              boxShadow: 3,
            }}
          >
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                Total Claims
              </Typography>
              <Typography variant="h4" fontWeight="bold" sx={{ mt: 1 }}>
                {metrics.totalClaims}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card
            sx={{
              background: isDarkMode
                ? "linear-gradient(135deg, #064e3b 0%, #0f172a 100%)"
                : "linear-gradient(135deg, #d1fae5 0%, #ffffff 100%)",
              boxShadow: 3,
            }}
          >
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                Paid Claims
              </Typography>
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{ mt: 1, color: "#10b981" }}
              >
                {metrics.paidCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card
            sx={{
              background: isDarkMode
                ? "linear-gradient(135deg, #7f1d1d 0%, #0f172a 100%)"
                : "linear-gradient(135deg, #fee2e2 0%, #ffffff 100%)",
              boxShadow: 3,
            }}
          >
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                Denied Claims
              </Typography>
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{ mt: 1, color: "#ef4444" }}
              >
                {metrics.deniedCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card
            sx={{
              background: isDarkMode
                ? "linear-gradient(135deg, #78350f 0%, #0f172a 100%)"
                : "linear-gradient(135deg, #fef3c7 0%, #ffffff 100%)",
              boxShadow: 3,
            }}
          >
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                Pending Claims
              </Typography>
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{ mt: 1, color: "#f59e0b" }}
              >
                {metrics.pendingCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Financial Summary */}
      <Card sx={{ mb: 4, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }} fontWeight="bold">
            Financial Summary
          </Typography>
          <Grid container spacing={3}>
            {[
              {
                label: "Total Billed Amount",
                val: metrics.totalBilled,
                col: "text.primary",
              },
              {
                label: "Total Allowed Amount",
                val: metrics.totalAllowed,
                col: "primary.main",
              },
              {
                label: "Total Paid Amount",
                val: metrics.totalPaid,
                col: "success.main",
              },
              {
                label: "Patient Responsibility",
                val: metrics.totalPR,
                col: "warning.main",
              },
              {
                label: "Contractual Adjustment",
                val: metrics.totalCO,
                col: "info.main",
              },
              {
                label: "Total Write-Offs",
                val: metrics.totalWriteOffs,
                col: "error.main",
              },
            ].map((item) => (
              <Grid size={{ xs: 6, sm: 4, md: 2 }} key={item.label}>
                <Typography variant="caption" color="text.secondary">
                  {item.label}
                </Typography>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  sx={{ color: item.col }}
                >
                  $
                  {item.val.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Visualizations Grid */}
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ minHeight: 280, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Claims Distribution (Paid vs Denied)
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {renderPieChart()}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ minHeight: 280, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Top 10 Denial Reasons (CARC + RARC)
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {renderHorizontalBarChart(topDenials, "denial")}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ minHeight: 280, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Top Claim Adjustment Reason Codes (CARC)
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {renderHorizontalBarChart(
                topAdjustments.map((a) => ({
                  key: a.code,
                  label: a.code,
                  count: a.count,
                  description: a.description,
                })),
                "adjustment",
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              <Card sx={{ minHeight: 230, boxShadow: 3 }}>
                <CardContent>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    gutterBottom
                  >
                    Payments by Payer
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  {renderVerticalBarChart(
                    paymentsByPayer.map((p) => ({
                      label: p.payer,
                      amount: p.amount,
                      key: p.payer,
                    })),
                    "payer",
                  )}
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Card sx={{ minHeight: 230, boxShadow: 3 }}>
                <CardContent>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    gutterBottom
                  >
                    Payments by Check Date
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  {renderVerticalBarChart(
                    paymentsByDate.map((d) => ({
                      label: d.date,
                      amount: d.amount,
                      key: d.date,
                    })),
                    "date",
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Dynamic HTML Tooltip */}
      {hoveredItem && (
        <Box
          sx={{
            position: "fixed",
            left: hoveredItem.x,
            top: hoveredItem.y,
            transform: "translate(-50%, -100%)",
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            color: "#fff",
            p: 1,
            px: 1.5,
            borderRadius: 1.5,
            pointerEvents: "none",
            zIndex: 9999,
            maxWidth: 280,
            boxShadow: 4,
          }}
        >
          <Typography variant="caption" fontWeight="bold" display="block">
            {hoveredItem.label}
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.9 }}>
            {hoveredItem.value}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
