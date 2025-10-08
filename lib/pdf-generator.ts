// lib/pdf-generator.ts
import jsPDF from "jspdf";
import { autoTable } from "jspdf-autotable";
import { ParsedEdiFile } from "@/types/edi";

export function generatePdfForCheck(
  check: ParsedEdiFile["checks"][0],
  filename: string
): Blob {
  const doc = new jsPDF();

  // Helper function to format patient name as [last_name, first_name]
  const formatPatientName = (fullName: string): string => {
    // Remove any trailing "~" or "1" and trim spaces
    const cleanName = fullName.replace(/[~1]+$/, "").trim();
    const nameParts = cleanName.split(" ");
    if (nameParts.length < 2) return cleanName;
    
    // In EDI format, last name is typically the first part
    const lastName = nameParts[0];
    const firstName = nameParts.slice(1).join(" ");
    return `${lastName}, ${firstName}`;
  };

  // Sort claims by last name, first name
  const sortedClaims = [...check.claims].sort((a, b) => {
    // Clean names first
    const aName = a.patientName.replace(/[~1]+$/, "").trim();
    const bName = b.patientName.replace(/[~1]+$/, "").trim();

    const aNameParts = aName.split(" ");
    const bNameParts = bName.split(" ");

    // Get last names (in EDI format, last name is first)
    const aLastName = aNameParts[0] || "";
    const bLastName = bNameParts[0] || "";

    // Compare last names first
    const lastNameComparison = aLastName.localeCompare(bLastName);
    if (lastNameComparison !== 0) return lastNameComparison;

    // If last names are the same, compare first names
    const aFirstName = aNameParts.slice(1).join(" ");
    const bFirstName = bNameParts.slice(1).join(" ");
    return aFirstName.localeCompare(bFirstName);
  });

  // First page - Check information
  let y = 20;

  // Header
  doc.setFontSize(18);
  doc.text(`Check Summary`, 105, y, { align: "center" });
  y += 15;

  doc.setFontSize(14);
  doc.text(`Check #${check.checkNumber}`, 14, y);
  y += 10;

  doc.setFontSize(12);
  const headerLines = [
    `Issue Date: ${check.issueDate}`,
    `Production Date: ${check.productionDate}`,
    `Amount: $${check.checkAmount.toFixed(2)}`,
    `Payer: ${check.payerName} (${check.payerId})`,
    `Provider: ${check.providerName} (NPI: ${check.providerNpi})`,
  ];

  headerLines.forEach((line) => {
    doc.text(line, 14, y);
    y += 6;
  });

  y += 10;

  // Claims Summary Table
  const claimsData = sortedClaims.map((c) => [
    c.dosStart,
    formatPatientName(c.patientName),
    c.patientControlNumber,
    c.claimNumber,
    `$${c.chargedAmount.toFixed(2)}`,
    `$${c.paidAmount.toFixed(2)}`,
  ]);

  autoTable(doc, {
    startY: y,
    head: [["DOS", "Patient", "Pt Control #", "Claim #", "Charged", "Paid"]],
    body: claimsData,
    theme: "grid",
    styles: { fontSize: 9 },
    headStyles: { fillColor: [33, 150, 243] },
  });

  // Create individual pages for each claim
  sortedClaims.forEach((claim, index) => {
    // Add a new page for each claim
    doc.addPage();

    y = 20;

    // Claim header
    doc.setFontSize(16);
    doc.text(
      `Claim Details - ${formatPatientName(claim.patientName)}`,
      105,
      y,
      { align: "center" }
    );
    y += 15;

    // Claim information
    doc.setFontSize(12);
    const claimInfoLines = [
      `Patient: ${formatPatientName(claim.patientName)}`,
      `Patient Control Number: ${claim.patientControlNumber}`,
      `Claim Number: ${claim.claimNumber}`,
      `ICN: ${claim.claimNumber}`,
      `Date of Service: ${claim.dosStart} to ${claim.dosEnd}`,
      `Charged Amount: $${claim.chargedAmount.toFixed(2)}`,
      `Paid Amount: $${claim.paidAmount.toFixed(2)}`,
    ];

    claimInfoLines.forEach((line) => {
      doc.text(line, 14, y);
      y += 6;
    });

    y += 10;

    // Service lines table
    const serviceLineData = claim.serviceLines.map((sl) => [
      sl.cpt,
      sl.modifiers.join(", "),
      sl.dosStart || claim.dosStart,
      sl.units.toString(),
      `$${sl.chargedAmount.toFixed(2)}`,
      `$${sl.paidAmount.toFixed(2)}`,
      sl.adjustments
        .map((a) => `${a.code}: $${a.amount.toFixed(2)}`)
        .join("\n"),
    ]);

    autoTable(doc, {
      startY: y,
      head: [
        [
          "CPT Code",
          "Modifiers",
          "DOS",
          "Units",
          "Charged",
          "Paid",
          "Adjustments",
        ],
      ],
      body: serviceLineData,
      theme: "grid",
      styles: { fontSize: 9 },
      headStyles: { fillColor: [33, 150, 243] },
      columnStyles: {
        6: { cellWidth: 50 },
      },
    });

    // Add claim adjustments if any
    if (claim.adjustments.length > 0) {
      y = (doc as any).lastAutoTable.finalY + 10;

      doc.text("Claim Level Adjustments:", 14, y);
      y += 6;

      const adjustmentData = claim.adjustments.map((adj) => [
        adj.code,
        adj.description || "",
        `$${adj.amount.toFixed(2)}`,
      ]);

      autoTable(doc, {
        startY: y,
        head: [["Code", "Description", "Amount"]],
        body: adjustmentData,
        theme: "grid",
        styles: { fontSize: 9 },
        headStyles: { fillColor: [33, 150, 243] },
      });
    }

    // Add remark codes if any
    if (claim.remarkCodes.length > 0) {
      y = (doc as any).lastAutoTable.finalY + 10;

      doc.text("Remark Codes:", 14, y);
      y += 6;

      const remarkData = claim.remarkCodes.map((code) => [code]);

      autoTable(doc, {
        startY: y,
        head: [["Remark Code"]],
        body: remarkData,
        theme: "grid",
        styles: { fontSize: 9 },
        headStyles: { fillColor: [33, 150, 243] },
      });
    }
  });

  return doc.output("blob");
}
