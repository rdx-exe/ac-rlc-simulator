/**
 * Power Calculations
 * Functions for calculating real, reactive, and apparent power
 */

/**
 * Calculate real power (average power consumed)
 * P = V × I × cos(φ)
 * @param V - Voltage in Volt
 * @param I - Current in Ampere
 * @param phi - Phase angle in radians
 * @returns Real power in Watt
 */
export function calculateRealPower(V: number, I: number, phi: number): number {
  if (V < 0 || I < 0 || isNaN(phi)) return 0;
  const power = V * I * Math.cos(phi);
  return isNaN(power) ? 0 : power;
}

/**
 * Calculate reactive power
 * Q = V × I × sin(φ)
 * @param V - Voltage in Volt
 * @param I - Current in Ampere
 * @param phi - Phase angle in radians
 * @returns Reactive power in Volt-Ampere Reactive (VAR)
 */
export function calculateReactivePower(V: number, I: number, phi: number): number {
  if (V < 0 || I < 0 || isNaN(phi)) return 0;
  const power = V * I * Math.sin(phi);
  return isNaN(power) ? 0 : power;
}

/**
 * Calculate apparent power
 * S = V × I
 * @param V - Voltage in Volt
 * @param I - Current in Ampere
 * @returns Apparent power in Volt-Ampere (VA)
 */
export function calculateApparentPower(V: number, I: number): number {
  if (V < 0 || I < 0) return 0;
  return V * I;
}
