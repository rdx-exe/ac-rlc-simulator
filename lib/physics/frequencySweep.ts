/**
 * Frequency Sweep Calculations
 * Generate frequency response data for impedance and current across frequency range
 */

import {
  calculateAngularFrequency,
  calculateInductiveReactance,
  calculateCapacitiveReactance,
  calculateNetReactance,
} from "./reactance";
import { calculateImpedance, calculateCurrent } from "./impedance";

interface FrequencySweepResult {
  frequencies: number[];
  impedances: number[];
  currents: number[];
}

/**
 * Generate frequency sweep data
 * Creates logarithmic frequency spacing and calculates Z and I at each frequency
 * @param R - Resistance in Ohm
 * @param L - Inductance in Henry (0 if not present)
 * @param C - Capacitance in Farad (0 if not present)
 * @param V - Applied voltage in Volt
 * @param mode - Circuit mode: "R", "RL", "RC", or "RLC"
 * @param fMin - Minimum frequency in Hz
 * @param fMax - Maximum frequency in Hz
 * @param points - Number of points in sweep
 * @returns Object containing frequency array, impedance array, and current array
 */
export function generateFrequencySweep(
  R: number,
  L: number,
  C: number,
  V: number,
  mode: "R" | "RL" | "RC" | "RLC",
  fMin: number,
  fMax: number,
  points: number
): FrequencySweepResult {
  if (fMin <= 0 || fMax <= 0 || points < 2 || V < 0 || R < 0) {
    return { frequencies: [], impedances: [], currents: [] };
  }

  if (fMin >= fMax) {
    return { frequencies: [], impedances: [], currents: [] };
  }

  const frequencies: number[] = [];
  const impedances: number[] = [];
  const currents: number[] = [];

  // Generate logarithmic frequency spacing
  const logMin = Math.log10(fMin);
  const logMax = Math.log10(fMax);
  const logStep = (logMax - logMin) / (points - 1);

  for (let i = 0; i < points; i++) {
    const f = Math.pow(10, logMin + i * logStep);
    const omega = calculateAngularFrequency(f);

    let XL = 0;
    let XC = 0;

    // Calculate reactances based on mode
    if (mode === "RL" || mode === "RLC") {
      XL = calculateInductiveReactance(L, omega);
    }

    if (mode === "RC" || mode === "RLC") {
      XC = calculateCapacitiveReactance(C, omega);
    }

    // Calculate net reactance
    const X = calculateNetReactance(XL, XC);

    // Calculate impedance and current
    const Z = calculateImpedance(R, X);
    const I = calculateCurrent(V, Z);

    frequencies.push(f);
    impedances.push(Z);
    currents.push(I);
  }

  return { frequencies, impedances, currents };
}
