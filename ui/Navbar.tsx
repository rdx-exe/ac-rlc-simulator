"use client";

import ToggleTheme from "../ui/ToggleTheme";
import ResetButton from "../ui/ResetButton";
import GithubButton from "../ui/GithubButton";

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onReset?: () => void;
}

export default function Navbar({ isDark, onToggleTheme, onReset }: NavbarProps) {
  return (
    <nav
      className="fixed top-2 sm:top-4 left-1/2 transform -translate-x-1/2 z-50 w-[92vw] sm:w-auto"
      style={{
        backgroundColor: isDark ? "rgba(30, 30, 30, 0.8)" : "rgba(240, 240, 240, 0.8)",
        backdropFilter: "blur(10px)",
        borderRadius: "9999px",
        border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}`,
        padding: "clamp(8px, 2vw, 16px) clamp(12px, 3vw, 20px)",
      }}
    >
      <div className="flex items-center justify-between gap-2 sm:gap-4 md:gap-8">
        <div className="flex items-center gap-1 sm:gap-2 flex-1 sm:flex-none min-w-0">
          <span
            style={{
              color: isDark ? "#ffffff" : "#000000",
              fontSize: "clamp(12px, 2.5vw, 18px)",
              fontWeight: "600",
              fontFamily: "var(--font-poppins), sans-serif",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            AC RLC Simulator
          </span>
        </div>

        <div className="flex items-center gap-1 sm:gap-3 md:gap-4">
          {onReset && <ResetButton isDark={isDark} onReset={onReset} />}
          <GithubButton isDark={isDark} />
          <ToggleTheme isDark={isDark} onToggleTheme={onToggleTheme} />
        </div>
      </div>
    </nav>
  );
}
