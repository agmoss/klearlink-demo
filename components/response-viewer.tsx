"use client";

import type React from "react";
import { useState } from "react";
import { Box, Typography, CircularProgress, Alert, Tabs, Tab, Paper, Chip } from "@mui/material";
import { TreeView, TreeItem } from "@mui/lab";
import { ExpandMore, ChevronRight } from "@mui/icons-material";
import { match } from "@/lib/remote-data";
import type { ApiResponse } from "@/lib/remote-data";
import { strings } from "./config/strings";

interface ResponseViewerProps {
  response: ApiResponse;
}

export default function ResponseViewer({ response }: ResponseViewerProps) {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  // Function to recursively render JSON as TreeItems
  const renderTree = (data: any, path = "root") => {
    if (data === null) return <TreeItem key={path} nodeId={path} label="null" />;

    if (typeof data !== "object") {
      return (
        <TreeItem
          key={path}
          nodeId={path}
          label={`${typeof data === "string" ? `"${data}"` : data}`}
        />
      );
    }

    if (Array.isArray(data)) {
      return (
        <TreeItem key={path} nodeId={path} label={`Array(${data.length})`}>
          {data.map((item, index) => renderTree(item, `${path}-${index}`))}
        </TreeItem>
      );
    }

    return (
      <TreeItem key={path} nodeId={path} label="Object">
        {Object.entries(data).map(([key, value]) => (
          <TreeItem key={`${path}-${key}`} nodeId={`${path}-${key}`} label={key}>
            {renderTree(value, `${path}-${key}-value`)}
          </TreeItem>
        ))}
      </TreeItem>
    );
  };

  // Use pattern matching to render the appropriate UI based on the response state
  return match(response, {
    notAsked: () => (
      <Box>
        <Typography variant="h6" gutterBottom>
          {strings.response.title}
        </Typography>
        <Typography color="text.secondary">{strings.response.notAsked}</Typography>
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
          {strings.response.title}
        </Typography>
        <Alert severity="error">{error}</Alert>
      </Box>
    ),
    success: responseData => (
      <Box>
        <Typography variant="h6" gutterBottom>
          {strings.response.title}
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
            <Tab label={strings.response.tabs.body} />
            <Tab label={strings.response.tabs.headers} />
            <Tab label={strings.response.tabs.raw} />
          </Tabs>
        </Box>

        <Box sx={{ height: 400, overflow: "auto" }}>
          {/* Body Tab */}
          {activeTab === 0 && (
            <Paper variant="outlined" sx={{ p: 2, height: "100%", overflow: "auto" }}>
              {typeof responseData.data === "object" ? (
                <TreeView
                  defaultCollapseIcon={<ExpandMore />}
                  defaultExpandIcon={<ChevronRight />}
                  defaultExpanded={["root"]}
                >
                  {renderTree(responseData.data)}
                </TreeView>
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
              <TreeView
                defaultCollapseIcon={<ExpandMore />}
                defaultExpandIcon={<ChevronRight />}
                defaultExpanded={["headers"]}
              >
                <TreeItem nodeId="headers" label={strings.response.tabs.headers}>
                  {Object.entries(responseData.headers).map(([key, value]) => (
                    <TreeItem key={key} nodeId={`header-${key}`} label={`${key}: ${value}`} />
                  ))}
                </TreeItem>
              </TreeView>
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
