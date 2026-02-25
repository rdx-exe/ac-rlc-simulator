"use client";

import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

interface FrequencySweepProps {
  isDark: boolean;
  frequencies: number[];
  impedances: number[];
  currents: number[];
  resonantFrequency: number | null;
  mode: "R" | "RL" | "RC" | "RLC";
}

const FrequencySweep = React.memo(
  ({
    isDark,
    frequencies,
    impedances,
    currents,
    resonantFrequency,
    mode,
  }: FrequencySweepProps) => {
    const frequencyLabels = useMemo(
      () => frequencies.map((f) => f.toFixed(1)),
      [frequencies]
    );

    // Find min impedance and max current
    const minImpedanceIndex = impedances.reduce((minIdx, val, idx) => (val < impedances[minIdx] ? idx : minIdx), 0);
    const maxCurrentIndex = currents.reduce((maxIdx, val, idx) => (val > currents[maxIdx] ? idx : maxIdx), 0);

    const chartData = useMemo(() => {
      return {
        labels: frequencyLabels,
        datasets: [
          {
            yAxisID: "y",
            label: "Impedance (Z)",
            data: impedances,
            borderColor: "#8b5cf6",
            backgroundColor: "rgba(139, 92, 246, 0.05)",
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 6,
            fill: false,
          },
          {
            yAxisID: "y1",
            label: "Current (I)",
            data: currents,
            borderColor: "#fbbf24",
            backgroundColor: "rgba(251, 191, 36, 0.05)",
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 6,
            fill: false,
          },
        ],
      };
    }, [frequencyLabels, impedances, currents]);

    const chartOptions: any = useMemo(() => {
      return {
        responsive: true,
        maintainAspectRatio: true,
        interaction: {
          mode: "index" as const,
          intersect: false,
        },
        plugins: {
          legend: {
            display: true,
            position: "top" as const,
            labels: {
              color: isDark ? "#d1d5db" : "#374151",
              font: { size: 12, weight: "bold" as const },
              padding: 16,
              usePointStyle: true,
            },
          },
          tooltip: {
            mode: "index" as const,
            intersect: false,
            backgroundColor: isDark ? "rgba(0, 0, 0, 0.8)" : "rgba(255, 255, 255, 0.9)",
            titleColor: isDark ? "#ffffff" : "#000000",
            bodyColor: isDark ? "#d1d5db" : "#374151",
            borderColor: isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)",
            borderWidth: 1,
          },
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: "Frequency (Hz)",
              color: isDark ? "#d1d5db" : "#374151",
              font: { size: 12, weight: "bold" as const },
            },
            ticks: {
              color: isDark ? "#9ca3af" : "#6b7280",
              font: { size: 11 },
              maxTicksLimit: 8,
            },
            grid: {
              color: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
              drawBorder: false,
            },
          },
          y: {
            type: "linear" as const,
            display: true,
            position: "left" as const,
            title: {
              display: true,
              text: "Impedance (Ω)",
              color: isDark ? "#d1d5db" : "#374151",
              font: { size: 12, weight: "bold" as const },
            },
            ticks: {
              color: isDark ? "#9ca3af" : "#6b7280",
              font: { size: 11 },
            },
            grid: {
              color: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
              drawBorder: false,
            },
          },
          y1: {
            type: "linear" as const,
            display: true,
            position: "right" as const,
            title: {
              display: true,
              text: "Current (A)",
              color: isDark ? "#d1d5db" : "#374151",
              font: { size: 12, weight: "bold" as const },
            },
            ticks: {
              color: isDark ? "#9ca3af" : "#6b7280",
              font: { size: 11 },
            },
            grid: { drawOnChartArea: false },
          },
        },
      };
    }, [isDark]);

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
      gridTemplateColumns: "1fr 1fr",
      gap: "8px",
      marginBottom: "12px",
      padding: "12px",
      borderRadius: "8px",
      backgroundColor: isDark ? "rgba(0, 0, 0, 0.2)" : "rgba(255, 255, 255, 0.3)",
    };

    const labelStyle = {
      color: isDark ? "#d1d5db" : "#4b5563",
      fontFamily: "var(--font-inter), sans-serif",
      fontSize: "clamp(12px, 2vw, 13px)",
      fontWeight: "500",
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
          <div>
            <div style={{ marginBottom: "clamp(20px, 4vw, 28px)" }}>
              <div style={sectionTitleStyle}>Frequency Response Analysis</div>
            </div>
          </div>

          {/* Chart */}
          <div>
            <div
              className="relative rounded-lg overflow-hidden"
              style={{
                backgroundColor: isDark ? "rgba(0, 0, 0, 0.3)" : "rgba(255, 255, 255, 0.1)",
                border: `1px solid ${isDark ? "rgba(59, 130, 246, 0.2)" : "rgba(0, 0, 0, 0.1)"}`,
                padding: "16px",
                marginBottom: "clamp(20px, 4vw, 28px)",
              }}
            >
              <div
                className="absolute inset-0 bg-linear-to-br from-purple-500/10 via-transparent to-yellow-500/10 pointer-events-none rounded-lg"
              />

              <div style={{ position: "relative", zIndex: 1 }}>
                <Line data={chartData} options={chartOptions} height={300} />
              </div>
            </div>
          </div>

          {/* Impedance Statistics */}
          <div>
            <div style={{ marginBottom: "clamp(20px, 4vw, 28px)" }}>
              <div style={sectionTitleStyle}>Impedance Statistics</div>

              <div style={resultItemStyle}>
                <span style={labelStyle}>Minimum Impedance</span>
                <span className="text-purple-400 font-bold">
                  {(impedances[minImpedanceIndex]).toFixed(3)} Ω
                  @ {(frequencies[minImpedanceIndex]).toFixed(1)} Hz
                </span>
              </div>

              <div style={resultItemStyle}>
                <span style={labelStyle}>Maximum Current</span>
                <span className="text-yellow-400 font-bold">
                  {(currents[maxCurrentIndex]).toFixed(3)} A
                  @ {(frequencies[maxCurrentIndex]).toFixed(1)} Hz
                </span>
              </div>
            </div>
          </div>

          {/* Resonance Information */}
          {mode === "RLC" && resonantFrequency && (
            <div>
              <div
                style={{
                  ...resultItemStyle,
                  backgroundColor: isDark ? "rgba(74, 222, 128, 0.1)" : "rgba(22, 163, 74, 0.1)",
                  borderLeft: `4px solid ${isDark ? "#4ade80" : "#16a34a"}`,
                }}
                className="hover:shadow-[0_0_15px_rgba(74,222,128,0.5)]"
              >
                <span style={labelStyle}>Resonant Frequency</span>
                <span className="text-green-400 font-bold">
                  {(resonantFrequency).toFixed(2)} Hz
                </span>
              </div>
            </div>
          )}

          {/* Description */}
          <div            style={{
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
              <strong>Frequency Sweep:</strong> Shows how impedance and current vary across frequencies. <strong>Purple</strong> = Impedance, <strong>Yellow</strong> = Current.
            </p>
          </div>
        </div>
      </div>
    );
  }
);

FrequencySweep.displayName = "FrequencySweep";

export default FrequencySweep;
