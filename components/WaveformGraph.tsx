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

interface WaveformGraphProps {
  isDark: boolean;
  time: number[];
  voltageWave: number[];
  currentWave: number[];
}

function formatTime(t: number): string {
  if (t < 0.001) {
    return (t * 1e6).toFixed(0) + " µs";
  } else if (t < 1) {
    return (t * 1000).toFixed(2) + " ms";
  }
  return t.toFixed(3) + " s";
}

const WaveformGraph = React.memo(
  ({ isDark, time, voltageWave, currentWave }: WaveformGraphProps) => {
    const timeLabels = useMemo(() => {
      return time.map((t) => formatTime(t));
    }, [time]);

    const chartData = useMemo(() => {
      return {
        labels: timeLabels,
        datasets: [
          {
            label: "Voltage (v(t))",
            data: voltageWave,
            borderColor: "#eab308",
            backgroundColor: "rgba(234, 179, 8, 0.05)",
            borderWidth: 2.5,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 6,
            fill: false,
            spanGaps: false,
          },
          {
            label: "Current (i(t))",
            data: currentWave,
            borderColor: "#06b6d4",
            backgroundColor: "rgba(6, 182, 212, 0.05)",
            borderWidth: 2.5,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 6,
            fill: false,
            spanGaps: false,
          },
        ],
      };
    }, [timeLabels, voltageWave, currentWave]);

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
              text: "Time",
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
            display: true,
            title: {
              display: true,
              text: "Amplitude (V)",
              color: isDark ? "#d1d5db" : "#374151",
              font: { size: 12, weight: "bold" as const },
            },
            ticks: {
              color: isDark ? "#9ca3af" : "#6b7280",
              font: { size: 11 },
            },
            grid: {
              color: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)",
              drawBorder: false,
            },
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

    return (
      <div
        style={boxStyle}
        className="hover:shadow-[0_0_25px_rgba(59,130,246,0.35)] transition-shadow duration-300"
      >
        <div style={{ marginBottom: "clamp(20px, 4vw, 28px)" }}>
          <div style={sectionTitleStyle}>Time Domain Waveforms</div>
        </div>

        <div
          className="relative rounded-lg overflow-hidden"
          style={{
            backgroundColor: isDark ? "rgba(0, 0, 0, 0.3)" : "rgba(255, 255, 255, 0.1)",
            border: `1px solid ${isDark ? "rgba(59, 130, 246, 0.2)" : "rgba(0, 0, 0, 0.1)"}`,
            padding: "16px",
          }}
        >
          <div
            className="absolute inset-0 bg-linear-to-br from-yellow-500/10 via-transparent to-cyan-500/10 pointer-events-none rounded-lg"
          />

          <div style={{ position: "relative", zIndex: 1 >>
            <Line data={chartData} options={chartOptions} height={300} />
          </div>
        </div>

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
            <strong>Waveforms:</strong> <span className="text-yellow-400">Yellow = Voltage v(t)</span>, <span className="text-cyan-400">Cyan = Current i(t)</span>
          </p>
        </div>
      </div>
    );
  }
);

WaveformGraph.displayName = "WaveformGraph";

export default WaveformGraph;
