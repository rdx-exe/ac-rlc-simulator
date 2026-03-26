'use client';

import { PhasorData } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { useState } from 'react';

interface PhasorDiagramProps {
  data: PhasorData;
}

export function PhasorDiagram({ data }: PhasorDiagramProps) {
  const [hoveredPhasor, setHoveredPhasor] = useState<string | null>(null);
  const size = 300;
  const center = size / 2;
  
  // Auto-scale based on magnitude to ensure visibility
  const maxMagnitude = Math.max(
    Math.hypot(data.voltage_real, data.voltage_imag),
    Math.hypot(data.current_real, data.current_imag),
    Math.hypot(data.impedance_real, data.impedance_imag)
  );
  const scale = Math.min(100, (size / 3) / Math.max(1, maxMagnitude));

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

      <div className="flex justify-center overflow-hidden">
        <svg
          width="100%"
          height="auto"
          viewBox={`0 0 ${size} ${size}`}
          preserveAspectRatio="xMidYMid meet"
          className="w-full max-w-sm bg-slate-950/50 rounded-lg border border-slate-700"
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
        <g
          onMouseEnter={() => setHoveredPhasor('V')}
          onMouseLeave={() => setHoveredPhasor(null)}
          style={{ cursor: 'pointer' }}
        >
          <line
            x1={center}
            y1={center}
            x2={voltage_x}
            y2={voltage_y}
            stroke={hoveredPhasor === 'V' ? 'rgb(96, 165, 250)' : 'rgb(59, 130, 246)'}
            strokeWidth={hoveredPhasor === 'V' ? 3.5 : 2.5}
            strokeLinecap="round"
            className="transition-all duration-200"
          />
          <circle
            cx={voltage_x}
            cy={voltage_y}
            r={hoveredPhasor === 'V' ? 6 : 4}
            fill={hoveredPhasor === 'V' ? 'rgb(96, 165, 250)' : 'rgb(59, 130, 246)'}
            className="transition-all duration-200"
          />
          {hoveredPhasor === 'V' && (
            <circle
              cx={voltage_x}
              cy={voltage_y}
              r={8}
              fill="none"
              stroke="rgb(96, 165, 250)"
              strokeWidth="1"
              opacity="0.5"
            />
          )}
          <text
            x={voltage_x + 10}
            y={voltage_y - 10}
            fontSize="12"
            fill={hoveredPhasor === 'V' ? 'rgb(191, 219, 254)' : 'rgb(147, 197, 253)'}
            fontWeight="bold"
            className="transition-all duration-200"
          >
            V
          </text>
        </g>

        {/* Current phasor */}
        <g
          onMouseEnter={() => setHoveredPhasor('I')}
          onMouseLeave={() => setHoveredPhasor(null)}
          style={{ cursor: 'pointer' }}
        >
          <line
            x1={center}
            y1={center}
            x2={current_x}
            y2={current_y}
            stroke={hoveredPhasor === 'I' ? 'rgb(196, 181, 253)' : 'rgb(168, 85, 247)'}
            strokeWidth={hoveredPhasor === 'I' ? 3.5 : 2.5}
            strokeLinecap="round"
            className="transition-all duration-200"
          />
          <circle
            cx={current_x}
            cy={current_y}
            r={hoveredPhasor === 'I' ? 6 : 4}
            fill={hoveredPhasor === 'I' ? 'rgb(196, 181, 253)' : 'rgb(168, 85, 247)'}
            className="transition-all duration-200"
          />
          {hoveredPhasor === 'I' && (
            <circle
              cx={current_x}
              cy={current_y}
              r={8}
              fill="none"
              stroke="rgb(196, 181, 253)"
              strokeWidth="1"
              opacity="0.5"
            />
          )}
          <text
            x={current_x + 10}
            y={current_y + 15}
            fontSize="12"
            fill={hoveredPhasor === 'I' ? 'rgb(233, 213, 253)' : 'rgb(196, 181, 253)'}
            fontWeight="bold"
            className="transition-all duration-200"
          >
            I
          </text>
        </g>

        {/* Impedance phasor */}
        <g
          onMouseEnter={() => setHoveredPhasor('Z')}
          onMouseLeave={() => setHoveredPhasor(null)}
          style={{ cursor: 'pointer' }}
        >
          <line
            x1={center}
            y1={center}
            x2={impedance_x}
            y2={impedance_y}
            stroke={hoveredPhasor === 'Z' ? 'rgb(74, 222, 128)' : 'rgb(34, 197, 94)'}
            strokeWidth={hoveredPhasor === 'Z' ? 3.5 : 2.5}
            strokeLinecap="round"
            strokeDasharray="5"
            className="transition-all duration-200"
          />
          <circle
            cx={impedance_x}
            cy={impedance_y}
            r={hoveredPhasor === 'Z' ? 6 : 4}
            fill={hoveredPhasor === 'Z' ? 'rgb(74, 222, 128)' : 'rgb(34, 197, 94)'}
            className="transition-all duration-200"
          />
          {hoveredPhasor === 'Z' && (
            <circle
              cx={impedance_x}
              cy={impedance_y}
              r={8}
              fill="none"
              stroke="rgb(74, 222, 128)"
              strokeWidth="1"
              opacity="0.5"
            />
          )}
          <text
            x={impedance_x - 25}
            y={impedance_y - 10}
            fontSize="12"
            fill={hoveredPhasor === 'Z' ? 'rgb(187, 247, 208)' : 'rgb(134, 239, 172)'}
            fontWeight="bold"
            className="transition-all duration-200"
          >
            Z
          </text>
        </g>

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
