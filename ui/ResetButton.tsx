"use client";

import { FaRotateLeft } from "react-icons/fa6";

interface ResetButtonProps {
  isDark: boolean;
  onReset: () => void;
}

export default function ResetButton({ isDark, onReset }: ResetButtonProps) {
  return (
    <button
      onClick={onReset}
      title="Reset all parameters to default values"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "clamp(4px, 1vw, 6px)",
        padding: "clamp(6px, 1.5vw, 8px)",
        borderRadius: "8px",
        border: `1px solid ${isDark ? "rgba(239, 68, 68, 0.4)" : "rgba(220, 38, 38, 0.3)"}`,
        backgroundColor: isDark ? "rgba(239, 68, 68, 0.1)" : "rgba(220, 38, 38, 0.05)",
        color: isDark ? "#ef4444" : "#dc2626",
        cursor: "pointer",
        transition: "all 0.3s ease",
        width: "clamp(36px, 8vw, 40px)",
        height: "clamp(36px, 8vw, 40px)",
        minHeight: "36px",
        minWidth: "36px",
      }}
      onMouseEnter={(e) => {
        const target = e.currentTarget;
        target.style.backgroundColor = isDark ? "rgba(239, 68, 68, 0.2)" : "rgba(220, 38, 38, 0.1)";
        target.style.borderColor = isDark ? "rgba(239, 68, 68, 0.6)" : "rgba(220, 38, 38, 0.5)";
      }}
      onMouseLeave={(e) => {
        const target = e.currentTarget;
        target.style.backgroundColor = isDark ? "rgba(239, 68, 68, 0.1)" : "rgba(220, 38, 38, 0.05)";
        target.style.borderColor = isDark ? "rgba(239, 68, 68, 0.4)" : "rgba(220, 38, 38, 0.3)";
      }}
    >
      <FaRotateLeft size="clamp(14px, 3vw, 18px)" />
    </button>
  );
}
