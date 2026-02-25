/**
 * Waveform Generation
 * Functions for generating time-domain voltage and current waveforms
 */

import { TWO_PI } from "./constants";

interface WaveformResult {
  time: number[];
  voltageWave: number[];
  currentWave: number[];
}

/**
 * Generate voltage and current waveforms
 * v(t) = V_peak × sin(ωt)
 * i(t) = I_peak × sin(ωt - φ)
 * @param V - Peak voltage in Volt
 * @param I - Peak current in Ampere
 * @param phi - Phase angle in radians (positive = current lags)
 * @param f - Frequency in Hz
 * @param duration - Total duration to display in seconds
 * @param samples - Number of samples to generate
 * @returns Object containing time array and waveform arrays
 */
export function generateWaveforms(
  V: number,
  I: number,
  phi: number,
  f: number,
  duration: number,
  samples: number
): WaveformResult {
  if (V < 0 || I < 0 || duration <= 0 || samples < 2 || f <= 0) {
    return { time: [], voltageWave: [], currentWave: [] };
  }

  const time: number[] = [];
  const voltageWave: number[] = [];
  const currentWave: number[] = [];

  const omega = TWO_PI * f;
  const dt = duration / (samples - 1);

  for (let idx = 0; idx < samples; idx++) {
    const t = idx * dt;
    const omegaT = omega * t;

    // Voltage: v(t) = V × sin(ωt)
    const v = V * Math.sin(omegaT);

    // Current: i(t) = I × sin(ωt - φ)
    const current = I * Math.sin(omegaT - phi);

    time.push(t);
    voltageWave.push(v);
    currentWave.push(current);
  }

  return { time, voltageWave, currentWave };
}

/**
 * Generate voltage waveform only
 * @param V - Peak voltage in Volt
 * @param f - Frequency in Hz
 * @param duration - Total duration in seconds
 * @param samples - Number of samples to generate
 * @returns Object containing time array and voltage waveform array
 */
export function generateVoltageWaveform(
  V: number,
  f: number,
  duration: number,
  samples: number
): { time: number[]; voltage: number[] } {
  if (V < 0 || duration <= 0 || samples < 2 || f <= 0) {
    return { time: [], voltage: [] };
  }

  const time: number[] = [];
  const voltage: number[] = [];

  const omega = TWO_PI * f;
  const dt = duration / (samples - 1);

  for (let idx = 0; idx < samples; idx++) {
    const t = idx * dt;
    const v = V * Math.sin(omega * t);

    time.push(t);
    voltage.push(v);
  }

  return { time, voltage };
}

/**
 * Generate current waveform only
 * @param I - Peak current in Ampere
 * @param f - Frequency in Hz
 * @param phi - Phase angle in radians
 * @param duration - Total duration in seconds
 * @param samples - Number of samples to generate
 * @returns Object containing time array and current waveform array
 */
export function generateCurrentWaveform(
  I: number,
  f: number,
  phi: number,
  duration: number,
  samples: number
): { time: number[]; current: number[] } {
  if (I < 0 || duration <= 0 || samples < 2 || f <= 0) {
    return { time: [], current: [] };
  }

  const time: number[] = [];
  const current: number[] = [];

  const omega = TWO_PI * f;
  const dt = duration / (samples - 1);

  for (let idx = 0; idx < samples; idx++) {
    const t = idx * dt;
    const i_t = I * Math.sin(omega * t - phi);

    time.push(t);
    current.push(i_t);
  }

  return { time, current };
}
