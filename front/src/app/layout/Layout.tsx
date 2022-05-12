import { Container } from "@mui/material";
import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

type LayoutProps = {
  children?: ReactNode;
  onDoneAll: () => void;
};

export function Layout({ children, onDoneAll }: LayoutProps) {
  return (
    <>
      <Navbar onDoneAll={onDoneAll} />

      <Container
        maxWidth="lg"
        style={{
          paddingTop: "56px",
          paddingBottom: "24px",
        }}
      >
        <main>
          {children}

          <Outlet />
        </main>
      </Container>

      <Footer />
    </>
  );
}
