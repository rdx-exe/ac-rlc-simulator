"use client";

import React from "react";

interface ImpedanceTriangleProps {
  isDark: boolean;
  R: number;
  X: number;
  Z: number;
  phase: number;
  mode: "R" | "RL" | "RC" | "RLC";
}

/**
 * Animated wrapper for ImpedanceTriangle with Framer Motion effects
 */
const ImpedanceTriangle = React.memo(
  ({
    isDark,
    R,
    X,
    Z,
    phase,
    mode,
  }: ImpedanceTriangleProps) => {
    const boxStyle = {
      backgroundColor: isDark ? "rgba(30, 30, 30, 0.6)" : "rgba(240, 240, 240, 0.6)",
      border: `1px solid ${isDark ? "rgba(59, 130, 246, 0.3)" : "rgba(0, 0, 0, 0.1)"}`,
      borderRadius: "16px",
      padding: "clamp(16px, 5vw, 24px)",
      overflow: "hidden",
    };

    const titleStyle = {
      color: isDark ? "#ffffff" : "#000000",
      fontFamily: "var(--font-poppins), sans-serif",
      fontWeight: "700",
      fontSize: "clamp(15px, 2.5vw, 17px)",
      marginBottom: "16px",
      paddingBottom: "12px",
      borderBottom: `1px solid ${isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}`,
    };

    return (
      <div
        style={boxStyle}
        className="hover:shadow-[0_0_25px_rgba(59,130,246,0.35)] transition-shadow duration-300"
      >
        <div style={titleStyle}>Impedance Triangle</div>

        {/* Canvas Container with Glow Background */}
        <div
          className="relative rounded-lg overflow-hidden"
          style={{
            backgroundColor: isDark ? "rgba(0, 0, 0, 0.3)" : "rgba(255, 255, 255, 0.1)",
            border: `1px solid ${isDark ? "rgba(59, 130, 246, 0.2)" : "rgba(0, 0, 0, 0.1)"}`,
          }}
        >
          <div
            className="absolute inset-0 bg-linear-to-br from-cyan-500/10 via-transparent to-blue-500/10 pointer-events-none rounded-lg"
          />

          <div style={{ position: "relative", height: "500px", zIndex: 1 }}>
            <ImpedanceTriangle
              isDark={isDark}
              R={R}
              X={X}
              Z={Z}
              phase={phase}
              mode={mode}
            />
          </div>
        </div>

        {/* Description */}
        <div
          style={{
            marginTop: "16px",
            padding: "12px",
            borderRadius: "8px",
            backgroundColor: isDark ? "rgba(59, 130, 246, 0.1)" : "rgba(0, 102, 255, 0.05)",
            border: `1px solid ${isDark ? "rgba(59, 130, 246, 0.3)" : "rgba(0, 102, 255, 0.2)"}`,
          }}
        >
          <p
            style={{
              color: isDark ? "#d1d5db" : "#4b5563",
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "clamp(11px, 2vw, 12px)",
              lineHeight: "1.6",
              margin: 0,
            }}
          >
            <strong>Impedance Triangle:</strong> <span className="text-blue-400">Blue (R)</span> = Resistance, <span className="text-red-400">Red (X)</span> = Net Reactance, <span className="text-yellow-400">Yellow (Z)</span> = Impedance magnitude.
          </p>
        </div>
      </div>
    );
  }
);

ImpedanceTriangle.displayName = "ImpedanceTriangle";

export default ImpedanceTriangle;
