"use client";

import type React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import klearTheme from "@/lib/theme";
import { strings } from "@/lib/strings";

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
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div">
                {strings.app.title}
              </Typography>
            </Toolbar>
          </AppBar>
          <Box component="main">{children}</Box>
        </ThemeProvider>
      </body>
    </html>
  );
}
