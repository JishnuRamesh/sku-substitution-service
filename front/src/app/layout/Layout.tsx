import { Container } from "@mui/material";
import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

type LayoutProps = {
  children?: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />

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
