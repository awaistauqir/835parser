"use client";

import { Box, Button } from "@mui/material";
import { useState } from "react";
import { generatePdfForCheck } from "@/lib/pdf-generator";
import type { ParsedEdiFile } from "@/types/edi";

export default function PdfExport({
  parsedFiles,
}: {
  parsedFiles: ParsedEdiFile[];
}) {
  const handleDownloadAll = () => {
    // For simplicity: download first check of first file
    const firstCheck = parsedFiles[0]?.checks[0];
    if (!firstCheck) return;
    const blob = generatePdfForCheck(firstCheck, parsedFiles[0].filename);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `CK${firstCheck.checkNumber}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadJson = () => {
    const json = JSON.stringify(parsedFiles, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "edi-parsed.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Box display="flex" gap={2} mt={2}>
      <Button variant="contained" onClick={handleDownloadAll}>
        Download PDF
      </Button>
      <Button variant="outlined" onClick={handleDownloadJson}>
        Download JSON
      </Button>
    </Box>
  );
}
