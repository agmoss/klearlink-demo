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
import { demoUseCases } from "@/lib/use-cases";

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
          {demoUseCases.map((useCase, index) => (
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

      {demoUseCases.map((useCase, index) => (
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
                <PlayArrow sx={{ mr: 1 }} /> Use Case Description
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
                <CheckCircleOutline sx={{ mr: 1 }} /> The Solution
              </Typography>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ display: "flex", alignItems: "center" }}
              >
                {useCase.expectedResults.solution}
              </Typography>
              <List>
                {useCase.expectedResults.steps.map((result, resultIndex) => (
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
