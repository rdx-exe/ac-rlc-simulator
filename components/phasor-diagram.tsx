'use client';

import { CircuitMetrics, CircuitState } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { useState } from 'react';

interface PhasorDiagramProps {
  state: CircuitState;
  metrics: CircuitMetrics;
}

export function PhasorDiagram({ state, metrics }: PhasorDiagramProps) {
  const [hoveredPhasor, setHoveredPhasor] = useState<string | null>(null);
  const size = 300;
  const center = size / 2;

  const currentMagnitude = Math.max(0, metrics.current);
  const vr = currentMagnitude * state.resistance;
  const vl = currentMagnitude * metrics.inductive_reactance;
  const vc = currentMagnitude * metrics.capacitive_reactance;
  const vReactive = vl - vc;
  const vTotal = Math.hypot(vr, vReactive);

  const maxMagnitude = Math.max(vr, vl, vc, vTotal, currentMagnitude, 1);
  const scale = (size * 0.35) / maxMagnitude;

  const toPoint = (magnitude: number, degrees: number) => {
    const radians = (degrees * Math.PI) / 180;
    return {
      x: center + magnitude * scale * Math.cos(radians),
      y: center - magnitude * scale * Math.sin(radians),
    };
  };

  const iRefPoint = toPoint(currentMagnitude, 0);
  const vrPoint = toPoint(vr, 0);
  const vlPoint = toPoint(vl, 90);
  const vcPoint = toPoint(vc, -90);
  const vtPoint = toPoint(vTotal, metrics.phase_angle_degrees);
  const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
  const getLabelPoint = (point: { x: number; y: number }, dx: number, dy: number) => ({
    x: clamp(point.x + dx, 8, size - 40),
    y: clamp(point.y + dy, 14, size - 8),
  });

  const iLabel = getLabelPoint(iRefPoint, 8, -10);
  const vrLabel = getLabelPoint(vrPoint, 8, 16);
  const vlLabel = getLabelPoint(vlPoint, 8, -8);
  const vcLabel = getLabelPoint(vcPoint, 8, 16);
  const vtLabel = getLabelPoint(vtPoint, 8, -8);

  const leadLagText =
    Math.abs(metrics.phase_angle_degrees) < 0.01
      ? 'In phase'
      : metrics.phase_angle_degrees > 0
        ? `Voltage leads current by ${Math.abs(metrics.phase_angle_degrees).toFixed(1)}°`
        : `Voltage lags current by ${Math.abs(metrics.phase_angle_degrees).toFixed(1)}°`;

  return (
    <Card className="p-4 md:p-6 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700 shadow-2xl">
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

        {/* Current reference phasor (It/Ir/Il/Ic for series) */}
        <g
          onMouseEnter={() => setHoveredPhasor('Iref')}
          onMouseLeave={() => setHoveredPhasor(null)}
          style={{ cursor: 'pointer' }}
        >
          <line
            x1={center}
            y1={center}
            x2={iRefPoint.x}
            y2={iRefPoint.y}
            stroke={hoveredPhasor === 'Iref' ? 'rgb(196, 181, 253)' : 'rgb(168, 85, 247)'}
            strokeWidth={hoveredPhasor === 'Iref' ? 3.5 : 2.5}
            strokeLinecap="round"
            className="transition-all duration-200"
          />
          <circle
            cx={iRefPoint.x}
            cy={iRefPoint.y}
            r={hoveredPhasor === 'Iref' ? 6 : 4}
            fill={hoveredPhasor === 'Iref' ? 'rgb(196, 181, 253)' : 'rgb(168, 85, 247)'}
            className="transition-all duration-200"
          />
          {hoveredPhasor === 'Iref' && (
            <circle
              cx={iRefPoint.x}
              cy={iRefPoint.y}
              r={8}
              fill="none"
              stroke="rgb(196, 181, 253)"
              strokeWidth="1"
              opacity="0.5"
            />
          )}
          <text
            x={iLabel.x}
            y={iLabel.y}
            fontSize="12"
            fill={hoveredPhasor === 'Iref' ? 'rgb(233, 213, 253)' : 'rgb(196, 181, 253)'}
            fontWeight="bold"
            className="transition-all duration-200"
          >
            It
          </text>
        </g>

        {/* Resistor voltage Vr (in phase with current) */}
        <g
          onMouseEnter={() => setHoveredPhasor('Vr')}
          onMouseLeave={() => setHoveredPhasor(null)}
          style={{ cursor: 'pointer' }}
        >
          <line
            x1={center}
            y1={center}
            x2={vrPoint.x}
            y2={vrPoint.y}
            stroke={hoveredPhasor === 'Vr' ? 'rgb(96, 165, 250)' : 'rgb(59, 130, 246)'}
            strokeWidth={hoveredPhasor === 'Vr' ? 3.5 : 2.5}
            strokeLinecap="round"
            className="transition-all duration-200"
          />
          <circle
            cx={vrPoint.x}
            cy={vrPoint.y}
            r={hoveredPhasor === 'Vr' ? 6 : 4}
            fill={hoveredPhasor === 'Vr' ? 'rgb(96, 165, 250)' : 'rgb(59, 130, 246)'}
            className="transition-all duration-200"
          />
          {hoveredPhasor === 'Vr' && (
            <circle
              cx={vrPoint.x}
              cy={vrPoint.y}
              r={8}
              fill="none"
              stroke="rgb(96, 165, 250)"
              strokeWidth="1"
              opacity="0.5"
            />
          )}
          <text
            x={vrLabel.x}
            y={vrLabel.y}
            fontSize="12"
            fill={hoveredPhasor === 'Vr' ? 'rgb(191, 219, 254)' : 'rgb(147, 197, 253)'}
            fontWeight="bold"
            className="transition-all duration-200"
          >
            Vr
          </text>
        </g>

        {/* Inductor voltage Vl (+90° from current) */}
        <g
          onMouseEnter={() => setHoveredPhasor('Vl')}
          onMouseLeave={() => setHoveredPhasor(null)}
          style={{ cursor: 'pointer' }}
        >
          <line
            x1={center}
            y1={center}
            x2={vlPoint.x}
            y2={vlPoint.y}
            stroke={hoveredPhasor === 'Vl' ? 'rgb(74, 222, 128)' : 'rgb(34, 197, 94)'}
            strokeWidth={hoveredPhasor === 'Vl' ? 3.5 : 2.5}
            strokeLinecap="round"
            className="transition-all duration-200"
          />
          <circle
            cx={vlPoint.x}
            cy={vlPoint.y}
            r={hoveredPhasor === 'Vl' ? 6 : 4}
            fill={hoveredPhasor === 'Vl' ? 'rgb(74, 222, 128)' : 'rgb(34, 197, 94)'}
            className="transition-all duration-200"
          />
          {hoveredPhasor === 'Vl' && (
            <circle
              cx={vlPoint.x}
              cy={vlPoint.y}
              r={8}
              fill="none"
              stroke="rgb(74, 222, 128)"
              strokeWidth="1"
              opacity="0.5"
            />
          )}
          <text
            x={vlLabel.x}
            y={vlLabel.y}
            fontSize="12"
            fill={hoveredPhasor === 'Vl' ? 'rgb(187, 247, 208)' : 'rgb(134, 239, 172)'}
            fontWeight="bold"
            className="transition-all duration-200"
          >
            Vl
          </text>
        </g>

        {/* Capacitor voltage Vc (-90° from current) */}
        <g
          onMouseEnter={() => setHoveredPhasor('Vc')}
          onMouseLeave={() => setHoveredPhasor(null)}
          style={{ cursor: 'pointer' }}
        >
          <line
            x1={center}
            y1={center}
            x2={vcPoint.x}
            y2={vcPoint.y}
            stroke={hoveredPhasor === 'Vc' ? 'rgb(251, 191, 36)' : 'rgb(245, 158, 11)'}
            strokeWidth={hoveredPhasor === 'Vc' ? 3.5 : 2.5}
            strokeLinecap="round"
            className="transition-all duration-200"
          />
          <circle
            cx={vcPoint.x}
            cy={vcPoint.y}
            r={hoveredPhasor === 'Vc' ? 6 : 4}
            fill={hoveredPhasor === 'Vc' ? 'rgb(251, 191, 36)' : 'rgb(245, 158, 11)'}
            className="transition-all duration-200"
          />
          {hoveredPhasor === 'Vc' && (
            <circle
              cx={vcPoint.x}
              cy={vcPoint.y}
              r={8}
              fill="none"
              stroke="rgb(251, 191, 36)"
              strokeWidth="1"
              opacity="0.5"
            />
          )}
          <text
            x={vcLabel.x}
            y={vcLabel.y}
            fontSize="12"
            fill={hoveredPhasor === 'Vc' ? 'rgb(254, 243, 199)' : 'rgb(253, 230, 138)'}
            fontWeight="bold"
            className="transition-all duration-200"
          >
            Vc
          </text>
        </g>

        {/* Parallelogram law helper (component summation) */}
        <line
          x1={vrPoint.x}
          y1={vrPoint.y}
          x2={vtPoint.x}
          y2={vtPoint.y}
          stroke="rgb(100, 116, 139)"
          strokeWidth="1.2"
          strokeDasharray="4"
          opacity="0.8"
        />

        {/* Resultant total voltage vector Vt */}
        <g
          onMouseEnter={() => setHoveredPhasor('Vt')}
          onMouseLeave={() => setHoveredPhasor(null)}
          style={{ cursor: 'pointer' }}
        >
          <line
            x1={center}
            y1={center}
            x2={vtPoint.x}
            y2={vtPoint.y}
            stroke={hoveredPhasor === 'Vt' ? 'rgb(248, 113, 113)' : 'rgb(239, 68, 68)'}
            strokeWidth={hoveredPhasor === 'Vt' ? 4 : 3}
            strokeLinecap="round"
            className="transition-all duration-200"
          />
          <circle
            cx={vtPoint.x}
            cy={vtPoint.y}
            r={hoveredPhasor === 'Vt' ? 6 : 4}
            fill={hoveredPhasor === 'Vt' ? 'rgb(248, 113, 113)' : 'rgb(239, 68, 68)'}
            className="transition-all duration-200"
          />
          <text
            x={vtLabel.x}
            y={vtLabel.y}
            fontSize="12"
            fill={hoveredPhasor === 'Vt' ? 'rgb(254, 202, 202)' : 'rgb(252, 165, 165)'}
            fontWeight="bold"
            className="transition-all duration-200"
          >
            Vt
          </text>
        </g>

        {/* Phase angle arc */}
        {Math.abs(metrics.phase_angle_degrees) > 0.01 && (
          <path
            d={`M ${center + 24} ${center} A 24 24 0 0 ${metrics.phase_angle_degrees > 0 ? 0 : 1} ${
              center + 24 * Math.cos((metrics.phase_angle_degrees * Math.PI) / 180)
            } ${center - 24 * Math.sin((metrics.phase_angle_degrees * Math.PI) / 180)}`}
            fill="none"
            stroke="rgb(148, 163, 184)"
            strokeWidth="1.5"
          />
        )}
        <text x={center + 30} y={center - 6} fontSize="11" fill="rgb(148, 163, 184)">
          φ={metrics.phase_angle_degrees.toFixed(1)}°
        </text>

        {/* Axis labels */}
        <text x={size - 22} y={center - 6} fontSize="10" fill="rgb(100, 116, 139)">Re</text>
        <text x={center + 6} y={12} fontSize="10" fill="rgb(100, 116, 139)">+j</text>

        {/* Center point */}
        <circle cx={center} cy={center} r="2" fill="rgb(100, 116, 139)" />
        </svg>
      </div>

      <div className="mt-3 md:mt-4 grid grid-cols-2 gap-2 text-xs md:text-sm text-slate-300">
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-purple-400" />
          <span>It (reference at 0°)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-blue-400" />
          <span>Vr in phase with It</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-green-400" />
          <span>Vl leads It by 90°</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-amber-400" />
          <span>Vc lags It by 90°</span>
        </div>
        <div className="flex items-center gap-2 col-span-2">
          <div className="w-3 h-0.5 bg-red-400" />
          <span>Resultant: Vt = Vr + j(Vl - Vc)</span>
        </div>
        <div className="col-span-2 text-slate-400">
          {leadLagText}
        </div>
      </div>
    </Card>
  );
}
