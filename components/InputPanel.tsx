"use client";

import React from "react";
import { FaExclamationCircle } from "react-icons/fa";

interface InputPanelProps {
  isDark: boolean;
  R: number;
  L: number;
  C: number;
  V: number;
  f: number;
  mode: "R" | "RL" | "RC" | "RLC";
  setR: (value: number) => void;
  setL: (value: number) => void;
  setC: (value: number) => void;
  setV: (value: number) => void;
  setF: (value: number) => void;
  setMode: (mode: "R" | "RL" | "RC" | "RLC") => void;
}

const InputPanel = React.memo(
  ({
    isDark,
    R,
    L,
    C,
    V,
    f,
    mode,
    setR,
    setL,
    setC,
    setV,
    setF,
    setMode,
  }: InputPanelProps) => {
    const modes: Array<"R" | "RL" | "RC" | "RLC"> = ["R", "RL", "RC", "RLC"];


    const isLDisabled = mode === "R" || mode === "RC";
    const isCDisabled = mode === "R" || mode === "RL";

    const getModeColor = (m: string) => {
      switch (m) {
        case "R":
          return isDark ? "#3b82f6" : "#0066ff";
        case "RL":
          return isDark ? "#fbbf24" : "#f59e0b";
        case "RC":
          return isDark ? "#a78bfa" : "#8b5cf6";
        case "RLC":
          return isDark ? "#06b6d4" : "#0891b2";
        default:
          return isDark ? "#60a5fa" : "#0084ff";
      }
    };

    const boxStyle = {
      backgroundColor: isDark ? "rgba(30, 30, 30, 0.6)" : "rgba(240, 240, 240, 0.6)",
      border: `1px solid ${isDark ? "rgba(59, 130, 246, 0.3)" : "rgba(0, 0, 0, 0.1)"}`,
      borderRadius: "16px",
      padding: "clamp(16px, 5vw, 24px)",
    };

    const sectionTitleStyle = {
      color: isDark ? "#ffffff" : "#000000",
      fontFamily: "var(--font-poppins), sans-serif",
      fontWeight: "700",
      fontSize: "clamp(15px, 2.5vw, 17px)",
      marginBottom: "16px",
      paddingBottom: "12px",
      borderBottom: `1px solid ${isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}`,
    };

    const labelStyle = {
      color: isDark ? "#ffffff" : "#000000",
      fontFamily: "var(--font-poppins), sans-serif",
      fontWeight: "600",
      fontSize: "clamp(14px, 2.5vw, 16px)",
      marginBottom: "8px",
      display: "block",
    };

    const gridStyle = {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "clamp(12px, 3vw, 16px)",
    };

    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.08,
          delayChildren: 0.1,
        },
      },
    };

    const itemVariants = {
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
      },
    };

    return (
      <div
        style={boxStyle}
        className="hover:shadow-[0_0_25px_rgba(59,130,246,0.35)] transition-shadow duration-300"
      >
        <div>
          {/* Circuit Mode Selection */}
          <div>
            <div style={{ marginBottom: "clamp(20px, 4vw, 28px)" }}>
              <div style={sectionTitleStyle}>Circuit Configuration</div>

              <div style={{ display: "flex", gap: "clamp(8px, 2vw, 12px)", flexWrap: "wrap" }}>
                {modes.map((m, index) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "8px",
                      border: `2px solid ${m === mode ? getModeColor(m) : isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)"}`,
                      backgroundColor: m === mode ? `${getModeColor(m)}15` : "transparent",
                      color: m === mode ? getModeColor(m) : isDark ? "#d1d5db" : "#6b7280",
                      fontFamily: "var(--font-inter), sans-serif",
                      fontWeight: "600",
                      fontSize: "clamp(12px, 2vw, 13px)",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      boxShadow: m === mode ? `0 0 15px ${getModeColor(m)}40` : "none",
                    }}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Input Fields */}
          <div>
            <div style={{ marginBottom: "clamp(20px, 4vw, 28px)" }}>
              <div style={sectionTitleStyle}>Component Values</div>

              <div style={gridStyle}>
                {/* Resistance */}
                <div>
                  <label style={labelStyle}>Resistance (R)</label>
                  <input
                    type="number"
                    value={R}
                    onChange={(e) => setR(Number(e.target.value))}

                    whileFocus={{
                      boxShadow: `0 0 15px ${isDark ? "rgba(59,130,246,0.5)" : "rgba(0,102,255,0.3)"}`,
                      borderColor: isDark ? "#3b82f6" : "#0066ff",
                    }}
                    style={{
                      width: "100%",
                      padding: "clamp(8px, 2vw, 12px)",
                      borderRadius: "8px",
                      border: `2px solid ${isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)"}`,
                      backgroundColor: isDark ? "rgba(0, 0, 0, 0.3)" : "rgba(255, 255, 255, 0.5)",
                      color: isDark ? "#ffffff" : "#000000",
                      fontFamily: "var(--font-inter), sans-serif",
                      fontSize: "clamp(13px, 2vw, 14px)",
                      transition: "all 0.3s ease",
                      outline: "none",
                    }}
                    placeholder="10"
                  />
                  <span style={{ fontSize: "11px", color: isDark ? "#9ca3af" : "#6b7280", marginTop: "4px", display: "block" }}>Ω (0-1000)</span>
                </div>

                {/* Inductance */}
                <div>
                  <label style={{ ...labelStyle, opacity: isLDisabled ? 0.5 : 1 >>Inductance (L)</label>
                  <input
                    type="number"
                    value={L}
                    onChange={(e) => setL(Number(e.target.value))}

                    disabled={isLDisabled}
                    whileFocus={!isLDisabled ? { boxShadow: `0 0 15px ${isDark ? "rgba(251,191,36,0.5)" : "rgba(245,158,11,0.3)"}` } : {}}
                    style={{
                      width: "100%",
                      padding: "clamp(8px, 2vw, 12px)",
                      borderRadius: "8px",
                      border: `2px solid ${isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)"}`,
                      backgroundColor: isLDisabled ? (isDark ? "rgba(0, 0, 0, 0.1)" : "rgba(0, 0, 0, 0.05)") : isDark ? "rgba(0, 0, 0, 0.3)" : "rgba(255, 255, 255, 0.5)",
                      color: isDark ? "#ffffff" : "#000000",
                      fontFamily: "var(--font-inter), sans-serif",
                      fontSize: "clamp(13px, 2vw, 14px)",
                      transition: "all 0.3s ease",
                      opacity: isLDisabled ? 0.5 : 1,
                      cursor: isLDisabled ? "not-allowed" : "text",
                      outline: "none",
                    }}
                    placeholder="0.1"
                  />
                  <span style={{ fontSize: "11px", color: isDark ? "#9ca3af" : "#6b7280", marginTop: "4px", display: "block" }}>H (0-10)</span>
                </div>

                {/* Capacitance */}
                <div>
                  <label style={{ ...labelStyle, opacity: isCDisabled ? 0.5 : 1 >>Capacitance (C)</label>
                  <input
                    type="number"
                    value={C}
                    onChange={(e) => setC(Number(e.target.value))}

                    disabled={isCDisabled}
                    whileFocus={!isCDisabled ? { boxShadow: `0 0 15px ${isDark ? "rgba(167,139,250,0.5)" : "rgba(139,92,246,0.3)"}` } : {}}
                    style={{
                      width: "100%",
                      padding: "clamp(8px, 2vw, 12px)",
                      borderRadius: "8px",
                      border: `2px solid ${isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)"}`,
                      backgroundColor: isCDisabled ? (isDark ? "rgba(0, 0, 0, 0.1)" : "rgba(0, 0, 0, 0.05)") : isDark ? "rgba(0, 0, 0, 0.3)" : "rgba(255, 255, 255, 0.5)",
                      color: isDark ? "#ffffff" : "#000000",
                      fontFamily: "var(--font-inter), sans-serif",
                      fontSize: "clamp(13px, 2vw, 14px)",
                      transition: "all 0.3s ease",
                      opacity: isCDisabled ? 0.5 : 1,
                      cursor: isCDisabled ? "not-allowed" : "text",
                      outline: "none",
                    }}
                    placeholder="0.0001"
                  />
                  <span style={{ fontSize: "11px", color: isDark ? "#9ca3af" : "#6b7280", marginTop: "4px", display: "block" }}>F (0-0.5)</span>
                </div>

                {/* Voltage */}
                <div>
                  <label style={labelStyle}>Voltage (V)</label>
                  <input
                    type="number"
                    value={V}
                    onChange={(e) => setV(Number(e.target.value))}

                    whileFocus={{
                      boxShadow: `0 0 15px ${isDark ? "rgba(6,182,212,0.5)" : "rgba(8,145,178,0.3)"}`,
                      borderColor: isDark ? "#06b6d4" : "#0891b2",
                    }}
                    style={{
                      width: "100%",
                      padding: "clamp(8px, 2vw, 12px)",
                      borderRadius: "8px",
                      border: `2px solid ${isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)"}`,
                      backgroundColor: isDark ? "rgba(0, 0, 0, 0.3)" : "rgba(255, 255, 255, 0.5)",
                      color: isDark ? "#ffffff" : "#000000",
                      fontFamily: "var(--font-inter), sans-serif",
                      fontSize: "clamp(13px, 2vw, 14px)",
                      transition: "all 0.3s ease",
                      outline: "none",
                    }}
                    placeholder="230"
                  />
                  <span style={{ fontSize: "11px", color: isDark ? "#9ca3af" : "#6b7280", marginTop: "4px", display: "block" }}>V (0-500)</span>
                </div>

                {/* Frequency */}
                <div>
                  <label style={labelStyle}>Frequency (f)</label>
                  <input
                    type="number"
                    value={f}
                    onChange={(e) => setF(Number(e.target.value))}

                    whileFocus={{
                      boxShadow: `0 0 15px ${isDark ? "rgba(34,197,94,0.5)" : "rgba(22,163,74,0.3)"}`,
                      borderColor: isDark ? "#22c55e" : "#15803d",
                    }}
                    style={{
                      width: "100%",
                      padding: "clamp(8px, 2vw, 12px)",
                      borderRadius: "8px",
                      border: `2px solid ${isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)"}`,
                      backgroundColor: isDark ? "rgba(0, 0, 0, 0.3)" : "rgba(255, 255, 255, 0.5)",
                      color: isDark ? "#ffffff" : "#000000",
                      fontFamily: "var(--font-inter), sans-serif",
                      fontSize: "clamp(13px, 2vw, 14px)",
                      transition: "all 0.3s ease",
                      outline: "none",
                    }}
                    placeholder="50"
                  />
                  <span style={{ fontSize: "11px", color: isDark ? "#9ca3af" : "#6b7280", marginTop: "4px", display: "block" }}>Hz (0.1-10k)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Note */}
          <div            style={{
              padding: "12px",
              borderRadius: "8px",
              backgroundColor: isDark ? "rgba(96, 165, 250, 0.1)" : "rgba(0, 102, 255, 0.05)",
              border: `1px solid ${isDark ? "rgba(96, 165, 250, 0.3)" : "rgba(0, 102, 255, 0.2)"}`,
              display: "flex",
              gap: "8px",
              alignItems: "flex-start",
            }}
          >
            <FaExclamationCircle style={{ marginTop: "2px", color: isDark ? "#60a5fa" : "#0066ff", flexShrink: 0 }} size={14} />
            <span style={{ color: isDark ? "#d1d5db" : "#4b5563", fontSize: "12px", lineHeight: "1.5" }}>
              All visualizations update in real-time as you modify circuit parameters.
            </span>
          </div>
        </div>
      </div>
    );
  }
);

InputPanel.displayName = "InputPanel";

export default InputPanel;
