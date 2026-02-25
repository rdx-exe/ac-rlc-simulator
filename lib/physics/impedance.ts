/**
 * Impedance and Current Calculations
 * Functions for calculating total impedance and circuit current
 */

import { safeDivide } from "./constants";

/**
 * Calculate total impedance of AC circuit
 * Z = √(R² + X²)
 * @param R - Resistance in Ohm
 * @param X - Reactance in Ohm (net: XL - XC)
 * @returns Total impedance in Ohm
 */
export function calculateImpedance(R: number, X: number): number {
  if (R < 0 || isNaN(X)) return 0;
  const impedance = Math.sqrt(R * R + X * X);
  return isNaN(impedance) ? 0 : impedance;
}

/**
 * Calculate circuit current using Ohm's Law
 * I = V / Z
 * @param V - Voltage in Volt
 * @param Z - Total impedance in Ohm
 * @returns Current in Ampere
 */
export function calculateCurrent(V: number, Z: number): number {
  if (V < 0 || Z <= 0) return 0;
  return safeDivide(V, Z, 0);
}
