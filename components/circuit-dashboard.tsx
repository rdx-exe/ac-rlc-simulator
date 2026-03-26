'use client';

import { useState, useMemo } from 'react';
import { CircuitState } from '@/lib/types';
import {
  calculateMetrics,
  generatePhasorData,
  generateWaveformData,
  generateFrequencySweepData,
} from '@/lib/physics';
import { InputPanel } from './input-panel';
import { ResultsPanel } from './results-panel';
import { PhasorDiagram } from './phasor-diagram';
import { ImpedanceTriangle } from './impedance-triangle';
import { WaveformChart } from './waveform-chart';
import { FrequencySweepChart } from './frequency-sweep-chart';

const DEFAULT_STATE: CircuitState = {
  mode: 'RLC',
  resistance: 100,
  inductance: 50,
  capacitance: 10,
  voltage: 120,
  frequency: 60,
};

export function CircuitDashboard() {
  const [state, setState] = useState<CircuitState>(DEFAULT_STATE);

  const metrics = useMemo(() => calculateMetrics(state), [state]);
  const phasorData = useMemo(() => generatePhasorData(state, metrics), [state, metrics]);
  const waveformData = useMemo(() => generateWaveformData(state, metrics), [state, metrics]);
  const frequencySweepData = useMemo(() => generateFrequencySweepData(state), [state]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-700 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 sticky top-0 z-50 shadow-lg">
        <div className="max-w-full px-4 sm:px-6 lg:px-8 py-4 md:py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent leading-tight">
                AC-RLC Circuit Simulator
              </h1>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">
                Interactive visualization of AC circuit behavior with real-time calculations
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-full px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Left Column - Inputs (Full width on mobile, 1/2 on tablet, 1/3 on desktop) */}
          <div className="sm:col-span-1">
            <InputPanel state={state} onChange={setState} />
          </div>

          {/* Middle Column - Results and Phasor (Full width on mobile, 1/2 on tablet, 1/3 on desktop) */}
          <div className="space-y-4 md:space-y-6 sm:col-span-1">
            <ResultsPanel metrics={metrics} mode={state.mode} />
            <PhasorDiagram data={phasorData} />
          </div>

          {/* Right Column - Impedance and Waveform (Full width on mobile, 1/2 on tablet, 1/3 on desktop) */}
          <div className="space-y-4 md:space-y-6 sm:col-span-2 lg:col-span-1">
            <ImpedanceTriangle metrics={metrics} />
            <WaveformChart data={waveformData} />
          </div>
        </div>

        {/* Full Width - Frequency Response */}
        <div className="mt-6 md:mt-8">
          <FrequencySweepChart data={frequencySweepData} />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 mt-8 md:mt-12">
        <div className="max-w-full px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div>
              <h3 className="text-white font-semibold mb-2 text-sm md:text-base">About</h3>
              <p className="text-slate-400 text-xs md:text-sm">
                Physics-based simulator for all AC circuit configurations with real-time calculations.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2 text-sm md:text-base">Active Circuit</h3>
              <p className="text-blue-400 text-xs md:text-sm font-mono font-bold">
                {state.mode === 'R' && 'Pure Resistor'}
                {state.mode === 'L' && 'Pure Inductor'}
                {state.mode === 'C' && 'Pure Capacitor'}
                {state.mode === 'RL' && 'Resistor + Inductor'}
                {state.mode === 'RC' && 'Resistor + Capacitor'}
                {state.mode === 'RLC' && 'Full RLC Circuit'}
              </p>
              <p className="text-slate-500 text-xs mt-1">
                Phase: {metrics.phase_angle_degrees.toFixed(1)}° | PF: {Math.abs(metrics.power_factor).toFixed(3)}
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2 text-sm md:text-base">Key Formulas</h3>
              <p className="text-slate-400 text-xs md:text-sm font-mono leading-relaxed">
                Z = √(R² + X²)<br />
                I = V/Z<br />
                φ = arctan(X/R)
              </p>
            </div>
            <div className="sm:col-span-2 lg:col-span-1">
              <h3 className="text-white font-semibold mb-2 text-sm md:text-base">Features</h3>
              <p className="text-slate-400 text-xs md:text-sm">
                6 circuit modes • Interactive diagrams • Real-time graphs • Frequency sweep
              </p>
            </div>
          </div>
          <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-slate-700 text-center text-slate-400 text-xs md:text-sm">
            <p>AC Circuit Simulator © 2026. Built by Ritam Das.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
