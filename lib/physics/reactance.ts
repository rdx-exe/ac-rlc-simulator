/**
 * Reactance Calculations
 * Functions for calculating angular frequency and reactive components
 */

import { TWO_PI, safeDivide } from "./constants";

/**
 * Calculate angular frequency from frequency
 * ω = 2πf
 * @param f - Frequency in Hz
 * @returns Angular frequency in rad/s
 */
export function calculateAngularFrequency(f: number): number {
  if (f <= 0) return 0;
  return TWO_PI * f;
}

/**
 * Calculate inductive reactance
 * XL = ωL
 * @param L - Inductance in Henry
 * @param omega - Angular frequency in rad/s
 * @returns Inductive reactance in Ohm
 */
export function calculateInductiveReactance(L: number, omega: number): number {
  if (L <= 0 || omega <= 0) return 0;
  return omega * L;
}

/**
 * Calculate capacitive reactance
 * XC = 1 / (ωC)
 * @param C - Capacitance in Farad
 * @param omega - Angular frequency in rad/s
 * @returns Capacitive reactance in Ohm
 */
export function calculateCapacitiveReactance(C: number, omega: number): number {
  if (C <= 0 || omega <= 0) return 0;
  return safeDivide(1, omega * C, 0);
}

/**
 * Calculate net reactance
 * X = XL - XC
 * @param XL - Inductive reactance in Ohm
 * @param XC - Capacitive reactance in Ohm
 * @returns Net reactance in Ohm (positive = inductive, negative = capacitive)
 */
export function calculateNetReactance(XL: number, XC: number): number {
  return XL - XC;
}
