"use client";

import RequestConfigViewer from "@/components/request-config-viewer";
import ResponseViewer from "@/components/response-viewer";
import UseCases from "@/components/use-cases";
import type { ApiResponse } from "@/lib/remote-data";
import type { RequestConfig } from "@/lib/reqres";
import { Container, Typography, Box, Paper, Divider, Button } from "@mui/material";
import { Send } from "@mui/icons-material";
import { useState } from "react";

export default function Dashboard() {
  const [response, setResponse] = useState<ApiResponse>({ status: "not-asked" });
  const [currentConfig, setCurrentConfig] = useState<RequestConfig | undefined>(undefined);

  const handleRequest = async (config: RequestConfig) => {
    // Set loading state
    setResponse({ status: "loading" });

    try {
      const headers = config.headers.reduce(
        (acc, header) => {
          if (header.key && header.value) {
            acc[header.key] = header.value;
          }
          return acc;
        },
        {} as Record<string, string>
      );

      const requestOptions: RequestInit = {
        method: config.method,
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
      };

      if (config.method !== "GET" && config.body) {
        try {
          requestOptions.body = config.body;
        } catch (e) {
          setResponse({ status: "failure", error: "Invalid JSON in request body" });
          return;
        }
      }

      const fetchResponse = await fetch(config.url, requestOptions);
      const contentType = fetchResponse.headers.get("content-type");

      let data: any;
      if (contentType && contentType.includes("application/json")) {
        data = await fetchResponse.json();
      } else {
        data = await fetchResponse.text();
      }

      setResponse({
        status: "success",
        data: {
          status: fetchResponse.status,
          statusText: fetchResponse.statusText,
          headers: Object.fromEntries(fetchResponse.headers.entries()),
          data,
        },
      });
    } catch (err) {
      setResponse({
        status: "failure",
        error: err instanceof Error ? err.message : "An unknown error occurred",
      });
    }
  };

  const handleLoadUseCase = (config: RequestConfig) => {
    setCurrentConfig(config);
    // Reset the response when loading a new use case
    setResponse({ status: "not-asked" });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        HTTP Request Dashboard
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Configure and test API requests with our interactive dashboard
      </Typography>

      <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 6, mb: 3 }}>
        Use Cases
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Select a use case below to learn how to use the dashboard for different API request
        scenarios.
      </Typography>

      <UseCases onLoadUseCase={handleLoadUseCase} />

      <Divider sx={{ my: 6 }} />

      <Typography variant="h4" component="h2" gutterBottom>
        Request Configuration
      </Typography>

      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3 }}>
        <Paper sx={{ p: 3, flex: 1 }}>
          {currentConfig ? (
            <>
              <RequestConfigViewer config={currentConfig} />
              <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={response.status === "loading"}
                  onClick={() => handleRequest(currentConfig)}
                  startIcon={<Send />}
                >
                  {response.status === "loading" ? "Sending..." : "Send Request"}
                </Button>
              </Box>
            </>
          ) : (
            <Typography color="text.secondary">
              Select a use case to view its request configuration
            </Typography>
          )}
        </Paper>

        <Paper sx={{ p: 3, flex: 1 }}>
          <ResponseViewer response={response} />
        </Paper>
      </Box>
    </Container>
  );
}
