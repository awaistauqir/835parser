export const AdustmenCodes = [
  {
    code: "1",
    description: "Deductible Amount",
  },
  {
    code: "2",
    description: "Coinsurance Amount",
  },
  {
    code: "3",
    description: "Co-payment Amount",
  },
  {
    code: "4",
    description:
      "The procedure code is inconsistent with the modifier used. Usage: Refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment Information REF), if present.",
  },
  {
    code: "5",
    description:
      "The procedure code/type of bill is inconsistent with the place of service. Usage: Refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment Information REF), if present.",
  },
  {
    code: "6",
    description:
      "The procedure/revenue code is inconsistent with the patient's age. Usage: Refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment Information REF), if present.",
  },
  {
    code: "7",
    description:
      "The procedure/revenue code is inconsistent with the patient's gender. Usage: Refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment Information REF), if present.",
  },
  {
    code: "8",
    description:
      "The procedure code is inconsistent with the provider type/specialty (taxonomy). Usage: Refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment Information REF), if present.",
  },
  {
    code: "9",
    description:
      "The diagnosis is inconsistent with the patient's age. Usage: Refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment Information REF), if present.",
  },
  {
    code: "10",
    description:
      "The diagnosis is inconsistent with the patient's gender. Usage: Refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment Information REF), if present.",
  },
  {
    code: "11",
    description:
      "The diagnosis is inconsistent with the procedure. Usage: Refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment Information REF), if present.",
  },
  {
    code: "12",
    description:
      "The diagnosis is inconsistent with the provider type. Usage: Refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment Information REF), if present.",
  },
  {
    code: "13",
    description: "The date of death precedes the date of service.",
  },
  {
    code: "14",
    description: "The date of birth follows the date of service.",
  },
  {
    code: "15",
    description:
      "The authorization number is missing, invalid, or does not apply to the billed services or provider.",
  },
  {
    code: "16",
    description:
      "Claim/service lacks information or has submission/billing error(s). Usage: Do not use this code for claims attachment(s)/other documentation. At least one Remark Code must be provided (may be comprised of either the NCPDP Reject Reason Code, or Remittance Advice Remark Code that is not an ALERT.) Refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment Information REF), if present.",
  },
  {
    code: "17",
    description:
      "Requested information was not provided or was insufficient/incomplete. At least one Remark Code must be provided (may be comprised of either the Remittance Advice Remark Code or NCPDP Reject Reason Code.)",
  },
  {
    code: "18",
    description:
      "Exact duplicate claim/service (Use only with Group Code OA except where state workers' compensation regulations requires CO)",
  },
  {
    code: "19",
    description:
      "This is a work-related injury/illness and thus the liability of the Worker's Compensation Carrier.",
  },
  {
    code: "20",
    description: "This injury/illness is covered by the liability carrier.",
  },
  {
    code: "21",
    description:
      "This injury/illness is the liability of the no-fault carrier.",
  },
  {
    code: "22",
    description:
      "This care may be covered by another payer per coordination of benefits.",
  },
  {
    code: "23",
    description:
      "The impact of prior payer(s) adjudication including payments and/or adjustments. (Use only with Group Code OA)",
  },
  {
    code: "24",
    description:
      "Charges are covered under a capitation agreement/managed care plan.",
  },
  {
    code: "25",
    description: "Payment denied. Your Stop loss deductible has not been met.",
  },
  {
    code: "26",
    description: "Expenses incurred prior to coverage.",
  },
  {
    code: "27",
    description: "Expenses incurred after coverage terminated.",
  },
  {
    code: "28",
    description: "Coverage not in effect at the time the service was provided.",
  },
  {
    code: "29",
    description: "The time limit for filing has expired.",
  },
  {
    code: "30",
    description:
      "Payment adjusted because the patient has not met the required eligibility, spend down, waiting, or residency requirements.",
  },
  {
    code: "31",
    description: "Patient cannot be identified as our insured.",
  },
  {
    code: "32",
    description:
      "Our records indicate the patient is not an eligible dependent.",
  },
  {
    code: "33",
    description: "Insured has no dependent coverage.",
  },
  {
    code: "34",
    description: "Insured has no coverage for newborns.",
  },
  {
    code: "35",
    description: "Lifetime benefit maximum has been reached.",
  },
  {
    code: "36",
    description: "Balance does not exceed co-payment amount.",
  },
  {
    code: "37",
    description: "Balance does not exceed deductible.",
  },
  {
    code: "38",
    description:
      "Services not provided or authorized by designated (network/primary care) providers.",
  },
  {
    code: "39",
    description:
      "Services denied at the time authorization/pre-certification was requested.",
  },
  {
    code: "40",
    description:
      "Charges do not meet qualifications for emergent/urgent care. Usage: Refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment Information REF), if present.",
  },
  {
    code: "41",
    description: "Discount agreed to in Preferred Provider contract.",
  },
  {
    code: "42",
    description:
      "Charges exceed our fee schedule or maximum allowable amount. (Use CARC 45)",
  },
  {
    code: "43",
    description: "Gramm-Rudman reduction.",
  },
  {
    code: "44",
    description: "Prompt-pay discount.",
  },
  {
    code: "45",
    description:
      "Charge exceeds fee schedule/maximum allowable or contracted/legislated fee arrangement. Usage: This adjustment amount cannot equal the total service or claim charge amount; and must not duplicate provider adjustment amounts (payments and contractual reductions) that have resulted from prior payer(s) adjudication. (Use only with Group Codes PR or CO depending upon liability)",
  },
  {
    code: "46",
    description: "This (these) service(s) is (are) not covered.",
  },
  {
    code: "47",
    description:
      "This (these) diagnosis(es) is (are) not covered, missing, or are invalid.",
  },
  {
    code: "48",
    description: "This (these) procedure(s) is (are) not covered.",
  },
  {
    code: "49",
    description:
      "This is a non-covered service because it is a routine/preventive exam or a diagnostic/screening procedure done in conjunction with a routine/preventive exam. Usage: Refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment Information REF), if present.",
  },
  {
    code: "50",
    description:
      "These are non-covered services because this is not deemed a 'medical necessity' by the payer. Usage: Refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment Information REF), if present.",
  },
  {
    code: "51",
    description:
      "These are non-covered services because this is a pre-existing condition. Usage: Refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment Information REF), if present.",
  },
  {
    code: "52",
    description:
      "The referring/prescribing/rendering provider is not eligible to refer/prescribe/order/perform the service billed.",
  },
  {
    code: "53",
    description:
      "Services by an immediate relative or a member of the same household are not covered.",
  },
  {
    code: "54",
    description:
      "Multiple physicians/assistants are not covered in this case. Usage: Refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment Information REF), if present.",
  },
  {
    code: "55",
    description:
      "Procedure/treatment/drug is deemed experimental/investigational by the payer. Usage: Refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment Information REF), if present.",
  },
  {
    code: "56",
    description:
      "Procedure/treatment has not been deemed 'proven to be effective' by the payer. Usage: Refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment Information REF), if present.",
  },
  {
    code: "57",
    description:
      "Payment denied/reduced because the payer deems the information submitted does not support this level of service, this many services, this length of service, this dosage, or this day's supply.",
  },
  {
    code: "58",
    description:
      "Treatment was deemed by the payer to have been rendered in an inappropriate or invalid place of service. Usage: Refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment Information REF), if present.",
  },
  {
    code: "59",
    description:
      "Processed based on multiple or concurrent procedure rules. (For example multiple surgery or diagnostic imaging, concurrent anesthesia.) Usage: Refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment Information REF), if present.",
  },
  {
    code: "60",
    description:
      "Charges for outpatient services are not covered when performed within a period of time prior to or after inpatient services.",
  },
  {
    code: "61",
    description: "Adjusted for failure to obtain second surgical opinion",
  },
  {
    code: "62",
    description:
      "Payment denied/reduced for absence of, or exceeded, pre-certification/authorization.",
  },
  {
    code: "63",
    description: "Correction to a prior claim.",
  },
  {
    code: "64",
    description: "Denial reversed per Medical Review.",
  },
  {
    code: "65",
    description:
      "Procedure code was incorrect. This payment reflects the correct code.",
  },
  {
    code: "66",
    description: "Blood Deductible.",
  },
  {
    code: "67",
    description: "Lifetime reserve days. (Handled in QTY, QTY01=LA)",
  },
  {
    code: "68",
    description: "DRG weight. (Handled in CLP12)",
  },
  {
    code: "69",
    description: "Day outlier amount.",
  },
  {
    code: "70",
    description:
      "Cost outlier - Adjustment to compensate for additional costs.",
  },
  {
    code: "71",
    description: "Primary Payer amount.",
  },
  {
    code: "72",
    description: "Coinsurance day. (Handled in QTY, QTY01=CD)",
  },
  {
    code: "73",
    description: "Administrative days.",
  },
  {
    code: "74",
    description: "Indirect Medical Education Adjustment.",
  },
  {
    code: "75",
    description: "Direct Medical Education Adjustment.",
  },
  {
    code: "76",
    description: "Disproportionate Share Adjustment.",
  },
  {
    code: "77",
    description: "Covered days. (Handled in QTY, QTY01=CA)",
  },
  {
    code: "78",
    description: "Non-Covered days/Room charge adjustment.",
  },
  {
    code: "79",
    description: "Cost Report days. (Handled in MIA15)",
  },
  {
    code: "80",
    description: "Outlier days. (Handled in QTY, QTY01=OU)",
  },
  {
    code: "81",
    description: "Discharges.",
  },
  {
    code: "82",
    description: "PIP days.",
  },
  {
    code: "83",
    description: "Total visits.",
  },
  {
    code: "84",
    description: "Capital Adjustment. (Handled in MIA)",
  },
  {
    code: "85",
    description: "Patient Interest Adjustment (Use Only Group code PR)",
  },
  {
    code: "86",
    description: "Statutory Adjustment.",
  },
  {
    code: "87",
    description: "Transfer amount.",
  },
  {
    code: "88",
    description:
      "Adjustment amount represents collection against receivable created in prior overpayment.",
  },
  {
    code: "89",
    description: "Professional fees removed from charges.",
  },
  {
    code: "90",
    description:
      "Ingredient cost adjustment. Usage: To be used for pharmaceuticals only.",
  },
  {
    code: "91",
    description: "Dispensing fee adjustment.",
  },
  {
    code: "92",
    description: "Claim Paid in full.",
  },
  {
    code: "93",
    description: "No Claim level Adjustments.",
  },
  {
    code: "94",
    description: "Processed in Excess of charges.",
  },
  {
    code: "95",
    description: "Plan procedures not followed.",
  },
  {
    code: "96",
    description:
      "Non-covered charge(s). At least one Remark Code must be provided (may be comprised of either the NCPDP Reject Reason Code, or Remittance Advice Remark Code that is not an ALERT.) Usage: Refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment Information REF), if present.",
  },
  {
    code: "97",
    description:
      "The benefit for this service is included in the payment/allowance for another service/procedure that has already been adjudicated. Usage: Refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment Information REF), if present.",
  },
  {
    code: "98",
    description:
      "The hospital must file the Medicare claim for this inpatient non-physician service.",
  },
  {
    code: "99",
    description: "Medicare Secondary Payer Adjustment Amount.",
  },
  {
    code: "100",
    description: "Payment made to patient/insured/responsible party.",
  },
  {
    code: "101",
    description:
      "Predetermination: anticipated payment upon completion of services or claim adjudication.",
  },
  {
    code: "102",
    description: "Major Medical Adjustment.",
  },
  {
    code: "103",
    description:
      "Provider promotional discount (e.g., Senior citizen discount).",
  },
  {
    code: "104",
    description: "Managed care withholding.",
  },
  {
    code: "105",
    description: "Tax withholding.",
  },
  {
    code: "106",
    description: "Patient payment option/election not in effect.",
  },
  {
    code: "107",
    description:
      "The related or qualifying claim/service was not identified on this claim. Usage: Refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment Information REF), if present.",
  },
  {
    code: "108",
    description:
      "Rent/purchase guidelines were not met. Usage: Refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment Information REF), if present.",
  },
  {
    code: "109",
    description:
      "Claim/service not covered by this payer/contractor. You must send the claim/service to the correct payer/contractor.",
  },
  {
    code: "110",
    description: "Billing date predates service date.",
  },
  {
    code: "111",
    description: "Not covered unless the provider accepts assignment.",
  },
  {
    code: "112",
    description:
      "Service not furnished directly to the patient and/or not documented.",
  },
  {
    code: "113",
    description:
      "Payment denied because service/procedure was provided outside the United States or as a result of war.",
  },
  {
    code: "114",
    description:
      "Procedure/product not approved by the Food and Drug Administration.",
  },
  {
    code: "115",
    description: "Procedure postponed, canceled, or delayed.",
  },
  {
    code: "116",
    description:
      "The advance indemnification notice signed by the patient did not comply with requirements.",
  },
  {
    code: "117",
    description:
      "Transportation is only covered to the closest facility that can provide the necessary care.",
  },
  {
    code: "118",
    description: "ESRD network support adjustment.",
  },
  {
    code: "119",
    description:
      "Benefit maximum for this time period or occurrence has been reached.",
  },
  {
    code: "120",
    description: "Patient is covered by a managed care plan.",
  },
  {
    code: "121",
    description:
      "Indemnification adjustment - compensation for outstanding member responsibility.",
  },
  {
    code: "122",
    description: "Psychiatric reduction.",
  },
  {
    code: "123",
    description: "Payer refund due to overpayment.",
  },
  {
    code: "124",
    description: "Payer refund amount - not our patient.",
  },
  {
    code: "125",
    description:
      "Submission/billing error(s). At least one Remark Code must be provided (may be comprised of either the NCPDP Reject Reason Code, or Remittance Advice Remark Code that is not an ALERT.)",
  },
  {
    code: "126",
    description: "Deductible -- Major Medical",
  },
  {
    code: "127",
    description: "Coinsurance -- Major Medical",
  },
  {
    code: "128",
    description: "Newborn's services are covered in the mother's Allowance.",
  },
  {
    code: "129",
    description:
      "Prior processing information appears incorrect. At least one Remark Code must be provided (may be comprised of either the NCPDP Reject Reason Code, or Remittance Advice Remark Code that is not an ALERT.)",
  },
  {
    code: "130",
    description: "Claim submission fee.",
  },
  {
    code: "131",
    description: "Claim specific negotiated discount.",
  },
  {
    code: "132",
    description: "Prearranged demonstration project adjustment.",
  },
  {
    code: "133",
    description:
      "The disposition of this service line is pending further review. (Use only with Group Code OA). Usage: Use of this code requires a reversal and correction when the service line is finalized (use only in Loop 2110 CAS segment of the 835 or Loop 2430 of the 837).",
  },
  {
    code: "134",
    description: "Technical fees removed from charges.",
  },
  {
    code: "135",
    description: "Interim bills cannot be processed.",
  },
  {
    code: "136",
    description:
      "Failure to follow prior payer's coverage rules. (Use only with Group Code OA)",
  },
  {
    code: "137",
    description:
      "Regulatory Surcharges, Assessments, Allowances or Health Related Taxes.",
  },
  {
    code: "138",
    description: "Appeal procedures not followed or time limits not met.",
  },
  {
    code: "139",
    description:
      "Contracted funding agreement - Subscriber is employed by the provider of services. Use only with Group Code CO.",
  },
  {
    code: "140",
    description:
      "Patient/Insured health identification number and name do not match.",
  },
  {
    code: "141",
    description: "Claim spans eligible and ineligible periods of coverage.",
  },
  {
    code: "142",
    description: "Monthly Medicaid patient liability amount.",
  },
  {
    code: "143",
    description: "Portion of payment deferred.",
  },
  {
    code: "144",
    description: "Incentive adjustment, e.g. preferred product/service.",
  },
  {
    code: "145",
    description: "Premium payment withholding",
  },
  {
    code: "146",
    description: "Diagnosis was invalid for the date(s) of service reported.",
  },
  {
    code: "147",
    description: "Provider contracted/negotiated rate expired or not on file.",
  },
  {
    code: "148",
    description:
      "Information from another provider was not provided or was insufficient/incomplete. At least one Remark Code must be provided (may be comprised of either the NCPDP Reject Reason Code, or Remittance Advice Remark Code that is not an ALERT.)",
  },
  {
    code: "149",
    description:
      "Lifetime benefit maximum has been reached for this service/benefit category.",
  },
  {
    code: "150",
    description:
      "Payer deems the information submitted does not support this level of service.",
  },
  {
    code: "151",
    description:
      "Payment adjusted because the payer deems the information submitted does not support this many/frequency of services.",
  },
  {
    code: "152",
    description:
      "Payer deems the information submitted does not support this length of service. Usage: Refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment Information REF), if present.",
  },
  {
    code: "153",
    description:
      "Payer deems the information submitted does not support this dosage.",
  },
  {
    code: "154",
    description:
      "Payer deems the information submitted does not support this day's supply.",
  },
  {
    code: "155",
    description: "Patient refused the service/procedure.",
  },
  {
    code: "156",
    description: "Flexible spending account payments. Note: Use code 187.",
  },
  {
    code: "157",
    description: "Service/procedure was provided as a result of an act of war.",
  },
  {
    code: "158",
    description: "Service/procedure was provided outside of the United States.",
  },
  {
    code: "159",
    description: "Service/procedure was provided as a result of terrorism.",
  },
  {
    code: "160",
    description:
      "Injury/illness was the result of an activity that is a benefit exclusion.",
  },
  {
    code: "161",
    description: "Provider performance bonus",
  },
  {
    code: "162",
    description:
      "State-mandated Requirement for Property and Casualty, see Claim Payment Remarks Code for specific explanation.",
  },
  {
    code: "163",
    description:
      "Attachment/other documentation referenced on the claim was not received.",
  },
  {
    code: "164",
    description:
      "Attachment/other documentation referenced on the claim was not received in a timely fashion.",
  },
  {
    code: "165",
    description: "Referral absent or exceeded.",
  },
  {
    code: "166",
    description:
      "These services were submitted after this payers responsibility for processing claims under this plan ended.",
  },
  {
    code: "167",
    description:
      "This (these) diagnosis(es) is (are) not covered. Usage: Refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment Information REF), if present.",
  },
  {
    code: "168",
    description:
      "Service(s) have been considered under the patient's medical plan. Benefits are not available under this dental plan.",
  },
  {
    code: "169",
    description: "Alternate benefit has been provided.",
  },
  {
    code: "170",
    description:
      "Payment is denied when performed/billed by this type of provider. Usage: Refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment Information REF), if present.",
  },
  {
    code: "171",
    description:
      "Payment is denied when performed/billed by this type of provider in this type of facility. Usage: Refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment Information REF), if present.",
  },
  {
    code: "172",
    description:
      "Payment is adjusted when performed/billed by a provider of this specialty. Usage: Refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment Information REF), if present.",
  },
  {
    code: "173",
    description: "Service/equipment was not prescribed by a physician.",
  },
  {
    code: "174",
    description: "Service was not prescribed prior to delivery.",
  },
  {
    code: "175",
    description: "Prescription is incomplete.",
  },
  {
    code: "176",
    description: "Prescription is not current.",
  },
  {
    code: "177",
    description: "Patient has not met the required eligibility requirements.",
  },
  {
    code: "178",
    description: "Patient has not met the required spend down requirements.",
  },
  {
    code: "179",
    description:
      "Patient has not met the required waiting requirements. Usage: Refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment Information REF), if present.",
  },
  {
    code: "180",
    description: "Patient has not met the required residency requirements.",
  },
  {
    code: "181",
    description: "Procedure code was invalid on the date of service.",
  },
  {
    code: "182",
    description: "Procedure modifier was invalid on the date of service.",
  },
  {
    code: "183",
    description:
      "The referring provider is not eligible to refer the service billed. Usage: Refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment Information REF), if present.",
  },
  {
    code: "184",
    description:
      "The prescribing/ordering provider is not eligible to prescribe/order the service billed. Usage: Refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment Information REF), if present.",
  },
  {
    code: "185",
    description:
      "The rendering provider is not eligible to perform the service billed. Usage: Refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment Information REF), if present.",
  },
  {
    code: "186",
    description: "Level of care change adjustment.",
  },
  {
    code: "187",
    description:
      "Consumer Spending Account payments (includes but is not limited to Flexible Spending Account, Health Savings Account, Health Reimbursement Account, etc.)",
  },
  {
    code: "188",
    description:
      "This product/procedure is only covered when used according to FDA recommendations.",
  },
  {
    code: "189",
    description:
      "'Not otherwise classified' or 'unlisted' procedure code (CPT/HCPCS) was billed when there is a specific procedure code for this procedure/service",
  },
  {
    code: "190",
    description:
      "Payment is included in the allowance for a Skilled Nursing Facility (SNF) qualified stay.",
  },
  {
    code: "191",
    description:
      "Not a work related injury/illness and thus not the liability of the workers' compensation carrier Note: If adjustment is at the Claim Level, the payer must send and the provider should refer to the 835 Insurance Policy Number Segment (Loop 2100 Other Claim Related Information REF qualifier 'IG') for the jurisdictional regulation. If adjustment is at the Line Level, the payer must send and the provider should refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment information REF)",
  },
  {
    code: "192",
    description:
      "Non standard adjustment code from paper remittance. Usage: This code is to be used by providers/payers providing Coordination of Benefits information to another payer in the 837 transaction only. This code is only used when the non-standard code cannot be reasonably mapped to an existing Claims Adjustment Reason Code, specifically Deductible, Coinsurance and Co-payment.",
  },
  {
    code: "193",
    description:
      "Original payment decision is being maintained. Upon review, it was determined that this claim was processed properly.",
  },
  {
    code: "194",
    description:
      "Anesthesia performed by the operating physician, the assistant surgeon or the attending physician.",
  },
  {
    code: "195",
    description:
      "Refund issued to an erroneous priority payer for this claim/service.",
  },
  {
    code: "196",
    description:
      "Claim/service denied based on prior payer's coverage determination.",
  },
  {
    code: "197",
    description:
      "Precertification/authorization/notification/pre-treatment absent.",
  },
  {
    code: "198",
    description:
      "Precertification/notification/authorization/pre-treatment exceeded.",
  },
  {
    code: "199",
    description: "Revenue code and Procedure code do not match.",
  },
  {
    code: "200",
    description: "Expenses incurred during lapse in coverage",
  },
  {
    code: "201",
    description:
      "Patient is responsible for amount of this claim/service through 'set aside arrangement' or other agreement. (Use only with Group Code PR)  At least one Remark Code must be provided (may be comprised of either the NCPDP Reject Reason Code, or Remittance Advice Remark Code that is not an ALERT.)",
  },
  {
    code: "202",
    description: "Non-covered personal comfort or convenience services.",
  },
  {
    code: "203",
    description: "Discontinued or reduced service.",
  },
  {
    code: "204",
    description:
      "This service/equipment/drug is not covered under the patient's current benefit plan",
  },
  {
    code: "205",
    description: "Pharmacy discount card processing fee",
  },
  {
    code: "206",
    description: "National Provider Identifier - missing.",
  },
  {
    code: "207",
    description: "National Provider identifier - Invalid format",
  },
  {
    code: "208",
    description: "National Provider Identifier - Not matched.",
  },
  {
    code: "209",
    description:
      "Per regulatory or other agreement. The provider cannot collect this amount from the patient. However, this amount may be billed to subsequent payer. Refund to patient if collected. (Use only with Group code OA)",
  },
  {
    code: "210",
    description:
      "Payment adjusted because pre-certification/authorization not received in a timely fashion",
  },
  {
    code: "211",
    description:
      "National Drug Codes (NDC) not eligible for rebate, are not covered.",
  },
  {
    code: "212",
    description: "Administrative surcharges are not covered",
  },
  {
    code: "213",
    description:
      "Non-compliance with the physician self referral prohibition legislation or payer policy.",
  },
  {
    code: "214",
    description:
      "Workers' Compensation claim adjudicated as non-compensable. This Payer not liable for claim or service/treatment. Note: If adjustment is at the Claim Level, the payer must send and the provider should refer to the 835 Insurance Policy Number Segment (Loop 2100 Other Claim Related Information REF qualifier 'IG') for the jurisdictional regulation. If adjustment is at the Line Level, the payer must send and the provider should refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment information REF). To be used for Workers' Compensation only",
  },
  {
    code: "215",
    description: "Based on subrogation of a third party settlement",
  },
  {
    code: "216",
    description:
      "Based on the findings of a review organization or the payer's findings.",
  },
  {
    code: "217",
    description:
      "Based on payer reasonable and customary fees. No maximum allowable defined by legislated fee arrangement. (Note: To be used for Property and Casualty only)",
  },
  {
    code: "218",
    description:
      "Based on entitlement to benefits. Note: If adjustment is at the Claim Level, the payer must send and the provider should refer to the 835 Insurance Policy Number Segment (Loop 2100 Other Claim Related Information REF qualifier 'IG') for the jurisdictional regulation. If adjustment is at the Line Level, the payer must send and the provider should refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment information REF). To be used for Workers' Compensation only",
  },
  {
    code: "219",
    description:
      "Based on extent of injury. Usage: If adjustment is at the Claim Level, the payer must send and the provider should refer to the 835 Insurance Policy Number Segment (Loop 2100 Other Claim Related Information REF qualifier 'IG') for the jurisdictional regulation. If adjustment is at the Line Level, the payer must send and the provider should refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment information REF).",
  },
  {
    code: "220",
    description:
      "The applicable fee schedule/fee database does not contain the billed code. Please resubmit a bill with the appropriate fee schedule/fee database code(s) that best describe the service(s) provided and supporting documentation if required. (Note: To be used for Property and Casualty only)",
  },
  {
    code: "221",
    description:
      "Claim is under investigation. Note: If adjustment is at the Claim Level, the payer must send and the provider should refer to the 835 Insurance Policy Number Segment (Loop 2100 Other Claim Related Information REF qualifier 'IG') for the jurisdictional regulation. If adjustment is at the Line Level, the payer must send and the provider should refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment information REF). (Note: To be used by Property & Casualty only)",
  },
  {
    code: "222",
    description:
      "Exceeds the contracted maximum number of hours/days/units by this provider for this period. This is not patient specific. Usage: Refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment Information REF), if present.",
  },
  {
    code: "223",
    description:
      "Adjustment code for mandated federal, state or local law/regulation that is not already covered by another code and is mandated before a new code can be created.",
  },
  {
    code: "224",
    description:
      "Patient identification compromised by identity theft. Identity verification required for processing this and future claims.",
  },
  {
    code: "225",
    description:
      "Penalty or Interest Payment by Payer (Only used for plan to plan encounter reporting within the 837)",
  },
  {
    code: "226",
    description:
      "Information requested from the Billing/Rendering Provider was not provided or not provided timely or was insufficient/incomplete. At least one Remark Code must be provided (may be comprised of either the NCPDP Reject Reason Code, or Remittance Advice Remark Code that is not an ALERT.)",
  },
  {
    code: "227",
    description:
      "Information requested from the patient/insured/responsible party was not provided or was insufficient/incomplete. At least one Remark Code must be provided (may be comprised of either the NCPDP Reject Reason Code, or Remittance Advice Remark Code that is not an ALERT.)",
  },
  {
    code: "228",
    description:
      "Denied for failure of this provider, another provider or the subscriber to supply requested information to a previous payer for their adjudication",
  },
  {
    code: "229",
    description:
      "Partial charge amount not considered by Medicare due to the initial claim Type of Bill being 12X. Usage: This code can only be used in the 837 transaction to convey Coordination of Benefits information when the secondary payer's cost avoidance policy allows providers to bypass claim submission to a prior payer. (Use only with Group Code PR)",
  },
  {
    code: "230",
    description:
      "No available or correlating CPT/HCPCS code to describe this service. Note: Used only by Property and Casualty.",
  },
  {
    code: "231",
    description:
      "Mutually exclusive procedures cannot be done in the same day/setting. Usage: Refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment Information REF), if present.",
  },
  {
    code: "232",
    description:
      "Institutional Transfer Amount. Usage: Applies to institutional claims only and explains the DRG amount difference when the patient care crosses multiple institutions.",
  },
  {
    code: "233",
    description:
      "Services/charges related to the treatment of a hospital-acquired condition or preventable medical error.",
  },
  {
    code: "234",
    description:
      "This procedure is not paid separately. At least one Remark Code must be provided (may be comprised of either the NCPDP Reject Reason Code, or Remittance Advice Remark Code that is not an ALERT.)",
  },
  {
    code: "235",
    description: "Sales Tax",
  },
  {
    code: "236",
    description:
      "This procedure or procedure/modifier combination is not compatible with another procedure or procedure/modifier combination provided on the same day according to the National Correct Coding Initiative or workers compensation state regulations/ fee schedule requirements.",
  },
  {
    code: "237",
    description:
      "Legislated/Regulatory Penalty. At least one Remark Code must be provided (may be comprised of either the NCPDP Reject Reason Code, or Remittance Advice Remark Code that is not an ALERT.)",
  },
  {
    code: "238",
    description:
      "Claim spans eligible and ineligible periods of coverage, this is the reduction for the ineligible period. (Use only with Group Code PR)",
  },
  {
    code: "239",
    description:
      "Claim spans eligible and ineligible periods of coverage. Rebill separate claims.",
  },
  {
    code: "240",
    description:
      "The diagnosis is inconsistent with the patient's birth weight. Usage: Refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment Information REF), if present.",
  },
  {
    code: "241",
    description: "Low Income Subsidy (LIS) Co-payment Amount",
  },
  {
    code: "242",
    description: "Services not provided by network/primary care providers.",
  },
  {
    code: "243",
    description: "Services not authorized by network/primary care providers.",
  },
  {
    code: "244",
    description:
      "Payment reduced to zero due to litigation. Additional information will be sent following the conclusion of litigation. To be used for Property & Casualty only.",
  },
  {
    code: "245",
    description: "Provider performance program withhold.",
  },
  {
    code: "246",
    description: "This non-payable code is for required reporting only.",
  },
  {
    code: "247",
    description:
      "Deductible for Professional service rendered in an Institutional setting and billed on an Institutional claim.",
  },
  {
    code: "248",
    description:
      "Coinsurance for Professional service rendered in an Institutional setting and billed on an Institutional claim.",
  },
  {
    code: "249",
    description:
      "This claim has been identified as a readmission. (Use only with Group Code CO)",
  },
  {
    code: "250",
    description:
      "The attachment/other documentation that was received was the incorrect attachment/document. The expected attachment/document is still missing. At least one Remark Code must be provided (may be comprised of either the NCPDP Reject Reason Code, or Remittance Advice Remark Code that is not an ALERT).",
  },
  {
    code: "251",
    description:
      "The attachment/other documentation that was received was incomplete or deficient. The necessary information is still needed to process the claim. At least one Remark Code must be provided (may be comprised of either the NCPDP Reject Reason Code, or Remittance Advice Remark Code that is not an ALERT).",
  },
  {
    code: "252",
    description:
      "An attachment/other documentation is required to adjudicate this claim/service. At least one Remark Code must be provided (may be comprised of either the NCPDP Reject Reason Code, or Remittance Advice Remark Code that is not an ALERT).",
  },
  {
    code: "253",
    description: "Sequestration - reduction in federal payment",
  },
  {
    code: "254",
    description:
      "Claim received by the dental plan, but benefits not available under this plan.  Submit these services to the patient's medical plan for further consideration.",
  },
  {
    code: "255",
    description:
      "The disposition of the related Property & Casualty claim (injury or illness) is pending due to litigation. (Use only with Group Code OA)",
  },
  {
    code: "256",
    description: "Service not payable per managed care contract.",
  },
  {
    code: "257",
    description:
      "The disposition of the claim/service is undetermined during the premium payment grace period, per Health Insurance Exchange requirements. This claim/service will be reversed and corrected when the grace period ends (due to premium payment or lack of premium payment). (Use only with Group Code OA)",
  },
  {
    code: "258",
    description:
      "Claim/service not covered when patient is in custody/incarcerated. Applicable federal, state or local authority may cover the claim/service.",
  },
  {
    code: "259",
    description: "Additional payment for Dental/Vision service utilization.",
  },
  {
    code: "260",
    description: "Processed under Medicaid ACA Enhanced Fee Schedule",
  },
  {
    code: "261",
    description:
      "The procedure or service is inconsistent with the patient's history.",
  },
  {
    code: "262",
    description:
      "Adjustment for delivery cost. Usage: To be used for pharmaceuticals only.",
  },
  {
    code: "263",
    description:
      "Adjustment for shipping cost. Usage: To be used for pharmaceuticals only.",
  },
  {
    code: "264",
    description:
      "Adjustment for postage cost. Usage: To be used for pharmaceuticals only.",
  },
  {
    code: "265",
    description:
      "Adjustment for administrative cost. Usage: To be used for pharmaceuticals only.",
  },
  {
    code: "266",
    description:
      "Adjustment for compound preparation cost. Usage: To be used for pharmaceuticals only.",
  },
  {
    code: "267",
    description:
      "Claim/service spans multiple months. At least one Remark Code must be provided (may be comprised of either the NCPDP Reject Reason Code, or Remittance Advice Remark Code that is not an ALERT.)",
  },
  {
    code: "268",
    description:
      "The Claim spans two calendar years. Please resubmit one claim per calendar year.",
  },
  {
    code: "269",
    description:
      "Anesthesia not covered for this service/procedure. Usage: Refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment Information REF), if present.",
  },
  {
    code: "270",
    description:
      "Claim received by the medical plan, but benefits not available under this plan. Submit these services to the patient's dental plan for further consideration.",
  },
  {
    code: "271",
    description:
      "Prior contractual reductions related to a current periodic payment as part of a contractual payment schedule when deferred amounts have been previously reported. (Use only with Group Code OA)",
  },
  {
    code: "272",
    description: "Coverage/program guidelines were not met.",
  },
  {
    code: "273",
    description: "Coverage/program guidelines were exceeded.",
  },
  {
    code: "274",
    description:
      "Fee/Service not payable per patient Care Coordination arrangement.",
  },
  {
    code: "275",
    description:
      "Prior payer's (or payers') patient responsibility (deductible, coinsurance, co-payment) not covered. (Use only with Group Code PR)",
  },
  {
    code: "276",
    description:
      "Services denied by the prior payer(s) are not covered by this payer.",
  },
  {
    code: "277",
    description:
      "The disposition of the claim/service is undetermined during the premium payment grace period, per Health Insurance SHOP Exchange requirements. This claim/service will be reversed and corrected when the grace period ends (due to premium payment or lack of premium payment). (Use only with Group Code OA)",
  },
  {
    code: "278",
    description:
      "Performance program proficiency requirements not met. (Use only with Group Codes CO or PI) Usage: Refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment Information REF), if present.",
  },
  {
    code: "279",
    description:
      "Services not provided by Preferred network providers. Usage: Use this code when there are member network limitations. For example, using contracted providers not in the member's 'narrow' network.",
  },
  {
    code: "280",
    description:
      "Claim received by the medical plan, but benefits not available under this plan. Submit these services to the patient's Pharmacy plan for further consideration.",
  },
  {
    code: "281",
    description:
      "Deductible waived per contractual agreement. Use only with Group Code CO.",
  },
  {
    code: "282",
    description:
      "The procedure/revenue code is inconsistent with the type of bill. Usage: Refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment Information REF), if present.",
  },
  {
    code: "283",
    description:
      "Attending provider is not eligible to provide direction of care.",
  },
  {
    code: "284",
    description:
      "Precertification/authorization/notification/pre-treatment number may be valid but does not apply to the billed services.",
  },
  {
    code: "285",
    description: "Appeal procedures not followed",
  },
  {
    code: "286",
    description: "Appeal time limits not met",
  },
  {
    code: "287",
    description: "Referral exceeded",
  },
  {
    code: "288",
    description: "Referral absent",
  },
  {
    code: "289",
    description:
      "Services considered under the dental and medical plans, benefits not available.",
  },
  {
    code: "290",
    description:
      "Claim received by the dental plan, but benefits not available under this plan. Claim has been forwarded to the patient's medical plan for further consideration.",
  },
  {
    code: "291",
    description:
      "Claim received by the medical plan, but benefits not available under this plan. Claim has been forwarded to the patient's dental plan for further consideration.",
  },
  {
    code: "292",
    description:
      "Claim received by the medical plan, but benefits not available under this plan. Claim has been forwarded to the patient's pharmacy plan for further consideration.",
  },
  {
    code: "293",
    description: "Payment made to employer.",
  },
  {
    code: "294",
    description: "Payment made to attorney.",
  },
  {
    code: "295",
    description: "Pharmacy Direct/Indirect Remuneration (DIR)",
  },
  {
    code: "296",
    description:
      "Precertification/authorization/notification/pre-treatment number may be valid but does not apply to the provider.",
  },
  {
    code: "297",
    description:
      "Claim received by the medical plan, but benefits not available under this plan. Submit these services to the patient's vision plan for further consideration.",
  },
  {
    code: "298",
    description:
      "Claim received by the medical plan, but benefits not available under this plan. Claim has been forwarded to the patient's vision plan for further consideration.",
  },
  {
    code: "299",
    description:
      "The billing provider is not eligible to receive payment for the service billed.",
  },
  {
    code: "300",
    description:
      "Claim received by the Medical Plan, but benefits not available under this plan. Claim has been forwarded to the patient's Behavioral Health Plan for further consideration.",
  },
  {
    code: "301",
    description:
      "Claim received by the Medical Plan, but benefits not available under this plan. Submit these services to the patient's Behavioral Health Plan for further consideration.",
  },
  {
    code: "302",
    description:
      "Precertification/notification/authorization/pre-treatment time limit has expired.",
  },
  {
    code: "303",
    description:
      "Prior payer's (or payers') patient responsibility (deductible, coinsurance, co-payment) not covered for Qualified Medicare and Medicaid Beneficiaries. (Use only with Group Code CO)",
  },
  {
    code: "304",
    description:
      "Claim received by the medical plan, but benefits not available under this plan. Submit these services to the patient's hearing plan for further consideration.",
  },
  {
    code: "305",
    description:
      "Claim received by the medical plan, but benefits not available under this plan. Claim has been forwarded to the patient's hearing plan for further consideration.",
  },
  {
    code: "306",
    description:
      "Type of bill is inconsistent with the patient status. Usage: Refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment Information REF), if present.",
  },
  {
    code: "307",
    description:
      "Medicare Maximum Fair Price Standard Default Refund Amount Adjustment. At least one Remark Code must be provided (may be comprised of either the NCPDP Reject Reason Code, or Remittance Advice Remark Code that is not an ALERT.) Usage: To be used only for the Medicare Drug Price Negotiation Program.",
  },
  {
    code: "308",
    description:
      "Payment is adjusted due to contracted funding agreement between the payer and provider.",
  },
  {
    code: "A0",
    description: "Patient refund amount.",
  },
  {
    code: "A1",
    description:
      "Claim/Service denied. At least one Remark Code must be provided (may be comprised of either the NCPDP Reject Reason Code, or Remittance Advice Remark Code that is not an ALERT.)  Usage: Use this code only when a more specific Claim Adjustment Reason Code is not available.",
  },
  {
    code: "A2",
    description: "Contractual adjustment.",
  },
  {
    code: "A3",
    description: "Medicare Secondary Payer liability met.",
  },
  {
    code: "A4",
    description: "Medicare Claim PPS Capital Day Outlier Amount.",
  },
  {
    code: "A5",
    description: "Medicare Claim PPS Capital Cost Outlier Amount.",
  },
  {
    code: "A6",
    description:
      "Prior hospitalization or 30 day transfer requirement not met.",
  },
  {
    code: "A7",
    description: "Presumptive Payment Adjustment",
  },
  {
    code: "A8",
    description: "Ungroupable DRG.",
  },
  {
    code: "B1",
    description: "Non-covered visits.",
  },
  {
    code: "B2",
    description: "Covered visits.",
  },
  {
    code: "B3",
    description: "Covered charges.",
  },
  {
    code: "B4",
    description: "Late filing penalty.",
  },
  {
    code: "B5",
    description: "Coverage/program guidelines were not met or were exceeded.",
  },
  {
    code: "B6",
    description:
      "This payment is adjusted when performed/billed by this type of provider, by this type of provider in this type of facility, or by a provider of this specialty.",
  },
  {
    code: "B7",
    description:
      "This provider was not certified/eligible to be paid for this procedure/service on this date of service. Usage: Refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment Information REF), if present.",
  },
  {
    code: "B8",
    description:
      "Alternative services were available, and should have been utilized. Usage: Refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment Information REF), if present.",
  },
  {
    code: "B9",
    description: "Patient is enrolled in a Hospice.",
  },
  {
    code: "B10",
    description:
      "Allowed amount has been reduced because a component of the basic procedure/test was paid. The beneficiary is not liable for more than the charge limit for the basic procedure/test.",
  },
  {
    code: "B11",
    description:
      "The claim/service has been transferred to the proper payer/processor for processing. Claim/service not covered by this payer/processor.",
  },
  {
    code: "B12",
    description: "Services not documented in patient's medical records.",
  },
  {
    code: "B13",
    description:
      "Previously paid. Payment for this claim/service may have been provided in a previous payment.",
  },
  {
    code: "B14",
    description:
      "Only one visit or consultation per physician per day is covered.",
  },
  {
    code: "B15",
    description:
      "This service/procedure requires that a qualifying service/procedure be received and covered. The qualifying other service/procedure has not been received/adjudicated. Usage: Refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment Information REF), if present.",
  },
  {
    code: "B16",
    description: "'New Patient' qualifications were not met.",
  },
  {
    code: "B17",
    description:
      "Payment adjusted because this service was not prescribed by a physician, not prescribed prior to delivery, the prescription is incomplete, or the prescription is not current.",
  },
  {
    code: "B18",
    description:
      "This procedure code and modifier were invalid on the date of service.",
  },
  {
    code: "B19",
    description:
      "Claim/service adjusted because of the finding of a Review Organization.",
  },
  {
    code: "B20",
    description:
      "Procedure/service was partially or fully furnished by another provider.",
  },
  {
    code: "B21",
    description:
      "The charges were reduced because the service/care was partially furnished by another physician.",
  },
  {
    code: "B22",
    description: "This payment is adjusted based on the diagnosis.",
  },
  {
    code: "B23",
    description:
      "Procedure billed is not authorized per your Clinical Laboratory Improvement Amendment (CLIA) proficiency test.",
  },
  {
    code: "D1",
    description:
      "Claim/service denied. Level of subluxation is missing or inadequate.",
  },
  {
    code: "D2",
    description:
      "Claim lacks the name, strength, or dosage of the drug furnished.",
  },
  {
    code: "D3",
    description:
      "Claim/service denied because information to indicate if the patient owns the equipment that requires the part or supply was missing.",
  },
  {
    code: "D4",
    description:
      "Claim/service does not indicate the period of time for which this will be needed.",
  },
  {
    code: "D5",
    description:
      "Claim/service denied. Claim lacks individual lab codes included in the test.",
  },
  {
    code: "D6",
    description:
      "Claim/service denied. Claim did not include patient's medical record for the service.",
  },
  {
    code: "D7",
    description:
      "Claim/service denied. Claim lacks date of patient's most recent physician visit.",
  },
  {
    code: "D8",
    description:
      "Claim/service denied. Claim lacks indicator that 'x-ray is available for review.'",
  },
  {
    code: "D9",
    description:
      "Claim/service denied. Claim lacks invoice or statement certifying the actual cost of the lens, less discounts or the type of intraocular lens used.",
  },
  {
    code: "D10",
    description:
      "Claim/service denied. Completed physician financial relationship form not on file.",
  },
  {
    code: "D11",
    description: "Claim lacks completed pacemaker registration form.",
  },
  {
    code: "D12",
    description:
      "Claim/service denied. Claim does not identify who performed the purchased diagnostic test or the amount you were charged for the test.",
  },
  {
    code: "D13",
    description:
      "Claim/service denied. Performed by a facility/supplier in which the ordering/referring physician has a financial interest.",
  },
  {
    code: "D14",
    description: "Claim lacks indication that plan of treatment is on file.",
  },
  {
    code: "D15",
    description:
      "Claim lacks indication that service was supervised or evaluated by a physician.",
  },
  {
    code: "D16",
    description: "Claim lacks prior payer payment information.",
  },
  {
    code: "D17",
    description: "Claim/Service has invalid non-covered days.",
  },
  {
    code: "D18",
    description: "Claim/Service has missing diagnosis information.",
  },
  {
    code: "D19",
    description:
      "Claim/Service lacks Physician/Operative or other supporting documentation",
  },
  {
    code: "D20",
    description: "Claim/Service missing service/product information.",
  },
  {
    code: "D21",
    description: "This (these) diagnosis(es) is (are) missing or are invalid",
  },
  {
    code: "D22",
    description:
      "Reimbursement was adjusted for the reasons to be provided in separate correspondence. (Note: To be used for Workers' Compensation only) - Temporary code to be added for timeframe only until 01/01/2009. Another code to be established and/or for 06/2008 meeting for a revised code to replace or strategy to use another existing code",
  },
  {
    code: "D23",
    description:
      "This dual eligible patient is covered by Medicare Part D per Medicare Retro-Eligibility.  At least one Remark Code must be provided (may be comprised of either the NCPDP Reject Reason Code, or Remittance Advice Remark Code that is not an ALERT.)",
  },
  {
    code: "P1",
    description:
      "State-mandated Requirement for Property and Casualty, see Claim Payment Remarks Code for specific explanation. To be used for Property and Casualty only.",
  },
  {
    code: "P2",
    description:
      "Not a work related injury/illness and thus not the liability of the workers' compensation carrier Usage: If adjustment is at the Claim Level, the payer must send and the provider should refer to the 835 Insurance Policy Number Segment (Loop 2100 Other Claim Related Information REF qualifier 'IG') for the jurisdictional regulation. If adjustment is at the Line Level, the payer must send and the provider should refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment information REF). To be used for Workers' Compensation only.",
  },
  {
    code: "P3",
    description:
      "Workers' Compensation case settled. Patient is responsible for amount of this claim/service through WC 'Medicare set aside arrangement' or other agreement. To be used for Workers' Compensation only. (Use only with Group Code PR)",
  },
  {
    code: "P4",
    description:
      "Workers' Compensation claim adjudicated as non-compensable. This Payer not liable for claim or service/treatment. Usage: If adjustment is at the Claim Level, the payer must send and the provider should refer to the 835 Insurance Policy Number Segment (Loop 2100 Other Claim Related Information REF qualifier 'IG') for the jurisdictional regulation. If adjustment is at the Line Level, the payer must send and the provider should refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment information REF). To be used for Workers' Compensation only",
  },
  {
    code: "P5",
    description:
      "Based on payer reasonable and customary fees. No maximum allowable defined by legislated fee arrangement. To be used for Property and Casualty only.",
  },
  {
    code: "P6",
    description:
      "Based on entitlement to benefits. Usage: If adjustment is at the Claim Level, the payer must send and the provider should refer to the 835 Insurance Policy Number Segment (Loop 2100 Other Claim Related Information REF qualifier 'IG') for the jurisdictional regulation. If adjustment is at the Line Level, the payer must send and the provider should refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment information REF). To be used for Property and Casualty only.",
  },
  {
    code: "P7",
    description:
      "The applicable fee schedule/fee database does not contain the billed code. Please resubmit a bill with the appropriate fee schedule/fee database code(s) that best describe the service(s) provided and supporting documentation if required. To be used for Property and Casualty only.",
  },
  {
    code: "P8",
    description:
      "Claim is under investigation. Usage: If adjustment is at the Claim Level, the payer must send and the provider should refer to the 835 Insurance Policy Number Segment (Loop 2100 Other Claim Related Information REF qualifier 'IG') for the jurisdictional regulation. If adjustment is at the Line Level, the payer must send and the provider should refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment information REF). To be used for Property and Casualty only.",
  },
  {
    code: "P9",
    description:
      "No available or correlating CPT/HCPCS code to describe this service. To be used for Property and Casualty only.",
  },
  {
    code: "P10",
    description:
      "Payment reduced to zero due to litigation. Additional information will be sent following the conclusion of litigation. To be used for Property and Casualty only.",
  },
  {
    code: "P11",
    description:
      "The disposition of the related Property & Casualty claim (injury or illness) is pending due to litigation. To be used for Property and Casualty only. (Use only with Group Code OA)",
  },
  {
    code: "P12",
    description:
      "Workers' compensation jurisdictional fee schedule adjustment. Usage: If adjustment is at the Claim Level, the payer must send and the provider should refer to the 835 Class of Contract Code Identification Segment (Loop 2100 Other Claim Related Information REF). If adjustment is at the Line Level, the payer must send and the provider should refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment information REF) if the regulations apply. To be used for Workers' Compensation only.",
  },
  {
    code: "P13",
    description:
      "Payment reduced or denied based on workers' compensation jurisdictional regulations or payment policies, use only if no other code is applicable. Usage: If adjustment is at the Claim Level, the payer must send and the provider should refer to the 835 Insurance Policy Number Segment (Loop 2100 Other Claim Related Information REF qualifier 'IG') if the jurisdictional regulation applies. If adjustment is at the Line Level, the payer must send and the provider should refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment information REF) if the regulations apply. To be used for Workers' Compensation only.",
  },
  {
    code: "P14",
    description:
      "The Benefit for this Service is included in the payment/allowance for another service/procedure that has been performed on the same day. Usage: Refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment Information REF), if present. To be used for Property and Casualty only.",
  },
  {
    code: "P15",
    description:
      "Workers' Compensation Medical Treatment Guideline Adjustment. To be used for Workers' Compensation only.",
  },
  {
    code: "P16",
    description:
      "Medical provider not authorized/certified to provide treatment to injured workers in this jurisdiction. To be used for Workers' Compensation only. (Use with Group Code CO or OA)",
  },
  {
    code: "P17",
    description:
      "Referral not authorized by attending physician per regulatory requirement. To be used for Property and Casualty only.",
  },
  {
    code: "P18",
    description:
      "Procedure is not listed in the jurisdiction fee schedule.  An allowance has been made for a comparable service. To be used for Property and Casualty only.",
  },
  {
    code: "P19",
    description:
      "Procedure has a relative value of zero in the jurisdiction fee schedule, therefore no payment is due. To be used for Property and Casualty only.",
  },
  {
    code: "P20",
    description:
      "Service not paid under jurisdiction allowed outpatient facility fee schedule. To be used for Property and Casualty only.",
  },
  {
    code: "P21",
    description:
      "Payment denied based on the Medical Payments Coverage (MPC) and/or Personal Injury Protection (PIP) Benefits jurisdictional regulations, or payment policies. Usage: If adjustment is at the Claim Level, the payer must send and the provider should refer to the 835 Insurance Policy Number Segment (Loop 2100 Other Claim Related Information REF qualifier 'IG') if the jurisdictional regulation applies. If adjustment is at the Line Level, the payer must send and the provider should refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment information REF) if the regulations apply. To be used for Property and Casualty Auto only.",
  },
  {
    code: "P22",
    description:
      "Payment adjusted based on the Medical Payments Coverage (MPC) and/or Personal Injury Protection (PIP) Benefits jurisdictional regulations, or payment policies. Usage: If adjustment is at the Claim Level, the payer must send and the provider should refer to the 835 Insurance Policy Number Segment (Loop 2100 Other Claim Related Information REF qualifier 'IG') if the jurisdictional regulation applies. If adjustment is at the Line Level, the payer must send and the provider should refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment information REF) if the regulations apply. To be used for Property and Casualty Auto only.",
  },
  {
    code: "P23",
    description:
      "Medical Payments Coverage (MPC) or Personal Injury Protection (PIP) Benefits jurisdictional fee schedule adjustment. Usage: If adjustment is at the Claim Level, the payer must send and the provider should refer to the 835 Class of Contract Code Identification Segment (Loop 2100 Other Claim Related Information REF). If adjustment is at the Line Level, the payer must send and the provider should refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment information REF) if the regulations apply. To be used for Property and Casualty Auto only.",
  },
  {
    code: "P24",
    description:
      "Payment adjusted based on Preferred Provider Organization (PPO).  Usage: If adjustment is at the Claim Level, the payer must send and the provider should refer to the 835 Class of Contract Code Identification Segment (Loop 2100 Other Claim Related Information REF). If adjustment is at the Line Level, the payer must send and the provider should refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment information REF) if the regulations apply. To be used for Property and Casualty only. Use only with Group Code CO.",
  },
  {
    code: "P25",
    description:
      "Payment adjusted based on Medical Provider Network (MPN).  Usage: If adjustment is at the Claim Level, the payer must send and the provider should refer to the 835 Class of Contract Code Identification Segment (Loop 2100 Other Claim Related Information REF). If adjustment is at the Line Level, the payer must send and the provider should refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment information REF) if the regulations apply. To be used for Property and Casualty only. (Use only with Group Code CO).",
  },
  {
    code: "P26",
    description:
      "Payment adjusted based on Voluntary Provider network (VPN).  Usage: If adjustment is at the Claim Level, the payer must send and the provider should refer to the 835 Class of Contract Code Identification Segment (Loop 2100 Other Claim Related Information REF). If adjustment is at the Line Level, the payer must send and the provider should refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment information REF) if the regulations apply. To be used for Property and Casualty only. (Use only with Group Code CO).",
  },
  {
    code: "P27",
    description:
      "Payment denied based on the Liability Coverage Benefits jurisdictional regulations and/or payment policies. Usage: If adjustment is at the Claim Level, the payer must send and the provider should refer to the 835 Insurance Policy Number Segment (Loop 2100 Other Claim Related Information REF qualifier 'IG') if the jurisdictional regulation applies. If adjustment is at the Line Level, the payer must send and the provider should refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment information REF) if the regulations apply. To be used for Property and Casualty Auto only.",
  },
  {
    code: "P28",
    description:
      "Payment adjusted based on the Liability Coverage Benefits jurisdictional regulations and/or payment policies. Usage: If adjustment is at the Claim Level, the payer must send and the provider should refer to the 835 Insurance Policy Number Segment (Loop 2100 Other Claim Related Information REF qualifier 'IG') if the jurisdictional regulation applies. If adjustment is at the Line Level, the payer must send and the provider should refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment information REF) if the regulations apply. To be used for Property and Casualty Auto only.",
  },
  {
    code: "P29",
    description:
      "Liability Benefits jurisdictional fee schedule adjustment. Usage: If adjustment is at the Claim Level, the payer must send and the provider should refer to the 835 Class of Contract Code Identification Segment (Loop 2100 Other Claim Related Information REF). If adjustment is at the Line Level, the payer must send and the provider should refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment information REF) if the regulations apply. To be used for Property and Casualty Auto only.",
  },
  {
    code: "P30",
    description:
      "Payment denied for exacerbation when supporting documentation was not complete. To be used for Property and Casualty only.",
  },
  {
    code: "P31",
    description:
      "Payment denied for exacerbation when treatment exceeds time allowed. To be used for Property and Casualty only.",
  },
  {
    code: "P32",
    description: "Payment adjusted due to Apportionment.",
  },
  {
    code: "W1",
    description:
      "Workers' compensation jurisdictional fee schedule adjustment.  Note: If adjustment is at the Claim Level, the payer must send and the provider should refer to the 835 Class of Contract Code Identification Segment (Loop 2100 Other Claim Related Information REF). If adjustment is at the Line Level, the payer must send and the provider should refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment information REF) if the regulations apply.",
  },
  {
    code: "W2",
    description:
      "Payment reduced or denied based on workers' compensation jurisdictional regulations or payment policies, use only if no other code is applicable. Note: If adjustment is at the Claim Level, the payer must send and the provider should refer to the 835 Insurance Policy Number Segment (Loop 2100 Other Claim Related Information REF qualifier 'IG') if the jurisdictional regulation applies. If adjustment is at the Line Level, the payer must send and the provider should refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment information REF) if the regulations apply. To be used for Workers' Compensation only.",
  },
  {
    code: "W3",
    description:
      "The Benefit for this Service is included in the payment/allowance for another service/procedure that has been performed on the same day. Note: Refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment Information REF), if present. For use by Property and Casualty only.",
  },
  {
    code: "W4",
    description:
      "Workers' Compensation Medical Treatment Guideline Adjustment.",
  },
  {
    code: "W5",
    description:
      "Medical provider not authorized/certified to provide treatment to injured workers in this jurisdiction. (Use with Group Code CO or OA)",
  },
  {
    code: "W6",
    description:
      "Referral not authorized by attending physician per regulatory requirement.",
  },
  {
    code: "W7",
    description:
      "Procedure is not listed in the jurisdiction fee schedule.  An allowance has been made for a comparable service.",
  },
  {
    code: "W8",
    description:
      "Procedure has a relative value of zero in the jurisdiction fee schedule, therefore no payment is due.",
  },
  {
    code: "W9",
    description:
      "Service not paid under jurisdiction allowed outpatient facility fee schedule.",
  },
  {
    code: "Y1",
    description:
      "Payment denied based on Medical Payments Coverage (MPC) or Personal Injury Protection (PIP) Benefits jurisdictional regulations or payment policies, use only if no other code is applicable. Note: If adjustment is at the Claim Level, the payer must send and the provider should refer to the 835 Insurance Policy Number Segment (Loop 2100 Other Claim Related Information REF qualifier 'IG') if the jurisdictional regulation applies. If adjustment is at the Line Level, the payer must send and the provider should refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment information REF) if the regulations apply. To be used for P&C Auto only.",
  },
  {
    code: "Y2",
    description:
      "Payment adjusted based on Medical Payments Coverage (MPC) or Personal Injury Protection (PIP) Benefits jurisdictional regulations or payment policies, use only if no other code is applicable. Note: If adjustment is at the Claim Level, the payer must send and the provider should refer to the 835 Insurance Policy Number Segment (Loop 2100 Other Claim Related Information REF qualifier 'IG') if the jurisdictional regulation applies. If adjustment is at the Line Level, the payer must send and the provider should refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment information REF) if the regulations apply. To be used for P&C Auto only.",
  },
  {
    code: "Y3",
    description:
      "Medical Payments Coverage (MPC) or Personal Injury Protection (PIP) Benefits jurisdictional fee schedule adjustment. Note: If adjustment is at the Claim Level, the payer must send and the provider should refer to the 835 Class of Contract Code Identification Segment (Loop 2100 Other Claim Related Information REF). If adjustment is at the Line Level, the payer must send and the provider should refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment information REF) if the regulations apply. To be used for P&C Auto only.",
  },
];
