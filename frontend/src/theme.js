import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2196f3",
      light: "#64b5f6",
      dark: "#1976d2",
    },
    secondary: {
      main: "#ff4081",
      light: "#ff79b0",
      dark: "#c60055",
    },
    background: {
      default: "#f0f7ff",
      paper: "#ffffff",
    },
    gradient: {
      primary: "linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)",
      secondary: "linear-gradient(45deg, #ff4081 30%, #ff9100 90%)",
      background: "linear-gradient(120deg, #e3f2fd 0%, #f5f5f5 100%)",
    },
  },
  typography: {
    fontFamily: "'Poppins', 'Roboto', 'Arial', sans-serif",
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)",
          boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 3px 15px rgba(0,0,0,0.05)",
          backdropFilter: "blur(10px)",
          background: "rgba(255, 255, 255, 0.9)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 500,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderRight: "none",
          boxShadow: "2px 0 15px rgba(0,0,0,0.05)",
          backdropFilter: "blur(10px)",
        },
      },
    },
  },
});
