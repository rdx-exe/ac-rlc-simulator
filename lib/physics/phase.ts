/**
 * Phase Angle and Power Factor Calculations
 * Functions for phase relationships and power factor determination
 */

import { safeDivide, toDegrees } from "./constants";

/**
 * Calculate phase angle between voltage and current
 * φ = atan(X / R)
 * @param R - Resistance in Ohm
 * @param X - Reactance in Ohm (XL - XC)
 * @returns Phase angle in radians (positive = lagging, negative = leading)
 */
export function calculatePhaseAngle(R: number, X: number): number {
  if (R <= 0) {
    // When R = 0, phase is ±90°
    return X > 0 ? Math.PI / 2 : X < 0 ? -Math.PI / 2 : 0;
  }
  return Math.atan(safeDivide(X, R, 0));
}

/**
 * Calculate phase angle in degrees
 * @param R - Resistance in Ohm
 * @param X - Reactance in Ohm (XL - XC)
 * @returns Phase angle in degrees
 */
export function calculatePhaseAngleDegrees(R: number, X: number): number {
  const phaseRad = calculatePhaseAngle(R, X);
  return toDegrees(phaseRad);
}

/**
 * Calculate power factor
 * PF = cos(φ) = R / Z
 * @param R - Resistance in Ohm
 * @param X - Reactance in Ohm (XL - XC)
 * @returns Power factor (0 to 1)
 */
export function calculatePowerFactor(R: number, X: number): number {
  const phi = calculatePhaseAngle(R, X);
  const pf = Math.abs(Math.cos(phi));
  return isNaN(pf) || pf < 0 ? 0 : pf > 1 ? 1 : pf;
}
