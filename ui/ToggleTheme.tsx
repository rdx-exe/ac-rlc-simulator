"use client";

import { FaSun, FaMoon } from "react-icons/fa";

interface ToggleThemeProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export default function ToggleTheme({ isDark, onToggleTheme }: ToggleThemeProps) {
  return (
    <button
      onClick={onToggleTheme}
      className="relative inline-flex items-center rounded-full transition-all duration-300 focus:outline-none"
      style={{
        width: "clamp(48px, 10vw, 64px)",
        height: "clamp(24px, 5vw, 32px)",
        backgroundColor: isDark ? "#3b3b3b" : "#e0e0e0",
        boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.2)",
      }}
    >
      {/* Sliding circle with icon */}
      <div
        className="absolute bg-white rounded-full shadow-lg transition-all duration-300 flex items-center justify-center shrink-0"
        style={{
          width: "clamp(22px, 4.5vw, 30px)",
          height: "clamp(22px, 4.5vw, 30px)",
          left: isDark ? "2px" : "calc(100% - clamp(24px, 4.7vw, 32px))",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isDark ? (
          <FaMoon size="clamp(12px, 3vw, 16px)" color="#FFB81C" />
        ) : (
          <FaSun size="clamp(12px, 3vw, 16px)" color="#FFA500" />
        )}
      </div>
    </button>
  );
}
