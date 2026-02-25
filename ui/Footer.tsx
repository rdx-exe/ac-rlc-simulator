"use client";

import { FaGithub, FaHeart } from "react-icons/fa";

interface FooterProps {
  isDark: boolean;
}

export default function Footer({ isDark }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer
      viewport={{ once: true, amount: 0.3 }}      className="relative w-full"
      style={{
        backgroundColor: "transparent",
        borderTop: `1px solid ${isDark ? "rgba(59, 130, 246, 0.2)" : "rgba(0, 102, 255, 0.15)"}`,
        marginTop: "clamp(40px, 8vw, 80px)",
        marginBottom: "0",
        paddingBottom: "clamp(16px, 4vw, 24px)",
        width: "100%",
      }}
    >
      {/* Content */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "clamp(32px, 6vw, 48px) clamp(16px, 4vw, 32px) clamp(16px, 4vw, 24px) clamp(16px, 4vw, 32px)",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "clamp(32px, 5vw, 48px)",
            marginBottom: "clamp(32px, 5vw, 48px)",
          }}
        >
          {/* Project Info */}
          <div>
            <h3
              style={{
                color: isDark ? "#ffffff" : "#000000",
                fontSize: "clamp(16px, 2.5vw, 20px)",
                fontWeight: "700",
                marginBottom: "12px",
                fontFamily: "var(--font-poppins), sans-serif",
              }}
            >
              AC RLC Simulator
            </h3>
            <p
              style={{
                color: isDark ? "#d1d5db" : "#4b5563",
                fontSize: "clamp(13px, 2vw, 14px)",
                lineHeight: "1.6",
                fontFamily: "var(--font-inter), sans-serif",
              }}
            >
              An interactive platform for analyzing and visualizing AC RLC circuits. Explore phasor diagrams, 
              frequency sweeps, and real-time circuit behavior with intuitive controls.
            </p>
          </div>

          {/* Features */}
          <div>
            <h4
              style={{
                color: isDark ? "#ffffff" : "#000000",
                fontSize: "clamp(14px, 2.2vw, 16px)",
                fontWeight: "700",
                marginBottom: "12px",
                fontFamily: "var(--font-poppins), sans-serif",
              }}
            >
              Features
            </h4>
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              {["Phasor Diagrams", "Frequency Analysis", "Real-time Waveforms", "Dark/Light Theme"].map(
                (feature, idx) => (
                  <li
                    key={feature}
                    style={{
                      color: isDark ? "#9ca3af" : "#6b7280",
                      fontSize: "clamp(12px, 1.8vw, 14px)",
                      fontFamily: "var(--font-inter), sans-serif",
                    }}
                  >
                    ✓ {feature}
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                color: isDark ? "#ffffff" : "#000000",
                fontSize: "clamp(14px, 2.2vw, 16px)",
                fontWeight: "700",
                marginBottom: "12px",
                fontFamily: "var(--font-poppins), sans-serif",
              }}
            >
              Resources
            </h4>
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              {[
                { label: "GitHub Repository", href: "#" },
                { label: "Documentation", href: "#" },
                { label: "Report Bug", href: "#" },
                { label: "Request Feature", href: "#" },
              ].map((link, idx) => (
                <li
                  key={link.label}
                >
                  <a
                    href={link.href}
                    style={{
                      color: isDark ? "#60a5fa" : "#0066ff",
                      textDecoration: "none",
                      fontSize: "clamp(12px, 1.8vw, 14px)",
                      fontFamily: "var(--font-inter), sans-serif",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = isDark ? "#93c5fd" : "#3b82f6";
                      e.currentTarget.style.textDecoration = "underline";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = isDark ? "#60a5fa" : "#0066ff";
                      e.currentTarget.style.textDecoration = "none";
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: isDark
              ? "linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent)"
              : "linear-gradient(90deg, transparent, rgba(0, 102, 255, 0.2), transparent)",
            marginBottom: "clamp(24px, 4vw, 32px)",
          }}
        />

        {/* Bottom Section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "clamp(16px, 3vw, 24px)",
          }}
        >
          {/* Social Links */}
          <div
            style={{
              display: "flex",
              gap: "clamp(12px, 3vw, 20px)",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {[
              { icon: FaGithub, href: "#", label: "GitHub" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "clamp(40px, 8vw, 48px)",
                  height: "clamp(40px, 8vw, 48px)",
                  borderRadius: "50%",
                  backgroundColor: isDark ? "rgba(59, 130, 246, 0.1)" : "rgba(0, 102, 255, 0.08)",
                  border: `1.5px solid ${isDark ? "rgba(59, 130, 246, 0.3)" : "rgba(0, 102, 255, 0.2)"}`,
                  color: isDark ? "#60a5fa" : "#0066ff",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  minHeight: "40px",
                  minWidth: "40px",
                }}
                aria-label={label}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>

          {/* Copyright */}
          =<div
            style={{
              textAlign: "center",
              color: isDark ? "#6b7280" : "#9ca3af",
              fontSize: "clamp(11px, 1.8vw, 13px)",
              fontFamily: "var(--font-inter), sans-serif",
            }}
          >
            <p style={{ margin: "0 0 8px 0" }}>
              © {currentYear} AC RLC Simulator. All rights reserved.
            </p>
            <p
              style={{
                margin: "0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "4px",
              }}
            >
              Made with{" "}
              <FaHeart
                size={12}
                style={{
                  color: isDark ? "#ef4444" : "#dc2626",
                  animation: "pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                }}
              />{" "}
              by Ritam Das
            </p>
          </div>
        </div>
      </div>

      {/* Decorative gradient line at top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: `linear-gradient(90deg, 
            transparent, 
            ${isDark ? "rgba(96, 165, 250, 0.5)" : "rgba(59, 130, 246, 0.4)"}, 
            transparent)`,
          pointerEvents: "none",
        }}
      />
    </footer>
  );
}
