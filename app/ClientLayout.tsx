"use client";

import type React from "react";

import { Inter } from "next/font/google";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import klearTheme from "@/lib/theme";

const inter = Inter({ subsets: ["latin"] });

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <ThemeProvider theme={klearTheme}>
          <CssBaseline />
          <AppBar
            position="static"
            sx={{
              backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,1))",
              boxShadow: "0 4px 30px rgba(201, 168, 74, 0.1)",
              position: "relative",
            }}
          >
            <Toolbar>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  flexGrow: 1,
                  fontWeight: "bold",
                  background: "linear-gradient(to right, #c9a84a, #e3c675)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                HTTP Request Dashboard
              </Typography>
            </Toolbar>
          </AppBar>
          <Box
            component="main"
            sx={{
              background: "linear-gradient(to bottom, rgba(0,0,0,1), rgba(10,10,10,1))",
              position: "relative",
              minHeight: "calc(100vh - 64px)",
            }}
          >
            {children}
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}
