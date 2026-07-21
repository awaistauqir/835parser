// app/components/ClaimTable.tsx
"use client";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Checkbox,
  Chip,
  Collapse,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { AdustmenCodes } from "@/lib/adustment-codes";
import { RemittanceCodes } from "@/lib/remittance-codes";
import type { Claim, ServiceLine } from "@/types/edi";

// Build lookup maps for fast tooltip queries
const adjustmentCodeMap = new Map(
  AdustmenCodes.map((c) => [c.code, c.description]),
);
const remarkCodeMap = new Map(
  RemittanceCodes.map((c) => [c.code, c.description]),
);

// Helper for claim status
const getClaimStatus = (code: string) => {
  const statusMap: Record<string, string> = {
    "1": "Primary",
    "2": "Secondary",
    "3": "Tertiary",
    "4": "Denied",
    "19": "Primary (Forwarded)",
    "20": "Secondary (Forwarded)",
    "21": "Tertiary (Forwarded)",
    "22": "Reversal of Previous Payment",
  };
  return statusMap[code] || code;
};

// Define sort direction type
type Order = "asc" | "desc";

// Define sortable columns
type SortableColumn =
  | "dosStart"
  | "patientName"
  | "claimNumber"
  | "chargedAmount"
  | "paidAmount";

// Clean names: remove trailing "~", "1", extra spaces
const cleanName = (name: string): string => {
  return name.replace(/~1$/, "").trim();
};

// Format date as MM/DD/YYYY
const formatDate = (dateStr: string): string => {
  if (!dateStr) return "N/A";
  // If already formatted (e.g., from parser), return as-is
  if (dateStr.includes("/")) return dateStr;
  // Handle YYYYMMDD
  if (/^\d{8}$/.test(dateStr)) {
    return `${dateStr.substring(4, 6)}/${dateStr.substring(
      6,
      8,
    )}/${dateStr.substring(0, 4)}`;
  }
  return dateStr;
};

// ======================
// Service Line Detail Table
// ======================
function ServiceLineTable({ serviceLines }: { serviceLines: ServiceLine[] }) {
  if (!serviceLines || serviceLines.length === 0) {
    return (
      <Typography color="text.secondary">No service lines found.</Typography>
    );
  }

  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>DOS</TableCell>

          <TableCell>Paid Units</TableCell>
          <TableCell>Proc/Rev Code</TableCell>
          <TableCell>Billed Amount</TableCell>
          <TableCell>Allowed Amt</TableCell>
          <TableCell>Adjusts</TableCell>
          <TableCell>Remarks</TableCell>
          <TableCell>Provider Paid</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {serviceLines.map((svc) => {
          // Calculate adjustment buckets (simplified)

          return (
            <TableRow key={crypto.randomUUID()}>
              <TableCell>{formatDate(svc.dosStart || "")}</TableCell>
              <TableCell>{svc.units}</TableCell>
              <TableCell>
                {svc.cpt}
                {svc.modifiers.length > 0 && (
                  <Typography variant="caption" display="block">
                    Mods: {svc.modifiers.join(", ")}
                  </Typography>
                )}
              </TableCell>
              <TableCell>${svc.chargedAmount.toFixed(2)}</TableCell>
              <TableCell>${(svc.allowedAmount || 0).toFixed(2)}</TableCell>

              <TableCell>
                {svc.adjustments.map((adj) => {
                  const plainCode = adj.code.includes("-")
                    ? adj.code.split("-")[1]
                    : adj.code;
                  const desc =
                    adjustmentCodeMap.get(plainCode) ||
                    "Adjustment Reason Code";
                  return (
                    <Tooltip
                      key={crypto.randomUUID()}
                      title={`${adj.code}: ${desc}`}
                      enterDelay={0}
                      arrow
                      placement="top"
                    >
                      <Chip
                        label={`${adj.code} ${adj.amount.toFixed(2)}`}
                        size="small"
                        sx={{ mr: 0.5, mb: 0.5, cursor: "help" }}
                      />
                    </Tooltip>
                  );
                })}
              </TableCell>
              <TableCell>
                {svc.remarkCodes && svc.remarkCodes.length > 0
                  ? svc.remarkCodes.map((code) => {
                      const desc =
                        remarkCodeMap.get(code) ||
                        "Remittance Advice Remark Code";
                      return (
                        <Tooltip
                          key={crypto.randomUUID()}
                          title={`${code}: ${desc}`}
                          enterDelay={0}
                          arrow
                          placement="top"
                        >
                          <Chip
                            label={code}
                            size="small"
                            color="secondary"
                            variant="outlined"
                            sx={{ mr: 0.5, mb: 0.5, cursor: "help" }}
                          />
                        </Tooltip>
                      );
                    })
                  : "-"}
              </TableCell>
              <TableCell>${svc.paidAmount.toFixed(2)}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

// ======================
// Claim Expandable Row
// ======================
interface ClaimWithId extends Claim {
  id: string;
}

function ClaimRow({
  claim,
  selected,
  onRowClick,
}: {
  claim: ClaimWithId;
  selected: boolean;
  onRowClick: (claimId: string, event: React.MouseEvent) => void;
}) {
  const [open, setOpen] = useState(false);

  const dosStart = formatDate(claim.dosStart);
  const dosEnd = formatDate(claim.dosEnd);
  const dosDisplay =
    dosEnd && dosEnd !== dosStart ? `${dosStart} – ${dosEnd}` : dosStart;

  // Clean patient name: "AZUAJE CAMPOS 1" → "Campos, Azuaje"
  const cleanPatientName = () => {
    const cleaned = cleanName(claim.patientName);
    const parts = cleaned.split(" ");
    if (parts.length >= 2) {
      const first = parts[parts.length - 1];
      const last = parts.slice(0, -1).join(" ");
      return `${last}, ${first}`;
    }
    return cleaned;
  };

  // Get claim/ticket number for display
  const ticketNumber = claim.claimNumber || claim.patientControlNumber || "N/A";

  return (
    <>
      <TableRow
        onClick={(e) => {
          onRowClick(claim.id, e);
        }}
        sx={{
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.08)", // Darker hover effect
            transition: "background-color 0.2s ease",
          },
          backgroundColor: selected
            ? "rgba(25, 118, 210, 0.08)"
            : open
              ? "rgba(0, 0, 0, 0.03)"
              : "inherit", // Subtle background for selected row
        }}
      >
        <TableCell padding="checkbox" className="select-checkbox">
          <Checkbox
            checked={selected}
            color="primary"
            size="small"
            onChange={() => {}}
          />
        </TableCell>
        <TableCell padding="checkbox">
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(!open);
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{dosDisplay}</TableCell>
        <TableCell>{cleanPatientName()}</TableCell>
        <TableCell>{ticketNumber}</TableCell>
        <TableCell>${(claim.chargedAmount || 0).toFixed(2)}</TableCell>
        <TableCell>${(claim.paidAmount || 0).toFixed(2)}</TableCell>
      </TableRow>

      <TableRow
        sx={{ backgroundColor: open ? "rgba(25, 118, 210, 0.08)" : "inherit" }}
      >
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={2}>
              <Typography variant="h6" gutterBottom>
                Claim Details - Ticket #{ticketNumber}
              </Typography>

              {/* Key claim info: Allowed Amount, ICN, Patient Responsibility */}
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 2,
                  mb: 2,
                  p: 1.5,
                  borderRadius: 1,
                  backgroundColor: "rgba(0, 0, 0, 0.03)",
                }}
              >
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    ICN
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {claim.icn || "-"}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Provider
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {claim.providerName || "-"}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Provider NPI
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {claim.providerNpi || "-"}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Insured ID
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {claim.patientInsuranceId || "-"}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Processed As
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {getClaimStatus(claim.claimStatusCode)}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Patient DOB
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {claim.patientDob || "-"}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Allowed Amount
                  </Typography>
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    color="primary.main"
                  >
                    ${(claim.allowedAmount || 0).toFixed(2)}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Pt. Responsibility
                  </Typography>
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    color={
                      claim.patientResponsibility > 0
                        ? "warning.main"
                        : "text.primary"
                    }
                  >
                    ${(claim.patientResponsibility || 0).toFixed(2)}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Per Day Limit
                  </Typography>
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    color={claim.perDayLimit ? "info.main" : "text.secondary"}
                  >
                    {claim.perDayLimit != null && claim.perDayLimit > 0
                      ? `$${claim.perDayLimit.toFixed(2)}`
                      : "—"}
                  </Typography>
                </Box>
              </Box>

              <ServiceLineTable serviceLines={claim.serviceLines} />

              {claim.remarkCodes && claim.remarkCodes.length > 0 && (
                <Box mt={2}>
                  <Typography variant="subtitle2" gutterBottom>
                    Remark Codes
                  </Typography>
                  <Box display="flex" flexWrap="wrap" gap={0.5}>
                    {claim.remarkCodes.map((code) => {
                      const desc =
                        remarkCodeMap.get(code) ||
                        "Remittance Advice Remark Code";
                      return (
                        <Tooltip
                          key={crypto.randomUUID()}
                          title={`${code}: ${desc}`}
                          enterDelay={0}
                          arrow
                          placement="top"
                        >
                          <Chip
                            label={code}
                            size="small"
                            sx={{ cursor: "help" }}
                          />
                        </Tooltip>
                      );
                    })}
                  </Box>
                </Box>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

// Descending comparator
const descendingComparator = (
  a: Claim,
  b: Claim,
  orderBy: SortableColumn,
): number => {
  // Handle different data types appropriately
  switch (orderBy) {
    case "dosStart":
      return formatDate(a.dosStart).localeCompare(formatDate(b.dosStart));

    case "patientName":
      return a.patientName.localeCompare(b.patientName);

    case "claimNumber":
      return a.claimNumber.localeCompare(b.claimNumber);

    case "chargedAmount":
    case "paidAmount":
      return a[orderBy] - b[orderBy];

    default:
      return 0;
  }
};

// Sorting function
const getComparator = (
  order: Order,
  orderBy: SortableColumn,
): ((a: Claim, b: Claim) => number) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

// ======================
// Main Table Component
// ======================
export default function ClaimTable({ claims: rawClaims }: { claims: Claim[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<SortableColumn>("patientName");

  // Clean claims: remove ~ and trailing 1 from names
  const cleanedClaims = useMemo<ClaimWithId[]>(() => {
    return rawClaims.map((claim, index) => ({
      ...claim,
      id: `${claim.claimNumber || claim.patientControlNumber || index}-${index}`,
      patientName: cleanName(claim.patientName),
    }));
  }, [rawClaims]);

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [lastClickedId, setLastClickedId] = useState<string | null>(null);

  // Reset selection when claims list changes
  useEffect(() => {
    setSelectedIds(new Set(cleanedClaims.map((c) => c.id)));
    setLastClickedId(null);
  }, [cleanedClaims]);

  // Enhanced filter function that searches across multiple fields
  const filteredClaims = useMemo(() => {
    if (!searchTerm) return cleanedClaims;

    const term = searchTerm.toLowerCase();

    return cleanedClaims.filter((claim) => {
      // Search based on selected field
      switch (searchField) {
        case "claimNumber":
          return (
            claim.claimNumber.toLowerCase().includes(term) ||
            claim.patientControlNumber.toLowerCase().includes(term)
          );

        case "patientName":
          return claim.patientName.toLowerCase().includes(term);

        case "paidAmount": {
          // Convert to string for includes search or try to match exact amount
          const paidAmount = claim.paidAmount.toFixed(2);
          return (
            paidAmount.includes(term) || parseFloat(term) === claim.paidAmount
          );
        }

        case "all":
        default:
          // Search across all fields
          return (
            claim.claimNumber.toLowerCase().includes(term) ||
            claim.patientControlNumber.toLowerCase().includes(term) ||
            claim.patientName.toLowerCase().includes(term) ||
            claim.paidAmount.toFixed(2).includes(term)
          );
      }
    });
  }, [cleanedClaims, searchTerm, searchField]);

  // Sort the filtered claims
  const sortedClaims = useMemo(() => {
    return [...filteredClaims].sort(getComparator(order, orderBy));
  }, [filteredClaims, order, orderBy]);

  // Handle sort request
  const handleRequestSort = (property: SortableColumn) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: {
    target: { value: unknown };
  }): void => {
    setRowsPerPage(Number(event.target.value));
    setPage(0);
  };

  const paginatedClaims =
    rowsPerPage === -1
      ? sortedClaims
      : sortedClaims.slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage,
        );

  // Selected claims based on selectedIds
  const selectedClaims = useMemo(() => {
    return cleanedClaims.filter((claim) => selectedIds.has(claim.id));
  }, [cleanedClaims, selectedIds]);

  const totalClaimsChargedAmount = useMemo(() => {
    return selectedClaims.reduce(
      (sum, claim) => sum + (claim.chargedAmount || 0),
      0,
    );
  }, [selectedClaims]);

  const totalClaimsPaidAmount = useMemo(() => {
    return selectedClaims.reduce(
      (sum, claim) => sum + (claim.paidAmount || 0),
      0,
    );
  }, [selectedClaims]);

  // Handle row click selection logic (with keyboard modifiers support)
  const handleRowClick = (claimId: string, event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    // Do not select if clicking on buttons (like expand icon button), inputs, or links
    if (
      target.closest("button") ||
      target.closest("a") ||
      target.closest("input[type='text']")
    ) {
      return;
    }

    const isCheckboxClick =
      target.closest(".select-checkbox") !== null || target.tagName === "INPUT";
    const isCtrl = event.ctrlKey || event.metaKey;
    const isShift = event.shiftKey;

    let newSelected = new Set(selectedIds);

    if (isShift && lastClickedId) {
      // Find range of selection in current sortedClaims view
      const claimIdsList = sortedClaims.map((c) => c.id);
      const startIdx = claimIdsList.indexOf(lastClickedId);
      const endIdx = claimIdsList.indexOf(claimId);

      if (startIdx !== -1 && endIdx !== -1) {
        const minIdx = Math.min(startIdx, endIdx);
        const maxIdx = Math.max(startIdx, endIdx);
        const rangeIds = claimIdsList.slice(minIdx, maxIdx + 1);

        if (isCtrl) {
          // Ctrl + Shift + Click: Add range to current selection
          for (const id of rangeIds) {
            newSelected.add(id);
          }
        } else {
          // Shift + Click: Replace selection with range
          newSelected = new Set(rangeIds);
        }
      } else {
        // Fallback if index not found
        if (isCtrl) {
          if (newSelected.has(claimId)) {
            newSelected.delete(claimId);
          } else {
            newSelected.add(claimId);
          }
        } else {
          newSelected = new Set([claimId]);
        }
      }
      setLastClickedId(claimId);
    } else {
      if (isCtrl || isCheckboxClick) {
        // Ctrl + Click or Checkbox Click: Toggle selection
        if (newSelected.has(claimId)) {
          newSelected.delete(claimId);
        } else {
          newSelected.add(claimId);
        }
      } else {
        // Normal click on row: Select only this item
        newSelected = new Set([claimId]);
      }
      setLastClickedId(claimId);
    }

    setSelectedIds(newSelected);
  };

  const visibleSelectedCount = filteredClaims.filter((claim) =>
    selectedIds.has(claim.id),
  ).length;
  const isAllVisibleSelected =
    filteredClaims.length > 0 && visibleSelectedCount === filteredClaims.length;
  const isSomeVisibleSelected =
    visibleSelectedCount > 0 && visibleSelectedCount < filteredClaims.length;

  const handleSelectAll = () => {
    const newSelected = new Set(selectedIds);
    if (isAllVisibleSelected) {
      // Deselect all visible
      for (const claim of filteredClaims) {
        newSelected.delete(claim.id);
      }
    } else {
      // Select all visible
      for (const claim of filteredClaims) {
        newSelected.add(claim.id);
      }
    }
    setSelectedIds(newSelected);
  };

  if (!rawClaims || rawClaims.length === 0) {
    return (
      <Paper>
        <Box p={3} textAlign="center" color="text.secondary">
          No claims found in this remittance.
        </Box>
      </Paper>
    );
  }

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      {/* Search & Rows Per Page */}
      <Box p={2} display="flex" gap={2} flexWrap="wrap" alignItems="center">
        <TextField
          size="small"
          placeholder="Search claims..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ flex: 1, minWidth: 200 }}
        />

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Search in</InputLabel>
          <Select
            value={searchField}
            label="Search in"
            onChange={(e) => setSearchField(e.target.value)}
          >
            <MenuItem value="all">All Fields</MenuItem>
            <MenuItem value="claimNumber">Claim/Control #</MenuItem>
            <MenuItem value="patientName">Patient Name</MenuItem>
            <MenuItem value="paidAmount">Paid Amount</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Show</InputLabel>
          <Select
            value={rowsPerPage}
            label="Show"
            onChange={handleChangeRowsPerPage}
          >
            <MenuItem value={10}>10 rows</MenuItem>
            <MenuItem value={25}>25 rows</MenuItem>
            <MenuItem value={50}>50 rows</MenuItem>
            <MenuItem value={-1}>All</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Table */}
      <TableContainer sx={{ maxHeight: 600, overflow: "auto" }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={isSomeVisibleSelected}
                  checked={isAllVisibleSelected}
                  onChange={handleSelectAll}
                  size="small"
                  color="primary"
                />
              </TableCell>
              <TableCell padding="checkbox" />
              <TableCell>
                <TableSortLabel
                  active={orderBy === "dosStart"}
                  direction={orderBy === "dosStart" ? order : "asc"}
                  onClick={() => handleRequestSort("dosStart")}
                >
                  DOS
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "patientName"}
                  direction={orderBy === "patientName" ? order : "asc"}
                  onClick={() => handleRequestSort("patientName")}
                >
                  Patient
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "claimNumber"}
                  direction={orderBy === "claimNumber" ? order : "asc"}
                  onClick={() => handleRequestSort("claimNumber")}
                >
                  Claim #
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "chargedAmount"}
                  direction={orderBy === "chargedAmount" ? order : "asc"}
                  onClick={() => handleRequestSort("chargedAmount")}
                >
                  Charged
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "paidAmount"}
                  direction={orderBy === "paidAmount" ? order : "asc"}
                  onClick={() => handleRequestSort("paidAmount")}
                >
                  Paid
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedClaims.map((claim) => (
              <ClaimRow
                key={claim.id}
                claim={claim}
                selected={selectedIds.has(claim.id)}
                onRowClick={handleRowClick}
              />
            ))}
          </TableBody>
          <TableFooter>
            <TableRow sx={{ backgroundColor: "rgba(0, 0, 0, 0.04)" }}>
              <TableCell colSpan={5} align="right">
                <Typography variant="subtitle2" fontWeight="bold">
                  Totals ({selectedClaims.length} of {filteredClaims.length}{" "}
                  Selected):
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight="bold">
                  ${totalClaimsChargedAmount.toFixed(2)}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="subtitle2"
                  fontWeight="bold"
                  color="primary"
                >
                  ${totalClaimsPaidAmount.toFixed(2)}
                </Typography>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      {/* Pagination */}
      {rowsPerPage !== -1 && (
        <TablePagination
          component="div"
          count={filteredClaims.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[10, 25, 50, { label: "All", value: -1 }]}
        />
      )}
    </Paper>
  );
}
