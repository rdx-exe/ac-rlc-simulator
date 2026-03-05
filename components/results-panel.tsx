'use client';

import { CircuitMetrics } from '@/lib/types';
import { Card } from '@/components/ui/card';

interface ResultsPanelProps {
  metrics: CircuitMetrics;
}

export function ResultsPanel({ metrics }: ResultsPanelProps) {
  const metrics_data = [
    {
      label: 'Impedance',
      value: metrics.impedance.toFixed(2),
      unit: 'Ω',
      color: 'from-blue-600 to-blue-800',
    },
    {
      label: 'Current',
      value: metrics.current.toFixed(3),
      unit: 'A',
      color: 'from-purple-600 to-purple-800',
    },
    {
      label: 'Phase Angle',
      value: metrics.phase_angle_degrees.toFixed(2),
      unit: '°',
      color: 'from-pink-600 to-pink-800',
    },
    {
      label: 'Power Factor',
      value: Math.abs(metrics.power_factor).toFixed(3),
      unit: '',
      color: 'from-green-600 to-green-800',
    },
    {
      label: 'Real Power',
      value: metrics.real_power.toFixed(2),
      unit: 'W',
      color: 'from-orange-600 to-orange-800',
    },
    {
      label: 'Apparent Power',
      value: metrics.apparent_power.toFixed(2),
      unit: 'VA',
      color: 'from-cyan-600 to-cyan-800',
    },
  ];

  return (
    <Card className="p-4 md:p-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700 shadow-2xl">
      <h2 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6 flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
        Circuit Metrics
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
        {metrics_data.map((metric) => (
          <div
            key={metric.label}
            className={`bg-gradient-to-br ${metric.color} rounded-lg p-3 md:p-4 border border-slate-700/50`}
          >
            <p className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-1 md:mb-2">
              {metric.label}
            </p>
            <p className="text-lg md:text-2xl font-bold text-white font-mono">
              {metric.value}
              <span className="text-xs md:text-sm ml-1 text-slate-300">{metric.unit}</span>
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-slate-700 grid grid-cols-2 gap-3 md:gap-4 text-xs md:text-sm">
        <div>
          <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">
            Inductive Reactance
          </p>
          <p className="text-white font-mono font-bold text-sm md:text-base">
            {metrics.inductive_reactance.toFixed(2)} Ω
          </p>
        </div>
        <div>
          <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">
            Capacitive Reactance
          </p>
          <p className="text-white font-mono font-bold text-sm md:text-base">
            {metrics.capacitive_reactance.toFixed(2)} Ω
          </p>
        </div>
        <div>
          <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">
            Resonant Frequency
          </p>
          <p className="text-white font-mono font-bold text-sm md:text-base">
            {metrics.resonant_frequency > 0
              ? metrics.resonant_frequency.toFixed(2)
              : 'N/A'}{' '}
            Hz
          </p>
        </div>
        <div>
          <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">
            Quality Factor
          </p>
          <p className="text-white font-mono font-bold text-sm md:text-base">
            {metrics.quality_factor.toFixed(2)}
          </p>
        </div>
      </div>
    </Card>
  );
}
