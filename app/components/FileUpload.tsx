"use client";

import { useState } from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  Paper,
  IconButton,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";

export default function FileUpload({
  onParse,
}: {
  onParse: (data: FormData) => void;
}) {
  const [text, setText] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    onParse(formData);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 3,
        border: dragActive ? "2px dashed primary.main" : undefined,
        transition: "border 0.2s",
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setDragActive(true);
      }}
      onDragLeave={() => setDragActive(false)}
      onDrop={handleDrop}
    >
      <Typography variant="h6" gutterBottom>
        Upload EDI 835 Files
      </Typography>

      <Box display="flex" gap={2} mb={2}>
        <label>
          <input
            type="file"
            multiple
            accept=".835,.txt"
            onChange={(e) => handleFiles(e.target.files)}
            hidden
          />
          <Button
            variant="contained"
            component="span"
            startIcon={<UploadFileIcon />}
          >
            Choose Files
          </Button>
        </label>
        <Button
          variant="outlined"
          onClick={() => {
            const sample = `ISA*00*...`; // truncated
            const blob = new Blob([sample], { type: "text/plain" });
            const file = new File([blob], "sample.835", { type: "text/plain" });
            const fd = new FormData();
            fd.append("files", file);
            onParse(fd);
          }}
        >
          Try Sample
        </Button>
      </Box>

      <Typography variant="body2" color="text.secondary" mb={1}>
        Or paste EDI text below:
      </Typography>
      <TextField
        fullWidth
        multiline
        minRows={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your EDI 835 content here..."
        variant="outlined"
      />
      <Box mt={2}>
        <Button
          variant="contained"
          disabled={!text.trim()}
          onClick={() => {
            const fd = new FormData();
            fd.set("text", text);
            onParse(fd);
          }}
          startIcon={<ContentPasteIcon />}
        >
          Parse Text
        </Button>
      </Box>
    </Paper>
  );
}
