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
  allowedAmount: number; // ← from AMT*B6 per service line
  paidAmount: number;
  adjustments: Adjustment[];
  dosStart?: string;
  dosEnd?: string;
}

export interface Claim {
  patientName: string;
  patientInsuranceId: string; // ← from NM1*QC element 9 (member ID)
  patientDob: string; // ← from DMG*D8 (date of birth)
  renderingProvider: string; // ← from NM1*82 at claim level
  patientGender: string; // ← from DMG*D8 (gender)
  providerName: string; // ← from NM1*82 at claim level
  providerNpi: string; // ← from NM1*82 at claim level
  providerTaxonomy: string; // ← from NM1*82 at claim level
  patientControlNumber: string;
  claimNumber: string;
  providerClaimReference: string; // ← from REF*6R
  icn: string; // ← from REF*EA (Internal Control Number)
  dosStart: string;
  dosEnd: string;
  statementFromDate: string; // ← from DTM*232
  chargedAmount: number;
  allowedAmount: number; // ← from AMT*B6
  paidAmount: number;
  patientResponsibility: number; // ← sum of CAS*PR adjustments
  claimFilingIndicator: string; // e.g., "MC"
  claimFrequencyCode: string; // e.g., "1"
  facilityTypeCode: string; // e.g., "A"
  claimStatusCode: string; // e.g., "1"
  coveredUnits: number; // ← from QTY*CA
  adjustments: Adjustment[];
  remarkCodes: string[];
  perDayLimit?: number; // ← from AMT*DY (per day limit)
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
