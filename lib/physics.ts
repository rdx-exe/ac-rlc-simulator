import { CircuitState, CircuitMetrics, PhasorData, WaveformPoint, CircuitMode } from './types';

const PI = Math.PI;
const TWO_PI = 2 * PI;

/**
 * Calculate inductive reactance: XL = 2πfL
 */
export function calculateInductiveReactance(frequency: number, inductance: number): number {
  // inductance is in mH, convert to H
  return TWO_PI * frequency * (inductance / 1000);
}

/**
 * Calculate capacitive reactance: XC = 1/(2πfC)
 */
export function calculateCapacitiveReactance(frequency: number, capacitance: number): number {
  // capacitance is in µF, convert to F
  if (frequency === 0 || capacitance === 0) return 0;
  return 1 / (TWO_PI * frequency * (capacitance / 1_000_000));
}

/**
 * Calculate total reactance: X = XL - XC
 */
export function calculateTotalReactance(xl: number, xc: number): number {
  return xl - xc;
}

/**
 * Calculate impedance: Z = sqrt(R² + X²)
 */
export function calculateImpedance(resistance: number, reactance: number): number {
  return Math.sqrt(resistance ** 2 + reactance ** 2);
}

/**
 * Calculate current: I = V/Z
 */
export function calculateCurrent(voltage: number, impedance: number): number {
  if (impedance === 0) return 0;
  return voltage / impedance;
}

/**
 * Calculate phase angle in radians: φ = arctan(X/R)
 */
export function calculatePhaseAngle(reactance: number, resistance: number): number {
  if (resistance === 0) {
    return reactance > 0 ? PI / 2 : -PI / 2;
  }
  return Math.atan(reactance / resistance);
}

/**
 * Convert radians to degrees
 */
export function radiansToDegrees(radians: number): number {
  return (radians * 180) / PI;
}

/**
 * Calculate power factor: cos(φ)
 */
export function calculatePowerFactor(phaseAngle: number): number {
  return Math.cos(phaseAngle);
}

/**
 * Calculate real power: P = VI * cos(φ)
 */
export function calculateRealPower(voltage: number, current: number, phaseAngle: number): number {
  return voltage * current * Math.cos(phaseAngle);
}

/**
 * Calculate reactive power: Q = VI * sin(φ)
 */
export function calculateReactivePower(voltage: number, current: number, phaseAngle: number): number {
  return voltage * current * Math.sin(phaseAngle);
}

/**
 * Calculate apparent power: S = VI
 */
export function calculateApparentPower(voltage: number, current: number): number {
  return voltage * current;
}

/**
 * Calculate resonant frequency: f₀ = 1/(2π√(LC))
 */
export function calculateResonantFrequency(inductance: number, capacitance: number): number {
  // L in mH, C in µF
  const L = inductance / 1000;
  const C = capacitance / 1_000_000;
  if (L === 0 || C === 0) return 0;
  return 1 / (TWO_PI * Math.sqrt(L * C));
}

/**
 * Calculate quality factor: Q = (1/R) * sqrt(L/C)
 */
export function calculateQualityFactor(resistance: number, inductance: number, capacitance: number): number {
  if (resistance === 0) return 0;
  const L = inductance / 1000;
  const C = capacitance / 1_000_000;
  if (L === 0 || C === 0) return 0;
  return (1 / resistance) * Math.sqrt(L / C);
}

/**
 * Get effective reactance based on circuit mode
 */
function getEffectiveReactance(state: CircuitState): number {
  switch (state.mode) {
    case 'R':
      return 0;
    case 'L':
      return calculateInductiveReactance(state.frequency, state.inductance);
    case 'C':
      return -calculateCapacitiveReactance(state.frequency, state.capacitance);
    case 'RL':
      return calculateInductiveReactance(state.frequency, state.inductance);
    case 'RC':
      return -calculateCapacitiveReactance(state.frequency, state.capacitance);
    case 'RLC':
      const xl = calculateInductiveReactance(state.frequency, state.inductance);
      const xc = calculateCapacitiveReactance(state.frequency, state.capacitance);
      return calculateTotalReactance(xl, xc);
  }
}

/**
 * Calculate all circuit metrics
 */
export function calculateMetrics(state: CircuitState): CircuitMetrics {
  // Determine which reactances to calculate based on mode
  const shouldCalcXL = state.mode === 'L' || state.mode === 'RL' || state.mode === 'RLC';
  const shouldCalcXC = state.mode === 'C' || state.mode === 'RC' || state.mode === 'RLC';

  const xl = shouldCalcXL ? calculateInductiveReactance(state.frequency, state.inductance) : 0;
  const xc = shouldCalcXC ? calculateCapacitiveReactance(state.frequency, state.capacitance) : 0;
  
  // Calculate net reactance
  let x = 0;
  if (state.mode === 'RLC') {
    x = calculateTotalReactance(xl, xc);
  } else if (state.mode === 'L' || state.mode === 'RL') {
    x = xl;
  } else if (state.mode === 'C' || state.mode === 'RC') {
    x = -xc;
  }

  const z = calculateImpedance(state.resistance, x);
  const i = calculateCurrent(state.voltage, z);
  const phi = calculatePhaseAngle(x, state.resistance);
  const pf = calculatePowerFactor(phi);
  const p = calculateRealPower(state.voltage, i, phi);
  const q = calculateReactivePower(state.voltage, i, phi);
  const s = calculateApparentPower(state.voltage, i);
  const f0 = (state.mode === 'RLC' && state.inductance > 0 && state.capacitance > 0) 
    ? calculateResonantFrequency(state.inductance, state.capacitance) 
    : 0;
  const q_factor = (state.mode === 'RLC' && state.resistance > 0 && state.inductance > 0 && state.capacitance > 0)
    ? calculateQualityFactor(state.resistance, state.inductance, state.capacitance)
    : 0;

  return {
    inductive_reactance: xl,
    capacitive_reactance: xc,
    total_reactance: x,
    impedance: z,
    current: i,
    phase_angle: phi,
    phase_angle_degrees: radiansToDegrees(phi),
    power_factor: pf,
    real_power: p,
    reactive_power: q,
    apparent_power: s,
    resonant_frequency: f0,
    quality_factor: q_factor,
  };
}

/**
 * Generate phasor data for visualization
 */
export function generatePhasorData(state: CircuitState, metrics: CircuitMetrics): PhasorData {
  const phi = metrics.phase_angle;
  const voltage = state.voltage;
  const current = metrics.current;
  const impedance = metrics.impedance;

  return {
    voltage_real: voltage,
    voltage_imag: 0,
    current_real: current * Math.cos(phi),
    current_imag: current * Math.sin(phi),
    impedance_real: metrics.impedance * Math.cos(phi),
    impedance_imag: metrics.impedance * Math.sin(phi),
  };
}

/**
 * Generate waveform data points
 */
export function generateWaveformData(state: CircuitState, metrics: CircuitMetrics, points: number = 200): WaveformPoint[] {
  const data: WaveformPoint[] = [];
  const period = 1 / state.frequency;
  const phi = metrics.phase_angle;

  for (let i = 0; i < points; i++) {
    const t = (i / points) * period;
    const angle = TWO_PI * state.frequency * t;

    const voltage = state.voltage * Math.sin(angle);
    const current = metrics.current * Math.sin(angle - phi);

    data.push({
      time: t * 1000, // Convert to milliseconds for display
      voltage,
      current,
    });
  }

  return data;
}

/**
 * Generate frequency sweep data for resonance analysis
 */
export function generateFrequencySweepData(state: CircuitState, points: number = 100) {
  const data: Array<{
    frequency: number;
    impedance: number;
    current: number;
  }> = [];

  const minFreq = Math.max(1, state.frequency / 10);
  const maxFreq = state.frequency * 10;
  const step = (maxFreq - minFreq) / points;

  for (let freq = minFreq; freq <= maxFreq; freq += step) {
    // Determine reactances based on mode
    const shouldCalcXL = state.mode === 'L' || state.mode === 'RL' || state.mode === 'RLC';
    const shouldCalcXC = state.mode === 'C' || state.mode === 'RC' || state.mode === 'RLC';

    const xl = shouldCalcXL ? calculateInductiveReactance(freq, state.inductance) : 0;
    const xc = shouldCalcXC ? calculateCapacitiveReactance(freq, state.capacitance) : 0;
    
    let x = 0;
    if (state.mode === 'RLC') {
      x = calculateTotalReactance(xl, xc);
    } else if (state.mode === 'L' || state.mode === 'RL') {
      x = xl;
    } else if (state.mode === 'C' || state.mode === 'RC') {
      x = -xc;
    }

    const z = calculateImpedance(state.resistance, x);
    const i = calculateCurrent(state.voltage, z);

    data.push({
      frequency: Math.round(freq),
      impedance: Math.round(z * 100) / 100,
      current: Math.round(i * 1000) / 1000,
    });
  }

  return data;
}
