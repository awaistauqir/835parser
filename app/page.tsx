"use client";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  Container,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import type { ParsedEdiFile } from "@/types/edi";
import { parseEdiFiles } from "./actions/parse-edi";
import EdiViewer from "./components/EdiViewer";
import FileUpload from "./components/FileUpload";
import ThemeToggle from "./components/ThemeToggle";

export default function HomePage() {
  const [parsedFiles, setParsedFiles] = useState<ParsedEdiFile[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  const handleParse = async (formData: FormData) => {
    setLoading(true);
    try {
      const result = await parseEdiFiles(formData);
      setParsedFiles(result);
      setTabIndex(0);
    } catch (error) {
      console.error("Parse error:", error);
      alert("Failed to parse EDI file. Check format and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setParsedFiles(null);
  };

  return (
    <>
      {/* Navigation Bar */}
      <AppBar position="static" color="default" elevation={1}>
        <Container maxWidth="xl">
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src="/logo.png"
              alt="Logo"
              sx={{ width: 150, height: 100, objectFit: "contain" }}
            />
            <ThemeToggle />
          </Toolbar>
        </Container>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Conditional Landing Page Logo */}
        {!parsedFiles && (
          <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
            <Box
              component="img"
              src="/logo.png"
              alt="Brand Logo"
              sx={{
                width: 200, // Larger size for landing page emphasis
                height: "auto",
                objectFit: "contain",
              }}
            />
          </Box>
        )}

        <Typography
          variant="h4"
          gutterBottom
          sx={{ textAlign: !parsedFiles ? "center" : "left" }}
        >
          EDI 835 Parser and Analytics
        </Typography>

        {!parsedFiles ? (
          <FileUpload onParse={handleParse} />
        ) : loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={handleClear}
              >
                Back to Upload
              </Button>

              {parsedFiles.length > 1 && (
                <Tabs value={tabIndex} onChange={(_, i) => setTabIndex(i)}>
                  {parsedFiles.map((file) => (
                    <Tab key={file.filename} label={file.filename} />
                  ))}
                </Tabs>
              )}
            </Box>

            <EdiViewer file={parsedFiles[tabIndex]} />
          </>
        )}
      </Container>
    </>
  );
}
