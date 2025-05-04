"use client";

import type React from "react";
import {
  Box,
  Typography,
  Paper,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import type { RequestConfig } from "@/lib/reqres";
import { strings } from "@/lib/strings";

interface RequestConfigViewerProps {
  config: RequestConfig;
}

export default function RequestConfigViewer({ config }: RequestConfigViewerProps) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {strings.requestConfig.title}
      </Typography>

      <Box sx={{ mb: 3, display: "flex", gap: 2, alignItems: "center" }}>
        <Chip
          label={config.method}
          color={
            config.method === strings.requestConfig.method.get
              ? "primary"
              : config.method === strings.requestConfig.method.post
                ? "success"
                : config.method === strings.requestConfig.method.put
                  ? "info"
                  : "error"
          }
          sx={{ fontWeight: "bold" }}
        />
        <Typography
          component="pre"
          sx={{
            fontFamily: "monospace",
            whiteSpace: "pre-wrap",
            wordBreak: "break-all",
            flex: 1,
          }}
        >
          {config.url}
        </Typography>
      </Box>

      {config.headers.length > 0 && (
        <Accordion sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{strings.requestConfig.sections.headers}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List dense>
              {config.headers.map((header, index) => (
                <ListItem key={index} sx={{ py: 0.5 }}>
                  <ListItemText
                    primary={
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Typography component="span" sx={{ fontWeight: "bold", minWidth: 120 }}>
                          {header.key}:
                        </Typography>
                        <Typography component="span">{header.value}</Typography>
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      )}

      {config.body && (
        <Accordion defaultExpanded sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{strings.requestConfig.sections.body}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Paper variant="outlined" sx={{ p: 2, bgcolor: "background.paper" }}>
              <Typography
                component="pre"
                sx={{
                  fontFamily: "monospace",
                  whiteSpace: "pre-wrap",
                  margin: 0,
                }}
              >
                {config.body}
              </Typography>
            </Paper>
          </AccordionDetails>
        </Accordion>
      )}
    </Box>
  );
}
