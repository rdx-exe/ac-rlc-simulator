/**
 * Resonance Calculations
 * Functions for detecting resonance and calculating resonant frequency
 */

import { TWO_PI, safeDivide } from "./constants";

/**
 * Calculate resonant frequency of RLC circuit
 * f₀ = 1 / (2π√(LC))
 * @param L - Inductance in Henry
 * @param C - Capacitance in Farad
 * @returns Resonant frequency in Hz
 */
export function calculateResonantFrequency(L: number, C: number): number | null {
  if (L <= 0 || C <= 0) return null;
  
  const lcProduct = L * C;
  if (lcProduct <= 0) return null;
  
  const sqrtLC = Math.sqrt(lcProduct);
  const f0 = safeDivide(1, TWO_PI * sqrtLC, 0);
  
  return f0 && f0 > 0 ? f0 : null;
}

/**
 * Check if circuit is at resonance
 * Resonance occurs when XL ≈ XC (net reactance ≈ 0)
 * @param XL - Inductive reactance in Ohm
 * @param XC - Capacitive reactance in Ohm
 * @param tolerance - Tolerance value in Ohm (default: 0.01)
 * @returns true if circuit is at resonance
 */
export function isResonance(XL: number, XC: number, tolerance: number = 0.01): boolean {
  if (isNaN(XL) || isNaN(XC) || tolerance < 0) return false;
  return Math.abs(XL - XC) <= tolerance;
}

/**
 * Get resonance type
 * @param X - Net reactance (XL - XC)
 * @returns "Inductive", "Capacitive", or "Resonant"
 */
export function getResonanceType(X: number): "Inductive" | "Capacitive" | "Resonant" {
  const tolerance = 0.5;
  if (Math.abs(X) < tolerance) return "Resonant";
  return X > 0 ? "Inductive" : "Capacitive";
}

/**
 * Get circuit type description
 * @param X - Net reactance (XL - XC)
 * @param isResonant - Whether circuit is at resonance
 * @returns Circuit type classification
 */
export function getCircuitType(
  X: number,
  isResonant: boolean
): "Inductive" | "Capacitive" | "Resonant" | "Resistive" {
  if (isResonant) return "Resonant";
  if (Math.abs(X) < 0.1) return "Resistive";
  return X > 0 ? "Inductive" : "Capacitive";
}
