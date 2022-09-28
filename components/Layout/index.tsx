import React, { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-pattern bg-cover bg-left-top">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
