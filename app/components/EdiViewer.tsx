"use client";

import { useState } from "react";
import { ParsedEdiFile } from "@/types/edi";
import { Box, Typography, Paper, Chip, Divider, Button, ButtonGroup } from "@mui/material";
import ClaimTable from "./ClaimTable";
import PdfExport from "./PdfExport";

// PLB Reason Code descriptions
const PLB_REASON_CODES: Record<string, string> = {
  "WO": "Overpayment Recovery",
  "FB": "Forward Balance",
  "IR": "Interest",
  "L6": "Interest Owed",
  "72": "Authorized Return",
  "CS": "Adjustment (≥$50)",
  "C5": "Temporary Allowance (<$50)",
  "PI": "Payer Initiated Reduction",
  "LE": "Levy",
  "AH": "Origination Fee",
  "AM": "Applied to Borrowed Amount",
  "AP": "Acceleration of Benefits",
  "B2": "Rebate",
  "B3": "Recovery Allowance",
  "BD": "Bad Debt Adjustment",
};

export default function EdiViewer({ file }: { file: ParsedEdiFile }) {
  const [activeCheckIndex, setActiveCheckIndex] = useState(0);

  if (!file.checks || file.checks.length === 0) {
    return <Typography>No data found.</Typography>;
  }

  const check = file.checks[activeCheckIndex];
  if (!check) return <Typography>No data found.</Typography>;

  // Calculate total PLB adjustment
  const totalPlbAdjustment = check.plb?.reduce((sum, adj) => sum + adj.amount, 0) || 0;

  return (
    <Box>
      {/* Check selector buttons */}
      {file.checks.length > 1 && (
        <Paper sx={{ p: 2, mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, color: "text.secondary" }}>
            This file contains {file.checks.length} checks — select one to view:
          </Typography>
          <ButtonGroup variant="outlined" sx={{ flexWrap: "wrap", gap: 0.5 }}>
            {file.checks.map((chk, idx) => (
              <Button
                key={idx}
                variant={activeCheckIndex === idx ? "contained" : "outlined"}
                onClick={() => setActiveCheckIndex(idx)}
                sx={{ textTransform: "none" }}
              >
                Check #{chk.checkNumber || idx + 1}
                {chk.checkAmount != null && ` ($${chk.checkAmount.toFixed(2)})`}
              </Button>
            ))}
          </ButtonGroup>
        </Paper>
      )}

      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6">Check Summary</Typography>
        <Typography>Check #: {check.checkNumber}</Typography>
        <Typography>Issue Date: {check.issueDate}</Typography>
        <Typography>Production Date: {check.productionDate || "N/A"}</Typography>
        <Typography>Amount: ${check.checkAmount.toFixed(2)}</Typography>
        <Typography>Payer: {check.payerName}</Typography>
        <Typography>
          Provider: {check.providerName} (NPI: {check.providerNpi})
        </Typography>
      </Paper>

      {/* PLB Adjustments Section */}
      {check.plb && check.plb.length > 0 && (
        <Paper sx={{ p: 2, mb: 3, backgroundColor: "rgba(255, 193, 7, 0.08)" }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Provider Level Balance (PLB) Adjustments
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {check.plb.map((adj, idx) => (
              <Box
                key={idx as any}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 1,
                  borderRadius: 1,
                  backgroundColor: adj.amount > 0 ? "rgba(244, 67, 54, 0.08)" : "rgba(76, 175, 80, 0.08)",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Chip
                    label={adj.reasonCode}
                    size="small"
                    color={adj.amount > 0 ? "error" : "success"}
                    variant="outlined"
                  />
                  <Typography variant="body2">
                    {PLB_REASON_CODES[adj.reasonCode] || "Provider Adjustment"}
                    {adj.referenceId && (
                      <Typography component="span" variant="caption" sx={{ ml: 1, color: "text.secondary" }}>
                        (Ref: {adj.referenceId})
                      </Typography>
                    )}
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: "bold",
                    color: adj.amount > 0 ? "error.main" : "success.main",
                  }}
                >
                  {adj.amount > 0 ? "-" : "+"}${Math.abs(adj.amount).toFixed(2)}
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
                  color: totalPlbAdjustment > 0 ? "error.main" : "success.main",
                }}
              >
                {totalPlbAdjustment > 0 ? "-" : totalPlbAdjustment < 0 ? "+" : ""}${Math.abs(totalPlbAdjustment).toFixed(2)}
              </Typography>
            </Typography>
          </Box>
        </Paper>
      )}

      <ClaimTable claims={check.claims} />

      <PdfExport parsedFiles={[file]} />
    </Box>
  );
}
