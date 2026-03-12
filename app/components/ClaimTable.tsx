// app/components/ClaimTable.tsx
"use client";

import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Collapse,
  Box,
  Typography,
  IconButton,
  Chip,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TablePagination,
  TableSortLabel,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Claim, ServiceLine, Adjustment } from "@/types/edi";

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
      8
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
          <TableCell>Provider Paid</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {serviceLines.map((svc, idx) => {
          // Calculate adjustment buckets (simplified)

          return (
            <TableRow key={idx}>
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
                {svc.adjustments.map((svc, i) => (
                  <Chip
                    key={i}
                    label={`${svc.code} ${svc.amount.toFixed(2)}`}
                    size="small"
                    sx={{ mr: 0.5, mb: 0.5 }}
                  />
                ))}
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
function ClaimRow({ claim }: { claim: Claim }) {
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
        sx={{
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.08)", // Darker hover effect
            transition: "background-color 0.2s ease",
          },
          backgroundColor: open ? "rgba(0, 0, 0, 0.03)" : "inherit", // Subtle background for selected row
        }}
      >
        <TableCell padding="checkbox">
          <IconButton size="small" onClick={() => setOpen(!open)}>
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
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
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
                {claim.icn && (
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      ICN
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {claim.icn}
                    </Typography>
                  </Box>
                )}
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Allowed Amount
                  </Typography>
                  <Typography variant="body2" fontWeight="bold" color="primary.main">
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
                    color={claim.patientResponsibility > 0 ? "warning.main" : "text.primary"}
                  >
                    ${(claim.patientResponsibility || 0).toFixed(2)}
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
                    {claim.remarkCodes.map((code, idx) => (
                      <Chip key={idx} label={code} size="small" />
                    ))}
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
  const cleanedClaims = useMemo(() => {
    return rawClaims.map((claim) => ({
      ...claim,
      patientName: cleanName(claim.patientName),
    }));
  }, [rawClaims]);

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

        case "paidAmount":
          // Convert to string for includes search or try to match exact amount
          const paidAmount = claim.paidAmount.toFixed(2);
          return (
            paidAmount.includes(term) || parseFloat(term) === claim.paidAmount
          );

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

  // Sorting function
  const getComparator = (
    order: Order,
    orderBy: SortableColumn
  ): ((a: Claim, b: Claim) => number) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  // Descending comparator
  const descendingComparator = (
    a: Claim,
    b: Claim,
    orderBy: SortableColumn
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

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedClaims =
    rowsPerPage === -1
      ? sortedClaims
      : sortedClaims.slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage
        );

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
            onChange={handleChangeRowsPerPage as any}
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
            {paginatedClaims.map((claim, index) => (
              <ClaimRow
                key={`${
                  claim.claimNumber || claim.patientControlNumber || index
                }${Math.random()}`}
                claim={claim}
              />
            ))}
          </TableBody>
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
