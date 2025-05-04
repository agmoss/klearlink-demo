"use client";

import type React from "react";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  SelectChangeEvent,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  ExpandMore as ExpandMoreIcon,
  Send,
} from "@mui/icons-material";
import type { RequestConfig } from "@/lib/reqres";

interface HeaderField {
  key: string;
  value: string;
}

interface RequestFormProps {
  onSubmit: (config: RequestConfig) => void;
  isLoading: boolean;
  initialConfig?: RequestConfig;
}

export default function RequestForm({ onSubmit, isLoading, initialConfig }: RequestFormProps) {
  const [method, setMethod] = useState<string>("GET");
  const [url, setUrl] = useState<string>("");
  const [headers, setHeaders] = useState<HeaderField[]>([{ key: "", value: "" }]);
  const [body, setBody] = useState<string>("");
  const [bodyError, setBodyError] = useState<string>("");

  // Effect to load initial configuration when provided
  useEffect(() => {
    if (initialConfig) {
      setMethod(initialConfig.method);
      setUrl(initialConfig.url);
      setHeaders(
        initialConfig.headers.length > 0 ? initialConfig.headers : [{ key: "", value: "" }]
      );
      setBody(initialConfig.body || "");
    }
  }, [initialConfig]);

  const handleMethodChange = (event: SelectChangeEvent<string>) => {
    setMethod(event.target.value);
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const handleHeaderChange = (index: number, field: "key" | "value", value: string) => {
    const newHeaders = [...headers];
    newHeaders[index][field] = value;
    setHeaders(newHeaders);
  };

  const handleAddHeader = () => {
    setHeaders([...headers, { key: "", value: "" }]);
  };

  const handleRemoveHeader = (index: number) => {
    const newHeaders = [...headers];
    newHeaders.splice(index, 1);
    setHeaders(newHeaders.length ? newHeaders : [{ key: "", value: "" }]);
  };

  const handleBodyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newBody = event.target.value;
    setBody(newBody);

    // Validate JSON if body is not empty
    if (newBody.trim() && (method === "POST" || method === "PUT")) {
      try {
        JSON.parse(newBody);
        setBodyError("");
      } catch (e) {
        setBodyError("Invalid JSON format");
      }
    } else {
      setBodyError("");
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Final validation before submission
    if (method !== "GET" && body.trim()) {
      try {
        JSON.parse(body);
      } catch (e) {
        setBodyError("Invalid JSON format");
        return;
      }
    }

    onSubmit({
      method,
      url,
      headers,
      body: method !== "GET" && body.trim() ? body : undefined,
    });
  };

  const isUrlValid = url.trim().length > 0;

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Typography variant="h6" gutterBottom>
        Request Configuration
      </Typography>

      <Box sx={{ mb: 3, display: "flex", gap: 2 }}>
        <FormControl sx={{ width: 120 }}>
          <InputLabel id="method-select-label">Method</InputLabel>
          <Select
            labelId="method-select-label"
            value={method}
            label="Method"
            onChange={handleMethodChange}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor:
                  method === "GET"
                    ? "primary.light"
                    : method === "POST"
                      ? "success.light"
                      : method === "PUT"
                        ? "info.light"
                        : method === "DELETE"
                          ? "error.light"
                          : "primary.light",
              },
            }}
          />
        </FormControl>

        <TextField
          fullWidth
          label="URL"
          value={url}
          onChange={handleUrlChange}
          placeholder="https://api.example.com/data"
          required
          error={!isUrlValid}
          helperText={!isUrlValid ? "URL is required" : ""}
        />
      </Box>

      <Accordion sx={{ mb: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Headers</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {headers.map((header, index) => (
            <Box key={index} sx={{ display: "flex", mb: 2, gap: 1 }}>
              <TextField
                label="Key"
                value={header.key}
                onChange={e => handleHeaderChange(index, "key", e.target.value)}
                size="small"
                sx={{ flex: 1 }}
              />
              <TextField
                label="Value"
                value={header.value}
                onChange={e => handleHeaderChange(index, "value", e.target.value)}
                size="small"
                sx={{ flex: 1 }}
              />
              <IconButton onClick={() => handleRemoveHeader(index)} color="error" size="small">
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
          <Button startIcon={<AddIcon />} onClick={handleAddHeader} variant="outlined" size="small">
            Add Header
          </Button>
        </AccordionDetails>
      </Accordion>

      {(method === "POST" || method === "PUT") && (
        <Accordion defaultExpanded sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Request Body</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              fullWidth
              label="JSON Body"
              multiline
              rows={8}
              value={body}
              onChange={handleBodyChange}
              error={!!bodyError}
              helperText={bodyError}
              placeholder='{\n  "key": "value"\n}'
              sx={{ fontFamily: "monospace" }}
            />
          </AccordionDetails>
        </Accordion>
      )}

      <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!isUrlValid || !!bodyError || isLoading}
          startIcon={<Send />}
        >
          {isLoading ? "Sending..." : "Send Request"}
        </Button>
      </Box>
    </Box>
  );
}
