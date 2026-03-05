'use client';

import { CircuitMetrics } from '@/lib/types';
import { Card } from '@/components/ui/card';

interface ImpedanceTriangleProps {
  metrics: CircuitMetrics;
}

export function ImpedanceTriangle({ metrics }: ImpedanceTriangleProps) {
  const size = 300;
  const padding = 40;
  const width = size - 2 * padding;

  // Calculate the triangle vertices based on impedance components
  const r = Math.abs(metrics.impedance * Math.cos(metrics.phase_angle));
  const x = Math.abs(metrics.impedance * Math.sin(metrics.phase_angle));
  const z = metrics.impedance;

  // Use minimum impedance to ensure scaling visibility
  const maxValue = Math.max(Math.max(r, x), z, 1) * 1.1;
  const scale = width / maxValue;

  const p1 = [padding, size - padding]; // Origin (0, 0)
  const p2 = [padding + r * scale, size - padding]; // (R, 0)
  const p3 = [padding + r * scale, size - padding - x * scale]; // (R, X)

  return (
    <Card className="p-4 md:p-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700 shadow-2xl">
      <h3 className="text-base md:text-lg font-bold text-white mb-3 md:mb-4">Impedance Triangle</h3>

      <div className="flex justify-center overflow-hidden">
        <svg
          width="100%"
          height="auto"
          viewBox={`0 0 ${size} ${size}`}
          preserveAspectRatio="xMidYMid meet"
          className="w-full max-w-sm bg-slate-950/50 rounded-lg border border-slate-700"
        >
        {/* Grid */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <g key={`grid-v-${i}`}>
            <line
              x1={padding + (width / 5) * i}
              y1={padding}
              x2={padding + (width / 5) * i}
              y2={size - padding}
              stroke="rgb(51, 65, 85)"
              strokeWidth="0.5"
              opacity="0.5"
            />
            <line
              x1={padding}
              y1={padding + (width / 5) * i}
              x2={size - padding}
              y2={padding + (width / 5) * i}
              stroke="rgb(51, 65, 85)"
              strokeWidth="0.5"
              opacity="0.5"
            />
          </g>
        ))}

        {/* Axes */}
        <line
          x1={padding}
          y1={size - padding}
          x2={size - padding}
          y2={size - padding}
          stroke="rgb(71, 85, 105)"
          strokeWidth="1.5"
        />
        <line
          x1={padding}
          y1={padding}
          x2={padding}
          y2={size - padding}
          stroke="rgb(71, 85, 105)"
          strokeWidth="1.5"
        />

        {/* Triangle */}
        <polygon
          points={`${p1[0]},${p1[1]} ${p2[0]},${p2[1]} ${p3[0]},${p3[1]}`}
          fill="none"
          stroke="rgb(59, 130, 246)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Fill with gradient */}
        <defs>
          <linearGradient id="triangleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="rgb(139, 92, 246)" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <polygon
          points={`${p1[0]},${p1[1]} ${p2[0]},${p2[1]} ${p3[0]},${p3[1]}`}
          fill="url(#triangleGradient)"
        />

        {/* Vertices */}
        <circle cx={p1[0]} cy={p1[1]} r="3" fill="rgb(100, 116, 139)" />
        <circle cx={p2[0]} cy={p2[1]} r="3" fill="rgb(59, 130, 246)" />
        <circle cx={p3[0]} cy={p3[1]} r="3" fill="rgb(139, 92, 246)" />

        {/* Labels */}
        <text x={padding - 20} y={size - padding + 5} fontSize="11" fill="rgb(100, 116, 139)">
          (0,0)
        </text>
        <text x={p2[0] - 10} y={size - padding + 20} fontSize="11" fill="rgb(147, 197, 253)">
          R
        </text>
        <text
          x={p3[0] + 10}
          y={p3[1] - 10}
          fontSize="11"
          fill="rgb(196, 181, 253)"
        >
          X
        </text>

        {/* Side labels */}
        <text
          x={(p1[0] + p2[0]) / 2}
          y={size - padding + 25}
          fontSize="10"
          fill="rgb(100, 116, 139)"
          textAnchor="middle"
        >
          {r.toFixed(1)} Ω
        </text>
        <text
          x={padding - 35}
          y={(p1[1] + p3[1]) / 2 + 3}
          fontSize="10"
          fill="rgb(100, 116, 139)"
          textAnchor="middle"
        >
          {x.toFixed(1)} Ω
        </text>
        <text
          x={(p2[0] + p3[0]) / 2 + 25}
          y={(p2[1] + p3[1]) / 2 - 10}
          fontSize="10"
          fill="rgb(147, 197, 253)"
          textAnchor="middle"
        >
          Z = {metrics.impedance.toFixed(1)} Ω
        </text>

        {/* Angle arc */}
        <path
          d={`M ${p2[0] - 20},${p2[1]} A 20,20 0 0,0 ${p2[0] - 20 * Math.cos(metrics.phase_angle)},${p2[1] - 20 * Math.sin(metrics.phase_angle)}`}
          fill="none"
          stroke="rgb(34, 197, 94)"
          strokeWidth="1.5"
        />
        <text
          x={p2[0] - 35}
          y={p2[1] - 5}
          fontSize="10"
          fill="rgb(134, 239, 172)"
        >
          φ
        </text>
        </svg>
      </div>

      <div className="mt-3 md:mt-4 text-center text-xs md:text-sm text-slate-300">
        <p>
          Phase Angle: <span className="font-bold text-blue-400">{metrics.phase_angle_degrees.toFixed(2)}°</span>
        </p>
      </div>
    </Card>
  );
}
