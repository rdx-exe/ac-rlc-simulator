"use client";

import { useEffect, useState } from "react";
import Navbar from "@/ui/Navbar";
import Footer from "@/ui/Footer";

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  }, [isDark]);

  const handleToggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <>
      <Navbar isDark={isDark} onToggleTheme={handleToggleTheme} />
      {children}
      <Footer isDark={isDark} />
    </>
  );
}