"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Tabs,
  Tab,
  Container,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FileUpload from "./components/FileUpload";
import EdiViewer from "./components/EdiViewer";
import { parseEdiFiles } from "./actions/parse-edi";
import { ParsedEdiFile } from "@/types/edi";

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
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        EDI 835 to PDF Converter
      </Typography>

      {!parsedFiles ? (
        <FileUpload onParse={handleParse} />
      ) : (
        <>
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Button 
                  variant="outlined" 
                  startIcon={<ArrowBackIcon />} 
                  onClick={handleClear}
                >
                  Back to Upload
                </Button>
                
                {parsedFiles.length > 1 && (
                  <Tabs
                    value={tabIndex}
                    onChange={(_, i) => setTabIndex(i)}
                  >
                    {parsedFiles.map((file, i) => (
                      <Tab key={i} label={file.filename} />
                    ))}
                  </Tabs>
                )}
              </Box>

              <EdiViewer file={parsedFiles[tabIndex]} />
            </>
          )}
        </>
      )}
    </Container>
  );
}
