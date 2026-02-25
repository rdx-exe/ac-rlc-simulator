/**
 * Physics Constants and Utility Functions
 * Core mathematical constants and conversion utilities
 */

export const TWO_PI = 2 * Math.PI;
export const PI = Math.PI;

/**
 * Convert degrees to radians
 * @param deg - Angle in degrees
 * @returns Angle in radians
 */
export function toRadians(deg: number): number {
  return (deg * PI) / 180;
}

/**
 * Convert radians to degrees
 * @param rad - Angle in radians
 * @returns Angle in degrees
 */
export function toDegrees(rad: number): number {
  return (rad * 180) / PI;
}

/**
 * Safe division to prevent Infinity or NaN
 * @param numerator - Dividend
 * @param denominator - Divisor
 * @param fallback - Value to return if division by zero
 * @returns Result of division or fallback value
 */
export function safeDivide(numerator: number, denominator: number, fallback: number = 0): number {
  return denominator === 0 ? fallback : numerator / denominator;
}
