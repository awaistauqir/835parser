import { ParsedEdiFile } from "@/types/edi";
import { Box, Typography, Paper } from "@mui/material";
import ClaimTable from "./ClaimTable";
import PdfExport from "./PdfExport";

export default function EdiViewer({ file }: { file: ParsedEdiFile }) {
  const check = file.checks[0]; // Assume 1 check per file for simplicity

  if (!check) return <Typography>No data found.</Typography>;

  return (
    <Box>
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6">Check Summary</Typography>
        <Typography>Check #: {check.checkNumber}</Typography>
        <Typography>Issue Date: {check.issueDate}</Typography>
        <Typography>Amount: ${check.checkAmount.toFixed(2)}</Typography>
        <Typography>Payer: {check.payerName}</Typography>
        <Typography>
          Provider: {check.providerName} (NPI: {check.providerNpi})
        </Typography>
      </Paper>

      <ClaimTable claims={check.claims} />

      <PdfExport parsedFiles={[file]} />
    </Box>
  );
}
