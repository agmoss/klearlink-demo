"use client";

import { createTheme, alpha } from "@mui/material/styles";

// KlearLink color palette
const klearColors = {
  gold: {
    main: "#c9a84a",
    light: "#e3c675",
    dark: "#a88a3d",
    contrastText: "#000000",
  },
  dark: {
    main: "#000000",
    light: "#121212",
    dark: "#000000",
    contrastText: "#ffffff",
  },
  gray: {
    100: "#f5f5f5",
    200: "#e0e0e0",
    300: "#cccccc",
    400: "#999999",
    500: "#666666",
    600: "#444444",
    700: "#333333",
    800: "#222222",
    900: "#111111",
  },
};

// Create a theme instance
export const klearTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: klearColors.gold.main,
      light: klearColors.gold.light,
      dark: klearColors.gold.dark,
      contrastText: klearColors.gold.contrastText,
    },
    secondary: {
      main: klearColors.gray[300],
      light: klearColors.gray[100],
      dark: klearColors.gray[500],
      contrastText: klearColors.dark.main,
    },
    background: {
      default: klearColors.dark.main,
      paper: klearColors.dark.light,
    },
    text: {
      primary: klearColors.gray[100],
      secondary: klearColors.gray[300],
    },
    divider: alpha(klearColors.gold.main, 0.2),
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: {
      color: klearColors.gold.main,
      fontWeight: 600,
    },
    h2: {
      color: klearColors.gold.main,
      fontWeight: 600,
    },
    h3: {
      color: klearColors.gold.main,
      fontWeight: 600,
    },
    h4: {
      color: klearColors.gold.main,
      fontWeight: 500,
    },
    h5: {
      color: klearColors.gold.main,
      fontWeight: 500,
    },
    h6: {
      color: klearColors.gold.main,
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: "none",
          fontWeight: 500,
        },
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
        containedPrimary: {
          backgroundColor: klearColors.gold.main,
          color: klearColors.gold.contrastText,
          "&:hover": {
            backgroundColor: klearColors.gold.dark,
          },
        },
        outlined: {
          borderColor: klearColors.gold.main,
          color: klearColors.gold.main,
          "&:hover": {
            borderColor: klearColors.gold.light,
            backgroundColor: alpha(klearColors.gold.main, 0.04),
          },
        },
        text: {
          color: klearColors.gold.main,
          "&:hover": {
            backgroundColor: alpha(klearColors.gold.main, 0.04),
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: klearColors.dark.main,
          boxShadow: `0 1px 0 ${alpha(klearColors.gold.main, 0.1)}`,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: klearColors.dark.light,
          backgroundImage: "none",
          borderRadius: 8,
          border: `1px solid ${alpha(klearColors.gold.main, 0.1)}`,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
        elevation1: {
          boxShadow: `0 1px 3px ${alpha(klearColors.dark.main, 0.12)}, 0 1px 2px ${alpha(klearColors.dark.main, 0.24)}`,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${alpha(klearColors.gold.main, 0.1)}`,
        },
        head: {
          color: klearColors.gold.main,
          fontWeight: 600,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          "&.Mui-selected": {
            color: klearColors.gold.main,
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: klearColors.gold.main,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(klearColors.gold.main, 0.1),
        },
        colorPrimary: {
          backgroundColor: alpha(klearColors.gold.main, 0.2),
          color: klearColors.gold.main,
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: klearColors.dark.light,
          border: `1px solid ${alpha(klearColors.gold.main, 0.1)}`,
          "&:before": {
            display: "none",
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          "&.Mui-expanded": {
            borderBottom: `1px solid ${alpha(klearColors.gold.main, 0.1)}`,
          },
        },
        expandIconWrapper: {
          color: klearColors.gold.main,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: alpha(klearColors.gold.main, 0.2),
            },
            "&:hover fieldset": {
              borderColor: alpha(klearColors.gold.main, 0.4),
            },
            "&.Mui-focused fieldset": {
              borderColor: klearColors.gold.main,
            },
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            color: klearColors.gold.main,
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          color: klearColors.gold.main,
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: alpha(klearColors.gold.main, 0.2),
        },
        barColorPrimary: {
          backgroundColor: klearColors.gold.main,
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        colorPrimary: {
          color: klearColors.gold.main,
        },
      },
    },
  },
});

export default klearTheme;
