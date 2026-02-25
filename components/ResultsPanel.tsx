"use client";

import React from "react";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

interface ResultsPanelProps {
  isDark: boolean;
  omega: number;
  XL: number | null;
  XC: number | null;
  X: number;
  Z: number;
  I: number;
  phi: number;
  phiDeg: number;
  powerFactor: number;
  powerFactorType: "Lagging" | "Leading" | "Unity";
  P: number;
  Q: number;
  S: number;
  isResonant: boolean;
  resonantFrequency: number | null;
  circuitType: "Inductive" | "Capacitive" | "Resonant" | "Resistive";
  mode: "R" | "RL" | "RC" | "RLC";
}

const ResultsPanel = React.memo(
  ({
    isDark,
    omega,
    XL,
    XC,
    X,
    Z,
    I,
    phiDeg,
    powerFactor,
    powerFactorType,
    P,
    Q,
    S,
    isResonant,
    resonantFrequency,
    circuitType,
    mode,
  }: ResultsPanelProps) => {
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

    const resultItemStyle = {
      display: "grid",
      gridTemplateColumns: "minmax(140px, 1fr) minmax(100px, 1fr)",
      gap: "clamp(6px, 2vw, 8px)",
      marginBottom: "clamp(8px, 2vw, 12px)",
      padding: "clamp(8px, 2vw, 12px)",
      borderRadius: "8px",
      backgroundColor: isDark ? "rgba(0, 0, 0, 0.2)" : "rgba(255, 255, 255, 0.3)",
    };

    const labelStyle = {
      color: isDark ? "#d1d5db" : "#4b5563",
      fontFamily: "var(--font-inter), sans-serif",
      fontSize: "clamp(12px, 2vw, 13px)",
      fontWeight: "500",
    };

    const getCircuitTypeColor = () => {
      switch (circuitType) {
        case "Inductive":
          return isDark ? "#f87171" : "#dc2626";
        case "Capacitive":
          return isDark ? "#60a5fa" : "#0066ff";
        case "Resonant":
          return isDark ? "#4ade80" : "#16a34a";
        default:
          return isDark ? "#fbbf24" : "#f59e0b";
      }
    };

    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.2,
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
          {/* 1. Derived Electrical Quantities */}
          <div>
            <div style={{ marginBottom: "clamp(20px, 4vw, 28px)" }}>
              <div style={sectionTitleStyle}>Derived Electrical Quantities</div>

              <div style={resultItemStyle>>
                <span style={labelStyle}>Angular Frequency (ω)</span>
                <span className="text-cyan-400 font-bold">
                  {(omega).toFixed(3)} rad/s
                </span>
              </div>

              {XL !== null && (
                <div style={resultItemStyle>>
                  <span style={labelStyle}>Inductive Reactance (XL)</span>
                  <span style={{ color: "#fbbf24" }}>
                    {(XL).toFixed(3)} Ω
                  </span>
                </div>
              )}

              {XC !== null && (
                <div style={resultItemStyle>>
                  <span style={labelStyle}>Capacitive Reactance (XC)</span>
                  <span style={{ color: "#a78bfa" }}>
                    {(XC).toFixed(3)} Ω
                  </span>
                </div>
              )}

              {(XL !== null || XC !== null) && (
                <div style={resultItemStyle>>
                  <span style={labelStyle}>Net Reactance (X)</span>
                  <span style={{ color: "#fb923c" }}>
                    {(X).toFixed(3)} Ω
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* 2. Impedance & Current */}
          <div>
            <div style={{ marginBottom: "clamp(20px, 4vw, 28px)" }}>
              <div style={sectionTitleStyle}>Impedance & Current</div>

              <div style={resultItemStyle>>
                <span style={labelStyle}>Impedance (Z)</span>
                <span className="text-cyan-400 font-bold">
                  {(Z).toFixed(3)} Ω
                </span>
              </div>

              <div style={resultItemStyle>>
                <span style={labelStyle}>RMS Current (I)</span>
                <span className="text-yellow-400 font-bold">
                  {(I).toFixed(3)} A
                </span>
              </div>
            </div>
          </div>

          {/* 3. Phase & Power Analysis */}
          <div>
            <div style={{ marginBottom: "clamp(20px, 4vw, 28px)" }}>
              <div style={sectionTitleStyle}>Phase & Power Analysis</div>

              <div
                style={{
                  ...resultItemStyle,
                  backgroundColor: phiDeg > 0.5 ? (isDark ? "rgba(248, 113, 113, 0.15)" : "rgba(220, 38, 38, 0.08)") : phiDeg < -0.5 ? (isDark ? "rgba(96, 165, 250, 0.15)" : "rgba(0, 102, 255, 0.08)") : isDark ? "rgba(74, 222, 128, 0.15)" : "rgba(22, 163, 74, 0.08)",
                  borderLeft: `4px solid ${phiDeg > 0.5 ? (isDark ? "#f87171" : "#dc2626") : phiDeg < -0.5 ? (isDark ? "#60a5fa" : "#0066ff") : isDark ? "#4ade80" : "#16a34a"}`,
                }}
              >
                <span style={labelStyle}>Phase Angle (φ)</span>
                <span style={{ color: phiDeg > 0.5 ? (isDark ? "#ef4444" : "#991b1b") : phiDeg < -0.5 ? (isDark ? "#60a5fa" : "#0c4a6e") : isDark ? "#4ade80" : "#166534", fontWeight: "600" }}>
                  {(phiDeg).toFixed(2)}°
                </span>
              </div>

              <div style={resultItemStyle>>
                <span style={labelStyle}>Power Factor</span>
                <span className="text-cyan-400 font-bold">
                  {(powerFactor).toFixed(3)} ({powerFactorType})
                </span>
              </div>

              <div style={resultItemStyle>>
                <span style={labelStyle}>Real Power (P)</span>
                <span className="text-yellow-400 font-bold">
                  {(P).toFixed(2)} W
                </span>
              </div>

              <div style={resultItemStyle>>
                <span style={labelStyle}>Reactive Power (Q)</span>
                <span style={{ color: "#a78bfa" }}>
                  {(Q).toFixed(2)} VAR
                </span>
              </div>

              <div style={resultItemStyle>>
                <span style={labelStyle}>Apparent Power (S)</span>
                <span style={{ color: "#fb923c" }}>
                  {(S).toFixed(2)} VA
                </span>
              </div>
            </div>
          </div>

          {/* 4. Resonance Detection */}
          {mode === "RLC" && (
            <div>
              <div style={{ marginBottom: "clamp(20px, 4vw, 28px)" }}>
                <div style={sectionTitleStyle}>Resonance Analysis</div>

                {isResonant ? (
                  <div
                    style={{
                      ...resultItemStyle,
                      backgroundColor: isDark ? "rgba(74, 222, 128, 0.1)" : "rgba(22, 163, 74, 0.1)",
                      borderLeft: `4px solid ${isDark ? "#4ade80" : "#16a34a"}`,
                    }}
                    className="hover:shadow-[0_0_15px_rgba(74,222,128,0.5)]"
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <FaCheckCircle color={isDark ? "#4ade80" : "#16a34a"} size={16} />
                      <span className="text-green-400 font-bold">Circuit at Resonance</span>
                    </div>
                    <div style={{ gridColumn: "1 / -1" }}>
                      <span style={labelStyle}>
                        Resonant Frequency (f₀): {(resonantFrequency || 0).toFixed(2)} Hz
                      </span>
                    </div>
                  </div>
                ) : (
                  <div
                    style={{
                      ...resultItemStyle,
                      backgroundColor: isDark ? "rgba(248, 113, 113, 0.1)" : "rgba(220, 38, 38, 0.1)",
                      borderLeft: `4px solid ${isDark ? "#f87171" : "#dc2626"}`,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <FaExclamationTriangle color={isDark ? "#f87171" : "#dc2626"} size={16} />
                      <span style={{ color: isDark ? "#f87171" : "#dc2626", fontWeight: "600" }}>Circuit Type: {circuitType}</span>
                    </div>
                  </div>
                )}

                <div style={resultItemStyle>>
                  <span style={labelStyle}>Circuit Classification</span>
                  <span style={{ color: getCircuitTypeColor(), fontWeight: "600" }}>{circuitType}</span>
                </div>

                {resonantFrequency && (
                  <div style={resultItemStyle>>
                    <span style={labelStyle}>Theoretical f₀</span>
                    <span style={{ color: "#4ade80" }}>
                      {(resonantFrequency).toFixed(2)} Hz
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);

ResultsPanel.displayName = "ResultsPanel";

export default ResultsPanel;
