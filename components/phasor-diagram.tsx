'use client';

import { PhasorData } from '@/lib/types';
import { Card } from '@/components/ui/card';

interface PhasorDiagramProps {
  data: PhasorData;
}

export function PhasorDiagram({ data }: PhasorDiagramProps) {
  const size = 280;
  const center = size / 2;
  const scale = 25; // Pixels per volt/amp

  // Scale the phasors
  const voltage_x = center + data.voltage_real * scale;
  const voltage_y = center - data.voltage_imag * scale;

  const current_x = center + data.current_real * scale;
  const current_y = center - data.current_imag * scale;

  const impedance_x = center + data.impedance_real * scale;
  const impedance_y = center - data.impedance_imag * scale;

  return (
    <Card className="p-4 md:p-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700 shadow-2xl">
      <h3 className="text-base md:text-lg font-bold text-white mb-3 md:mb-4">Phasor Diagram</h3>

      <div className="flex justify-center">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="w-full max-w-xs bg-slate-950/50 rounded-lg border border-slate-700"
        >
        {/* Grid lines */}
        <line
          x1="0"
          y1={center}
          x2={size}
          y2={center}
          stroke="rgb(71, 85, 105)"
          strokeWidth="1"
          strokeDasharray="4"
        />
        <line
          x1={center}
          y1="0"
          x2={center}
          y2={size}
          stroke="rgb(71, 85, 105)"
          strokeWidth="1"
          strokeDasharray="4"
        />

        {/* Grid circles */}
        {[1, 2, 3, 4, 5].map((r) => (
          <circle
            key={r}
            cx={center}
            cy={center}
            r={r * scale}
            fill="none"
            stroke="rgb(51, 65, 85)"
            strokeWidth="0.5"
            opacity="0.5"
          />
        ))}

        {/* Voltage phasor */}
        <line
          x1={center}
          y1={center}
          x2={voltage_x}
          y2={voltage_y}
          stroke="rgb(59, 130, 246)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle
          cx={voltage_x}
          cy={voltage_y}
          r="4"
          fill="rgb(59, 130, 246)"
        />
        <text
          x={voltage_x + 10}
          y={voltage_y - 10}
          fontSize="12"
          fill="rgb(147, 197, 253)"
          fontWeight="bold"
        >
          V
        </text>

        {/* Current phasor */}
        <line
          x1={center}
          y1={center}
          x2={current_x}
          y2={current_y}
          stroke="rgb(168, 85, 247)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle
          cx={current_x}
          cy={current_y}
          r="4"
          fill="rgb(168, 85, 247)"
        />
        <text
          x={current_x + 10}
          y={current_y + 15}
          fontSize="12"
          fill="rgb(196, 181, 253)"
          fontWeight="bold"
        >
          I
        </text>

        {/* Impedance phasor */}
        <line
          x1={center}
          y1={center}
          x2={impedance_x}
          y2={impedance_y}
          stroke="rgb(34, 197, 94)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="5"
        />
        <circle
          cx={impedance_x}
          cy={impedance_y}
          r="4"
          fill="rgb(34, 197, 94)"
        />
        <text
          x={impedance_x - 25}
          y={impedance_y - 10}
          fontSize="12"
          fill="rgb(134, 239, 172)"
          fontWeight="bold"
        >
          Z
        </text>

        {/* Center point */}
        <circle cx={center} cy={center} r="2" fill="rgb(100, 116, 139)" />
        </svg>
      </div>

      <div className="mt-3 md:mt-4 grid grid-cols-2 gap-2 text-xs md:text-sm text-slate-300">
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-blue-400" />
          <span>Voltage</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-purple-400" />
          <span>Current</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-0.5 bg-green-400"
            style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgb(74, 222, 128) 0px, rgb(74, 222, 128) 5px, transparent 5px, transparent 10px)' }}
          />
          <span>Impedance</span>
        </div>
      </div>
    </Card>
  );
}
