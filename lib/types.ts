// Circuit state and physics types
export type CircuitMode = 'R' | 'L' | 'C' | 'RL' | 'RC' | 'RLC';

export interface CircuitState {
  mode: CircuitMode;
  resistance: number; // Ohms (0-10000)
  inductance: number; // Millihenries (0-500)
  capacitance: number; // Microfarads (0-100)
  voltage: number; // Volts (1-240)
  frequency: number; // Hertz (1-10000)
}

export interface CircuitMetrics {
  inductive_reactance: number;
  capacitive_reactance: number;
  total_reactance: number;
  impedance: number;
  current: number;
  phase_angle: number;
  phase_angle_degrees: number;
  power_factor: number;
  real_power: number;
  reactive_power: number;
  apparent_power: number;
  resonant_frequency: number;
  quality_factor: number;
}

export interface PhasorData {
  voltage_real: number;
  voltage_imag: number;
  current_real: number;
  current_imag: number;
  impedance_real: number;
  impedance_imag: number;
}

export interface WaveformPoint {
  time: number;
  voltage: number;
  current: number;
}
