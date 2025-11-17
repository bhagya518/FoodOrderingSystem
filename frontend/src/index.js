import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // global styles
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

import { setAuthToken } from "./api";

const token = localStorage.getItem("token");
if (token) setAuthToken(token);

// 🎨 Custom MUI theme for your food ordering app
const theme = createTheme({
  palette: {
    primary: {
      main: "#ff7043", // warm orange for food vibe
    },
    secondary: {
      main: "#4caf50", // fresh green
    },
    background: {
      default: "#f9fafc",
    },
  },
  typography: {
    fontFamily: "'Poppins', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontWeightMedium: 600,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Resets default browser styles */}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
