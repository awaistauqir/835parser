// types/edi.ts
export interface Adjustment {
  code: string;
  amount: number;
  description?: string;
}

export interface ServiceLine {
  cpt: string;
  procedureCodeQualifier: string; // e.g., "HC"
  units: number;
  modifiers: string[];
  chargedAmount: number;
  paidAmount: number;
  adjustments: Adjustment[];
  dosStart?: string;
  dosEnd?: string;
}

export interface Claim {
  patientName: string;
  patientControlNumber: string;
  claimNumber: string;
  providerClaimReference: string; // ← NEW
  dosStart: string;
  dosEnd: string;
  statementFromDate: string; // ← NEW
  chargedAmount: number;
  paidAmount: number;
  claimFilingIndicator: string; // e.g., "MC"
  claimFrequencyCode: string; // e.g., "1"
  facilityTypeCode: string; // e.g., "A"
  claimStatusCode: string; // e.g., "1"
  coveredUnits: number; // ← from QTY*CA
  adjustments: Adjustment[];
  remarkCodes: string[];
  serviceLines: ServiceLine[];
}

export interface PlbAdjustment {
  reasonCode: string;
  referenceId: string;
  amount: number;
}

export interface Check {
  checkNumber: string;
  issueDate: string;
  productionDate: string;
  checkAmount: number;
  payerName: string;
  payerId: string;
  payerAddress: string;
  providerName: string;
  providerNpi: string;
  providerTaxonomy: string;
  payeeAddress: string;
  claims: Claim[];
  plb: PlbAdjustment[];
}

export interface ParsedEdiFile {
  filename: string;
  checks: Check[];
}
