"use client";

import type React from "react";
import { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Divider,
} from "@mui/material";
import {
  ArrowForward,
  CheckCircleOutline,
  Code,
  Description,
  Info,
  PlayArrow,
  Settings,
} from "@mui/icons-material";
import type { RequestConfig } from "@/lib/reqres";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`use-case-tabpanel-${index}`}
      aria-labelledby={`use-case-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `use-case-tab-${index}`,
    "aria-controls": `use-case-tabpanel-${index}`,
  };
}

interface UseCase {
  title: string;
  description: string;
  steps: string[];
  requestConfig: RequestConfig;
  expectedResults: string[];
}

const useCases: UseCase[] = [
  {
    title: "Basic GET Request",
    description: "Learn how to make a simple GET request to retrieve data from a public API.",
    steps: [
      "Select GET as the method",
      "Enter https://jsonplaceholder.typicode.com/posts/1 as the URL",
      "Click 'Send Request'",
      "Observe the JSON response in the response viewer",
    ],
    requestConfig: {
      method: "GET",
      url: "https://jsonplaceholder.typicode.com/posts/1",
      headers: [],
    },
    expectedResults: [
      "Status code 200 OK",
      "JSON response containing a post object",
      "Response includes id, title, body, and userId fields",
    ],
  },
  {
    title: "POST Request with JSON Body",
    description: "Learn how to create a resource by sending a POST request with a JSON body.",
    steps: [
      "Select POST as the method",
      "Enter https://jsonplaceholder.typicode.com/posts as the URL",
      "Add a header with key 'Content-Type' and value 'application/json'",
      "Add the following JSON body:",
      `{
  "title": "My New Post",
  "body": "This is the content of my post.",
  "userId": 1
}`,
    ],
    requestConfig: {
      method: "POST",
      url: "https://jsonplaceholder.typicode.com/posts",
      headers: [{ key: "Content-Type", value: "application/json" }],
      body: JSON.stringify(
        {
          title: "My New Post",
          body: "This is the content of my post.",
          userId: 1,
        },
        null,
        2
      ),
    },
    expectedResults: [
      "Status code 201 Created",
      "JSON response containing the created post",
      "Response includes a new id assigned by the server",
    ],
  },
  {
    title: "Error Handling",
    description: "Learn how to handle and interpret error responses from APIs.",
    steps: [
      "Select GET as the method",
      "Enter https://jsonplaceholder.typicode.com/nonexistent as the URL",
      "Click 'Send Request'",
      "Observe the error response in the response viewer",
    ],
    requestConfig: {
      method: "GET",
      url: "https://jsonplaceholder.typicode.com/nonexistent",
      headers: [],
    },
    expectedResults: [
      "Status code 404 Not Found",
      "Empty response body or error message",
      "Error displayed in the response viewer",
    ],
  },
  {
    title: "Working with Headers",
    description: "Learn how to use request headers to modify API behavior.",
    steps: [
      "Select GET as the method",
      "Enter https://httpbin.org/headers as the URL",
      "Add a custom header with key 'X-Custom-Header' and value 'MyCustomValue'",
      "Click 'Send Request'",
      "Observe your custom header in the response",
    ],
    requestConfig: {
      method: "GET",
      url: "https://httpbin.org/headers",
      headers: [{ key: "X-Custom-Header", value: "MyCustomValue" }],
    },
    expectedResults: [
      "Status code 200 OK",
      "JSON response containing a headers object",
      "Response includes your custom X-Custom-Header",
    ],
  },
];

interface UseCasesProps {
  onLoadUseCase: (config: RequestConfig) => void;
}

export default function UseCases({ onLoadUseCase }: UseCasesProps) {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleLoadUseCase = (config: RequestConfig) => {
    onLoadUseCase(config);
  };

  return (
    <Paper sx={{ width: "100%", mb: 4, overflow: "hidden" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          aria-label="use cases tabs"
        >
          {useCases.map((useCase, index) => (
            <Tab
              key={index}
              label={useCase.title}
              {...a11yProps(index)}
              icon={
                index === 0 ? (
                  <Info />
                ) : index === 1 ? (
                  <Code />
                ) : index === 2 ? (
                  <Description />
                ) : (
                  <Settings />
                )
              }
              iconPosition="start"
            />
          ))}
        </Tabs>
      </Box>

      {useCases.map((useCase, index) => (
        <TabPanel key={index} value={value} index={index}>
          <Typography variant="h5" component="h3" gutterBottom color="primary">
            {useCase.title}
          </Typography>

          <Typography variant="body1" paragraph>
            {useCase.description}
          </Typography>

          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
                <PlayArrow sx={{ mr: 1 }} /> Steps to Follow
              </Typography>
              <List>
                {useCase.steps.map((step, stepIndex) => (
                  <ListItem key={stepIndex} sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <ArrowForward fontSize="small" color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={step}
                      primaryTypographyProps={{
                        variant: "body2",
                        sx: step.startsWith("{")
                          ? {
                              fontFamily: "monospace",
                              bgcolor: "background.paper",
                              p: 1,
                              borderRadius: 1,
                              whiteSpace: "pre-wrap",
                            }
                          : {},
                      }}
                    />
                  </ListItem>
                ))}
              </List>

              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={() => handleLoadUseCase(useCase.requestConfig)}
                startIcon={<PlayArrow />}
              >
                Load This Use Case
              </Button>
            </Box>

            <Divider
              orientation="vertical"
              flexItem
              sx={{ display: { xs: "none", md: "block" } }}
            />
            <Divider sx={{ display: { xs: "block", md: "none" }, my: 2 }} />

            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
                <CheckCircleOutline sx={{ mr: 1 }} /> Expected Results
              </Typography>
              <List>
                {useCase.expectedResults.map((result, resultIndex) => (
                  <ListItem key={resultIndex} sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircleOutline fontSize="small" color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={result} primaryTypographyProps={{ variant: "body2" }} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        </TabPanel>
      ))}
    </Paper>
  );
}
