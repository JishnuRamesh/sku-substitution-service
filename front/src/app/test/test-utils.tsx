import { SCMTheme } from "@hellofresh/scm-design-system";
import {
  adaptV4Theme,
  createTheme,
  StyledEngineProvider,
  Theme,
} from "@mui/material";
import { render, RenderOptions } from "@testing-library/react";
import { FC, ReactElement } from "react";
import { ThemeProvider } from "styled-components";

const customTheme = createTheme(adaptV4Theme(SCMTheme as Theme));

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
