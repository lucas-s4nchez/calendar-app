import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import { primaryTheme } from "./primaryTheme";

const Theme = ({ children }) => {
  return (
    <ThemeProvider theme={primaryTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default Theme;
