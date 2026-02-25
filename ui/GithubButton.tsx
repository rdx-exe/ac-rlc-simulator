"use client";

import { FaGithub } from "react-icons/fa";

interface GithubButtonProps {
  isDark: boolean;
}

export default function GithubButton({ isDark }: GithubButtonProps) {
  return (
    <a
      href="https://github.com"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "clamp(36px, 8vw, 44px)",
        height: "clamp(36px, 8vw, 44px)",
        borderRadius: "50%",
        backgroundColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)"}`,
        color: isDark ? "#ffffff" : "#000000",
        cursor: "pointer",
        transition: "all 0.3s ease",
        textDecoration: "none",
        minHeight: "36px",
        minWidth: "36px",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)";
        e.currentTarget.style.transform = "scale(1.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      <FaGithub size="clamp(16px, 3vw, 22px)" />
    </a>
  );
}
