"use client";

import {
  Box,
  Button,
  ButtonGroup,
  Chip,
  CircularProgress,
  Divider,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import type { ParsedEdiFile } from "@/types/edi";
import AnalyticsDashboard, {
  getClaimDashboardStatus,
} from "./AnalyticsDashboard";
import ClaimTable from "./ClaimTable";
import PdfExport from "./PdfExport";

// PLB Reason Code descriptions
const PLB_REASON_CODES: Record<string, string> = {
  WO: "Overpayment Recovery",
  FB: "Forward Balance",
  IR: "Interest",
  L6: "Interest Owed",
  "72": "Authorized Return",
  CS: "Adjustment (≥$50)",
  C5: "Temporary Allowance (<$50)",
  PI: "Payer Initiated Reduction",
  LE: "Levy",
  AH: "Origination Fee",
  AM: "Applied to Borrowed Amount",
  AP: "Acceleration of Benefits",
  B2: "Rebate",
  B3: "Recovery Allowance",
  BD: "Bad Debt Adjustment",
};

export default function EdiViewer({ file }: { file: ParsedEdiFile }) {
  const [activeCheckIndex, setActiveCheckIndex] = useState(0);
  const [tabVal, setTabVal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState<{
    type: "status" | "denial" | "adjustment" | "remark" | "date" | "payer";
    value: string;
    label: string;
  } | null>(null);

  // Trigger loading state on file change
  useEffect(() => {
    const _name = file.filename;
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [file]);

  const handleSelectFilter = (filter: typeof activeFilter) => {
    setActiveFilter(filter);
    if (filter) {
      setTabVal(1); // Auto switch to Claims Details when filter is set
    }
  };

  // Compute filtered claims based on activeFilter
  const filteredClaims = useMemo(() => {
    const allClaims = file.checks.flatMap((c) => c.claims);
    const activeCheck = file.checks[activeCheckIndex];
    if (!activeFilter) {
      return activeCheck?.claims || [];
    }
    return allClaims.filter((claim) => {
      const c = file.checks.find((ch) => ch.claims.includes(claim));
      if (!c) return false;

      switch (activeFilter.type) {
        case "status":
          return getClaimDashboardStatus(claim) === activeFilter.value;
        case "denial": {
          const [carc, rarc] = activeFilter.value.split("||");
          const hasCarc = carc
            ? claim.adjustments.some((a) => a.code === carc) ||
              claim.serviceLines.some((sl) =>
                sl.adjustments.some((a) => a.code === carc),
              )
            : true;
          const hasRarc = rarc
            ? claim.remarkCodes.includes(rarc) ||
              claim.serviceLines.some((sl) => sl.remarkCodes.includes(rarc))
            : true;
          return (
            getClaimDashboardStatus(claim) === "Denied" && hasCarc && hasRarc
          );
        }
        case "adjustment":
          return (
            claim.adjustments.some((a) => a.code === activeFilter.value) ||
            claim.serviceLines.some((sl) =>
              sl.adjustments.some((a) => a.code === activeFilter.value),
            )
          );
        case "payer":
          return c.payerName === activeFilter.value;
        case "date":
          return c.issueDate === activeFilter.value;
        default:
          return true;
      }
    });
  }, [file, activeCheckIndex, activeFilter]);

  if (!file.checks || file.checks.length === 0) {
    return <Typography>No data found.</Typography>;
  }

  const check = file.checks[activeCheckIndex];
  if (!check) return <Typography>No data found.</Typography>;

  // Calculate total PLB adjustment
  const totalPlbAdjustment =
    check.plb?.reduce((sum, adj) => sum + adj.amount, 0) || 0;

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 300,
        }}
      >
        <CircularProgress />
        <Typography variant="body2" sx={{ ml: 2 }}>
          Generating Analytics...
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Tabs
        value={tabVal}
        onChange={(_, val) => setTabVal(val)}
        sx={{ mb: 3, borderBottom: 1, borderColor: "divider" }}
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab label="Analytics Dashboard" />
        <Tab label={`Claims Details (${filteredClaims.length})`} />
      </Tabs>

      {tabVal === 0 && (
        <AnalyticsDashboard
          file={file}
          activeFilter={activeFilter}
          onSelectFilter={handleSelectFilter}
        />
      )}

      {tabVal === 1 && (
        <Box>
          {/* Active Filter Notification inside Details Tab */}
          {activeFilter && (
            <Paper
              sx={{
                p: 2,
                mb: 3,
                backgroundColor: "rgba(25, 118, 210, 0.08)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="body2"
                fontWeight="bold"
                color="primary.main"
              >
                Showing claims filtered by: {activeFilter.label} (Total:{" "}
                {filteredClaims.length})
              </Typography>
              <Button
                size="small"
                variant="outlined"
                onClick={() => setActiveFilter(null)}
              >
                Clear Filter
              </Button>
            </Paper>
          )}

          {/* Check selector buttons - Only show check selector when there is no active filter,
              or show info that we are filtering across checks */}
          {!activeFilter && file.checks.length > 1 ? (
            <Paper sx={{ p: 2, mb: 3 }}>
              <Typography
                variant="subtitle2"
                sx={{ mb: 1, color: "text.secondary" }}
              >
                This file contains {file.checks.length} checks — select one to
                view:
              </Typography>
              <ButtonGroup
                variant="outlined"
                sx={{ flexWrap: "wrap", gap: 0.5 }}
              >
                {file.checks.map((chk, idx) => (
                  <Button
                    key={crypto.randomUUID()}
                    variant={
                      activeCheckIndex === idx ? "contained" : "outlined"
                    }
                    onClick={() => setActiveCheckIndex(idx)}
                    sx={{ textTransform: "none" }}
                  >
                    Check #{chk.checkNumber || idx + 1}
                    {chk.checkAmount != null &&
                      ` ($${chk.checkAmount.toFixed(2)})`}
                  </Button>
                ))}
              </ButtonGroup>
            </Paper>
          ) : (
            activeFilter && (
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                sx={{ mb: 2 }}
              >
                Check selection is disabled because claims are filtered across
                all checks in the file.
              </Typography>
            )
          )}

          {/* Check Summary and PLB adjustments only make sense for specific check,
              render them when there is no active filter or when we are viewing filtered claims */}
          {!activeFilter && (
            <>
              <Paper sx={{ p: 2, mb: 3 }}>
                <Typography variant="h6">Check Summary</Typography>
                <Typography>Check #: {check.checkNumber}</Typography>
                <Typography>Issue Date: {check.issueDate}</Typography>
                <Typography>
                  Production Date: {check.productionDate || "N/A"}
                </Typography>
                <Typography>Amount: ${check.checkAmount.toFixed(2)}</Typography>
                <Typography>Payer: {check.payerName}</Typography>
                <Typography>
                  Provider: {check.providerName} (NPI: {check.providerNpi})
                </Typography>
              </Paper>

              {check.plb && check.plb.length > 0 && (
                <Paper
                  sx={{
                    p: 2,
                    mb: 3,
                    backgroundColor: "rgba(255, 193, 7, 0.08)",
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    Provider Level Balance (PLB) Adjustments
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    {check.plb.map((adj) => (
                      <Box
                        key={crypto.randomUUID()}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          p: 1,
                          borderRadius: 1,
                          backgroundColor:
                            adj.amount > 0
                              ? "rgba(244, 67, 54, 0.08)"
                              : "rgba(76, 175, 80, 0.08)",
                        }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Chip
                            label={adj.reasonCode}
                            size="small"
                            color={adj.amount > 0 ? "error" : "success"}
                            variant="outlined"
                          />
                          <Typography variant="body2">
                            {PLB_REASON_CODES[adj.reasonCode] ||
                              "Provider Adjustment"}
                            {adj.referenceId && (
                              <Typography
                                component="span"
                                variant="caption"
                                sx={{ ml: 1, color: "text.secondary" }}
                              >
                                (Ref: {adj.referenceId})
                              </Typography>
                            )}
                          </Typography>
                        </Box>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: "bold",
                            color:
                              adj.amount > 0 ? "error.main" : "success.main",
                          }}
                        >
                          {adj.amount > 0 ? "-" : "+"}$
                          {Math.abs(adj.amount).toFixed(2)}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      Total PLB Adjustment:
                      <Typography
                        component="span"
                        sx={{
                          ml: 1,
                          color:
                            totalPlbAdjustment > 0
                              ? "error.main"
                              : "success.main",
                        }}
                      >
                        {totalPlbAdjustment > 0
                          ? "-"
                          : totalPlbAdjustment < 0
                            ? "+"
                            : ""}
                        ${Math.abs(totalPlbAdjustment).toFixed(2)}
                      </Typography>
                    </Typography>
                  </Box>
                </Paper>
              )}
            </>
          )}

          <ClaimTable claims={filteredClaims} />
        </Box>
      )}

      <PdfExport parsedFiles={[file]} />
    </Box>
  );
}
