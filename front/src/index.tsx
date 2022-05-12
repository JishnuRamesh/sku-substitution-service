import { SCMTheme } from "@hellofresh/scm-design-system";
import { createTheme, CssBaseline, Theme, ThemeProvider } from "@mui/material";
import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import App from "./app/App";
import { AuthProvider } from "./app/core/auth/AuthProvider";
import { ApiProvider } from "./services/api/ApiProvider";

const customTheme = createTheme(SCMTheme as Theme);

render(
  <React.StrictMode>
    <StyledThemeProvider theme={customTheme}>
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        <BrowserRouter>
          <ApiProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </ApiProvider>
        </BrowserRouter>
      </ThemeProvider>
    </StyledThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
