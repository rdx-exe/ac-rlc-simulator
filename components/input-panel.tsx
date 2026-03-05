'use client';

import { CircuitState, CircuitMode } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { useState, useEffect } from 'react';

interface InputPanelProps {
  state: CircuitState;
  onChange: (state: CircuitState) => void;
}

const CIRCUIT_MODES: { label: string; value: CircuitMode }[] = [
  { label: 'Resistor Only', value: 'R' },
  { label: 'Resistor + Inductor', value: 'RL' },
  { label: 'Resistor + Capacitor', value: 'RC' },
  { label: 'Resistor + Inductor + Capacitor', value: 'RLC' },
];

export function InputPanel({ state, onChange }: InputPanelProps) {
  const [inputValues, setInputValues] = useState<Record<string, string>>({
    resistance: state.resistance.toString(),
    inductance: state.inductance.toString(),
    capacitance: state.capacitance.toString(),
    voltage: state.voltage.toString(),
    frequency: state.frequency.toString(),
  });

  // Sync input values when state changes externally
  useEffect(() => {
    setInputValues({
      resistance: state.resistance.toString(),
      inductance: state.inductance.toString(),
      capacitance: state.capacitance.toString(),
      voltage: state.voltage.toString(),
      frequency: state.frequency.toString(),
    });
  }, [state]);

  const handleModeChange = (mode: CircuitMode) => {
    onChange({ ...state, mode });
  };

  const handleSliderChange = (key: keyof Omit<CircuitState, 'mode'>, value: number) => {
    const newState = { ...state, [key]: value };
    onChange(newState);
    setInputValues({ ...inputValues, [key]: value.toString() });
  };

  const handleInputChange = (key: keyof Omit<CircuitState, 'mode'>, value: string) => {
    setInputValues({ ...inputValues, [key]: value });
  };

  const handleInputBlur = (key: keyof Omit<CircuitState, 'mode'>, min: number, max: number) => {
    let numValue = parseFloat(inputValues[key] as string) || min;
    numValue = Math.max(min, Math.min(max, numValue));
    const newState = { ...state, [key]: numValue };
    onChange(newState);
    setInputValues({ ...inputValues, [key]: numValue.toString() });
  };

  const sliders = [
    {
      label: 'Resistance',
      key: 'resistance' as const,
      unit: 'Ω',
      min: 0,
      max: 10000,
      step: 10,
      show: true,
    },
    {
      label: 'Inductance',
      key: 'inductance' as const,
      unit: 'mH',
      min: 1,
      max: 500,
      step: 1,
      show: state.mode === 'RL' || state.mode === 'RLC',
    },
    {
      label: 'Capacitance',
      key: 'capacitance' as const,
      unit: 'µF',
      min: 0.1,
      max: 100,
      step: 0.1,
      show: state.mode === 'RC' || state.mode === 'RLC',
    },
    {
      label: 'Voltage',
      key: 'voltage' as const,
      unit: 'V',
      min: 1,
      max: 240,
      step: 1,
      show: true,
    },
    {
      label: 'Frequency',
      key: 'frequency' as const,
      unit: 'Hz',
      min: 1,
      max: 10000,
      step: 1,
      show: true,
    },
  ];

  return (
    <Card className="p-4 md:p-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700 shadow-2xl">
      <h2 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6 flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
        Circuit Configuration
      </h2>

      {/* Circuit Mode Selector */}
      <div className="mb-6">
        <label className="text-sm font-semibold text-slate-200 block mb-3">
          Circuit Type
        </label>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-1 lg:grid-cols-2">
          {CIRCUIT_MODES.map((mode) => (
            <button
              key={mode.value}
              onClick={() => handleModeChange(mode.value)}
              className={`px-3 py-2 text-xs md:text-sm rounded-lg font-medium transition-all ${
                state.mode === mode.value
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      {/* Parameters */}
      <div className="space-y-4">
        {sliders.map((slider) => {
          if (!slider.show) return null;

          const value = state[slider.key];
          const inputValue = inputValues[slider.key];

          return (
            <div key={slider.key} className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs md:text-sm font-semibold text-slate-200">
                  {slider.label}
                </label>
                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => handleInputChange(slider.key, e.target.value)}
                    onBlur={() => handleInputBlur(slider.key, slider.min, slider.max)}
                    className="w-20 md:w-24 px-2 py-1 text-xs md:text-sm bg-slate-800 border border-slate-600 rounded text-blue-400 font-mono text-right focus:outline-none focus:border-blue-500"
                  />
                  <span className="text-xs md:text-sm font-semibold text-slate-400 w-8">
                    {slider.unit}
                  </span>
                </div>
              </div>

              <input
                type="range"
                min={slider.min}
                max={slider.max}
                step={slider.step}
                value={value}
                onChange={(e) => handleSliderChange(slider.key, parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400 transition-colors"
              />

              <div className="flex justify-between text-xs text-slate-500">
                <span>{slider.min}</span>
                <span>{slider.max}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-slate-700">
        <p className="text-xs text-slate-400 leading-relaxed">
          Select a circuit type, then adjust parameters using sliders or text inputs to explore AC circuit behavior in real-time.
        </p>
      </div>
    </Card>
  );
}
