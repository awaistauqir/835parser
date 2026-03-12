// lib/edi-parser.ts
import {
  ParsedEdiFile,
  Check,
  Claim,
  ServiceLine,
  Adjustment,
  PlbAdjustment,
} from "@/types/edi";

const REMARK_CODE_MAP: Record<string, string> = {
  "PR-1": "Deductible Amount",
  "PR-2": "Coinsurance",
  "PR-3": "Co-payment",
  "CO-45": "Charge exceeds fee schedule or maximum allowable",
  "CO-97": "Non-covered service",
};

// Clean individual EDI element (remove terminators, trim)
const cleanElement = (value: string): string => {
  return value ? value.replace(/~+$/, "").trim() : "";
};

// Format YYYYMMDD → MM/DD/YYYY
const formatDate = (ediDate: string): string => {
  const clean = cleanElement(ediDate);
  if (/^\d{8}$/.test(clean)) {
    return `${clean.substring(4, 6)}/${clean.substring(6, 8)}/${clean.substring(
      0,
      4
    )}`;
  }
  return clean;
};

function parseAdjustments(segments: string[], category: string): Adjustment[] {
  const adj: Adjustment[] = [];
  for (let i = 2; i < segments.length; i += 3) {
    const code = cleanElement(segments[i]);
    const amt = cleanElement(segments[i + 1]);
    if (!code || !amt) continue;
    const amount = parseFloat(amt) || 0;
    if (amount === 0) continue;
    const fullCode = `${category}-${code}`;
    adj.push({
      code: fullCode,
      amount,
      description: REMARK_CODE_MAP[fullCode],
    });
  }
  return adj;
}

export function parseEdi835(ediText: string, filename: string): ParsedEdiFile {
  // ✅ Split by segment terminator (~), NOT newlines
  const segments = ediText
    .replace(/\r?\n/g, "")
    .split("~")
    .map((s) => s.trim())
    .filter(
      (s) =>
        s &&
        !s.startsWith("ISA") &&
        !s.startsWith("IEA") &&
        !s.startsWith("GS") &&
        !s.startsWith("GE")
    );

  const checks: Check[] = [];
  let currentCheck: Check | null = null;
  let currentClaim: Claim | null = null;
  let currentServiceLine: ServiceLine | null = null;

  for (const seg of segments) {
    const elements = seg.split("*").map(cleanElement);
    const segId = elements[0];

    // ===== CHECK-LEVEL (BPR starts a new check) =====
    if (segId === "BPR") {
      // Save previous check if exists
      if (currentCheck) {
        checks.push(currentCheck);
      }

      currentCheck = {
        checkNumber: cleanElement(elements[10]) || "", // BPR10: Originating company identifier/trace number
        issueDate: formatDate(cleanElement(elements[16])), // BPR16: Payment date (CCYYMMDD)
        productionDate: "",
        checkAmount: parseFloat(cleanElement(elements[2])) || 0, // BPR02: Total payment amount
        payerName: "",
        payerId: "",
        payerAddress: "",
        providerName: "",
        providerNpi: "",
        providerTaxonomy: "",
        payeeAddress: "",
        claims: [],
        plb: [],
      };

      // Reset claim context
      currentClaim = null;
      currentServiceLine = null;
    }

    // ===== PAYER INFORMATION =====
    else if (segId === "N1" && elements[1] === "PR") {
      if (currentCheck) {
        currentCheck.payerName = cleanElement(elements[2]);
      }
    }
    // check number
    else if (segId === "TRN" && elements[1] === "1") {
      if (currentCheck) {
        currentCheck.checkNumber = cleanElement(elements[2]) || "";
      }
    }

    // ===== CLAIM-LEVEL =====
    else if (segId === "CLP") {
      // Finalize previous service line
      if (currentServiceLine && currentClaim) {
        currentClaim.serviceLines.push(currentServiceLine);
        currentServiceLine = null;
      }
      // Finalize previous claim
      if (currentClaim && currentCheck) {
        currentCheck.claims.push(currentClaim);
      }

      // Start NEW claim
      currentClaim = {
        patientName: "",
        patientControlNumber: elements[1] || "",
        claimNumber: elements[1] || "",
        providerClaimReference: "", // from REF*6R
        icn: "", // from REF*EA
        dosStart: "",
        dosEnd: "",
        statementFromDate: "",
        chargedAmount: parseFloat(elements[3]) || 0,
        allowedAmount: 0, // from AMT*B6
        paidAmount: parseFloat(elements[4]) || 0,
        patientResponsibility: 0, // sum of CAS*PR adjustments
        claimFilingIndicator: elements[6] || "",
        claimFrequencyCode: elements[9] || "",
        facilityTypeCode: elements[8] || "",
        claimStatusCode: elements[2] || "",
        coveredUnits: 1, // default
        adjustments: [],
        remarkCodes: [],
        serviceLines: [],
      };

      // Set check number from CLP07 if no BPR exists yet
      if (!currentCheck) {
        currentCheck = {
          checkNumber: elements[7] || "",
          issueDate: "",
          productionDate: "",
          checkAmount: parseFloat(elements[3]) || 0,
          payerName: "",
          payerId: "",
          payerAddress: "",
          providerName: "",
          providerNpi: "",
          providerTaxonomy: "",
          payeeAddress: "",
          claims: [],
          plb: [],
        };
      }
    }

    // Patient name (NM1*QC)
    else if (segId === "NM1" && elements[1] === "QC" && currentClaim) {
      const lastName = elements[3] || "";
      const firstName = elements[4] || "";
      const middle = elements[5] || "";
      currentClaim.patientName = [lastName, firstName, middle]
        .filter(Boolean)
        .join(" ")
        .trim();
      // Reformat to "Last, First"
      if (firstName) {
        currentClaim.patientName = `${lastName}, ${firstName}${middle ? ` ${middle}` : ""
          }`;
      }
    }

    // Rendering provider (NM1*82)
    else if (segId === "NM1" && elements[1] === "82" && currentCheck) {
      currentCheck.providerName = elements[3] || "";
      if (elements[8] === "XX") {
        currentCheck.providerNpi = elements[9] || "";
      }
    }

    // Statement Date (DTM*232)
    else if (segId === "DTM" && elements[1] === "232" && currentClaim) {
      currentClaim.statementFromDate = formatDate(elements[2]);
    }

    // Production Date (DTM*405) - Claim production run date
    else if (segId === "DTM" && elements[1] === "405" && currentCheck) {
      currentCheck.productionDate = formatDate(elements[2]);
    }

    // Service Date (DTM*472)
    else if (segId === "DTM" && elements[1] === "472") {
      const formattedDate = formatDate(elements[2]);

      // If we have a current service line, set its DOS
      if (currentServiceLine) {
        currentServiceLine.dosStart = formattedDate;
        currentServiceLine.dosEnd = formattedDate;
      }
      // Also set at claim level if we have a claim
      if (currentClaim) {
        currentClaim.dosStart = formattedDate;
        currentClaim.dosEnd = formattedDate; // single date
      }
    }

    // Covered Units (QTY*CA)
    else if (segId === "QTY" && elements[1] === "CA" && currentClaim) {
      currentClaim.coveredUnits = parseInt(elements[2]) || 1;
    }

    // Service Line (SVC)
    else if (segId === "SVC" && currentClaim) {
      if (currentServiceLine) {
        currentClaim.serviceLines.push(currentServiceLine);
      }

      const composite = (elements[1] || "").split(":");
      const qualifier = composite[0] || "";
      const cpt = composite[1] || "";
      const modifiers = composite.slice(2).filter((m) => m);

      currentServiceLine = {
        cpt,
        procedureCodeQualifier: qualifier,
        units: currentClaim.coveredUnits, // or parse from SVC if available
        modifiers,
        chargedAmount: parseFloat(elements[2]) || 0,
        allowedAmount: 0, // from AMT*B6 per service line
        paidAmount: parseFloat(elements[3]) || 0,
        adjustments: [],
        dosStart: currentClaim.dosStart,
        dosEnd: currentClaim.dosEnd,
      };
    }

    // Adjustments (CAS)
    else if (segId === "CAS" && currentClaim) {
      const category = elements[1];
      const adjustments = parseAdjustments(elements, category);
      // Apply to current service line if exists, else claim
      if (currentServiceLine) {
        currentServiceLine.adjustments.push(...adjustments);
      } else {
        currentClaim.adjustments.push(...adjustments);
      }
      // Accumulate patient responsibility from PR adjustments
      if (category === "PR") {
        const prTotal = adjustments.reduce((sum, a) => sum + a.amount, 0);
        currentClaim.patientResponsibility += prTotal;
      }
    }

    // Provider Claim Reference (REF*6R)
    else if (segId === "REF" && elements[1] === "6R" && currentClaim) {
      currentClaim.providerClaimReference = elements[2] || "";
    }

    // ICN - Internal Control Number (REF*EA)
    else if (segId === "REF" && elements[1] === "EA" && currentClaim) {
      currentClaim.icn = elements[2] || "";
    }

    // Allowed Amount (AMT*B6) — per service line when available, else claim level
    else if (segId === "AMT" && elements[1] === "B6" && currentClaim) {
      const amt = parseFloat(elements[2]) || 0;
      if (currentServiceLine) {
        currentServiceLine.allowedAmount = amt;
      }
      currentClaim.allowedAmount = amt;
    }

    // Provider Level Balance (PLB) - Provider-level adjustments
    else if (segId === "PLB" && currentCheck) {
      // PLB format: PLB*ProviderID*FiscalPeriodEnd*ReasonCode:RefId*Amount*ReasonCode:RefId*Amount...
      // PLB01: Provider Identifier
      // PLB02: Fiscal Period End Date
      // PLB03-1: Adjustment Reason Code, PLB03-2: Reference ID
      // PLB04: Adjustment Amount
      // Can have up to 6 adjustment pairs (PLB03-PLB14)
      for (let i = 3; i < elements.length; i += 2) {
        const reasonComposite = cleanElement(elements[i]);
        const amount = parseFloat(cleanElement(elements[i + 1])) || 0;

        if (!reasonComposite) continue;

        // Split composite element (reason:referenceId)
        const compositeParts = reasonComposite.split(":");
        const reasonCode = compositeParts[0] || "";
        const referenceId = compositeParts[1] || "";

        if (reasonCode && amount !== 0) {
          currentCheck.plb.push({
            reasonCode,
            referenceId,
            amount,
          });
        }
      }
    }

    // ===== END OF TRANSACTION =====
    else if (segId === "SE") {
      if (currentServiceLine && currentClaim) {
        currentClaim.serviceLines.push(currentServiceLine);
        currentServiceLine = null;
      }
      if (currentClaim && currentCheck) {
        currentCheck.claims.push(currentClaim);
        currentClaim = null;
      }
      if (currentCheck) {
        checks.push(currentCheck);
        currentCheck = null;
      }
    }
  }

  // Finalize any dangling data
  if (currentServiceLine && currentClaim) {
    currentClaim.serviceLines.push(currentServiceLine);
  }
  if (currentClaim && currentCheck) {
    currentCheck.claims.push(currentClaim);
  }
  if (currentCheck) {
    checks.push(currentCheck);
  }

  return { filename, checks };
}
