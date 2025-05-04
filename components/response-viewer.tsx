"use client";

import type React from "react";
import { useState } from "react";
import { Box, Typography, CircularProgress, Alert, Tabs, Tab, Paper, Chip } from "@mui/material";
import { match } from "@/lib/remote-data";
import type { ApiResponse } from "@/lib/remote-data";
import RecursiveTree from "@/components/recursive-tree";

interface ResponseViewerProps {
  response: ApiResponse;
}

export default function ResponseViewer({ response }: ResponseViewerProps) {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  // Use pattern matching to render the appropriate UI based on the response state
  return match(response, {
    notAsked: () => (
      <Box>
        <Typography variant="h6" gutterBottom>
          Response
        </Typography>
        <Typography color="text.secondary">Send a request to see the response here</Typography>
      </Box>
    ),
    loading: () => (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 400 }}>
        <CircularProgress />
      </Box>
    ),
    failure: error => (
      <Box>
        <Typography variant="h6" gutterBottom>
          Response
        </Typography>
        <Alert severity="error">{error}</Alert>
      </Box>
    ),
    success: responseData => (
      <Box>
        <Typography variant="h6" gutterBottom>
          Response
        </Typography>

        <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
          <Chip
            label={`Status: ${responseData.status} ${responseData.statusText}`}
            color={responseData.status >= 200 && responseData.status < 300 ? "success" : "error"}
            variant="outlined"
          />
        </Box>

        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label="Body" />
            <Tab label="Headers" />
            <Tab label="Raw" />
          </Tabs>
        </Box>

        <Box sx={{ height: 400, overflow: "auto" }}>
          {/* Body Tab */}
          {activeTab === 0 && (
            <Paper variant="outlined" sx={{ p: 2, height: "100%", overflow: "auto" }}>
              {typeof responseData.data === "object" ? (
                <RecursiveTree data={responseData.data} />
              ) : (
                <Typography
                  component="pre"
                  sx={{ fontFamily: "monospace", whiteSpace: "pre-wrap" }}
                >
                  {responseData.data}
                </Typography>
              )}
            </Paper>
          )}

          {/* Headers Tab */}
          {activeTab === 1 && (
            <Paper variant="outlined" sx={{ p: 2, height: "100%", overflow: "auto" }}>
              <RecursiveTree data={responseData.headers} />
            </Paper>
          )}

          {/* Raw Tab */}
          {activeTab === 2 && (
            <Paper variant="outlined" sx={{ p: 2, height: "100%", overflow: "auto" }}>
              <Typography component="pre" sx={{ fontFamily: "monospace", whiteSpace: "pre-wrap" }}>
                {JSON.stringify(responseData, null, 2)}
              </Typography>
            </Paper>
          )}
        </Box>
      </Box>
    ),
  });
}
