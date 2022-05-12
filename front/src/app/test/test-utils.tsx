import { createTheme, StyledEngineProvider } from "@mui/material";
import { render, RenderOptions } from "@testing-library/react";
import { FC, ReactElement } from "react";
import { ThemeProvider } from "styled-components";

const customTheme = createTheme();

const AllTheProviders: FC = ({ children }) => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={customTheme}>{children}</ThemeProvider>
    </StyledEngineProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
