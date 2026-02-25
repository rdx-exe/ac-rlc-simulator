"use client";

import { useState, useMemo, useCallback } from "react";
import {
  calculateAngularFrequency,
  calculateInductiveReactance,
  calculateCapacitiveReactance,
  calculateNetReactance,
  calculateImpedance,
  calculateCurrent,
  calculatePhaseAngle,
  calculatePhaseAngleDegrees,
  calculatePowerFactor,
  calculateRealPower,
  calculateReactivePower,
  calculateApparentPower,
  calculateResonantFrequency,
  isResonance,
  getCircuitType,
  generateFrequencySweep,
  generateWaveforms,
} from "@/lib/physics";

/**
 * Circuit mode type
 */
type CircuitMode = "R" | "RL" | "RC" | "RLC";

/**
 * Frequency sweep data structure
 */
interface FrequencySweepData {
  frequencies: number[];
  impedances: number[];
  currents: number[];
}

/**
 * Waveform data structure
 */
interface WaveformData {
  time: number[];
  voltageWave: number[];
  currentWave: number[];
}

/**
 * Complete circuit state and computed values
 */
export interface CircuitState {
  // Input parameters
  R: number;
  L: number;
  C: number;
  V: number;
  f: number;
  mode: CircuitMode;

  // Setters for input parameters
  setR: (value: number) => void;
  setL: (value: number) => void;
  setC: (value: number) => void;
  setV: (value: number) => void;
  setF: (value: number) => void;
  setMode: (mode: CircuitMode) => void;

  // Computed AC values
  omega: number;
  XL: number | null;
  XC: number | null;
  X: number;
  Z: number;
  I: number;
  phi: number; // radians
  phiDeg: number; // degrees
  powerFactor: number;

  // Power values
  P: number; // Real power (W)
  Q: number; // Reactive power (VAR)
  S: number; // Apparent power (VA)

  // Resonance information
  isResonant: boolean;
  resonantFrequency: number | null;
  powerFactorType: "Lagging" | "Leading" | "Unity";
  circuitType: "Inductive" | "Capacitive" | "Resonant" | "Resistive";

  // Computed analysis data
  frequencySweepData: FrequencySweepData;
  waveformData: WaveformData;
}

/**
 * Custom hook for centralized AC circuit state and physics calculations
 *
 * Manages all input parameters and automatically computes all physics values
 * using useMemo for optimal performance.
 *
 * @returns Complete circuit state including inputs, setters, and computed values
 */
export function useCircuit(): CircuitState {
  // ============================================================
  // INPUT STATE
  // ============================================================

  const [R, setR] = useState<number>(10);
  const [L, setL] = useState<number>(0.1);
  const [C, setC] = useState<number>(0.0001);
  const [V, setV] = useState<number>(230);
  const [f, setF] = useState<number>(50);
  const [mode, setMode] = useState<CircuitMode>("RLC");

  // ============================================================
  // COMPUTED VALUES: ANGULAR FREQUENCY
  // ============================================================

  const omega = useMemo(() => {
    return calculateAngularFrequency(f);
  }, [f]);

  // ============================================================
  // COMPUTED VALUES: REACTANCES
  // ============================================================

  const XL = useMemo(() => {
    if (mode === "RL" || mode === "RLC") {
      return calculateInductiveReactance(L, omega);
    }
    return null;
  }, [mode, L, omega]);

  const XC = useMemo(() => {
    if (mode === "RC" || mode === "RLC") {
      return calculateCapacitiveReactance(C, omega);
    }
    return null;
  }, [mode, C, omega]);

  // ============================================================
  // COMPUTED VALUES: NET REACTANCE, IMPEDANCE, CURRENT
  // ============================================================

  const X = useMemo(() => {
    return calculateNetReactance(XL || 0, XC || 0);
  }, [XL, XC]);

  const Z = useMemo(() => {
    return calculateImpedance(R, X);
  }, [R, X]);

  const I = useMemo(() => {
    return calculateCurrent(V, Z);
  }, [V, Z]);

  // ============================================================
  // COMPUTED VALUES: PHASE ANGLE
  // ============================================================

  const phi = useMemo(() => {
    return calculatePhaseAngle(R, X);
  }, [R, X]);

  const phiDeg = useMemo(() => {
    return calculatePhaseAngleDegrees(R, X);
  }, [R, X]);

  // ============================================================
  // COMPUTED VALUES: POWER FACTOR
  // ============================================================

  const powerFactor = useMemo(() => {
    return calculatePowerFactor(R, X);
  }, [R, X]);

  const powerFactorType = useMemo(() => {
    if (Math.abs(phiDeg) < 1) return "Unity" as const;
    return phiDeg > 0 ? "Lagging" : "Leading";
  }, [phiDeg]);

  // ============================================================
  // COMPUTED VALUES: POWER (P, Q, S)
  // ============================================================

  const P = useMemo(() => {
    return calculateRealPower(V, I, phi);
  }, [V, I, phi]);

  const Q = useMemo(() => {
    return calculateReactivePower(V, I, phi);
  }, [V, I, phi]);

  const S = useMemo(() => {
    return calculateApparentPower(V, I);
  }, [V, I]);

  // ============================================================
  // COMPUTED VALUES: RESONANCE
  // ============================================================

  const isResonant = useMemo(() => {
    if (mode !== "RLC") return false;
    return isResonance(XL || 0, XC || 0, 0.5);
  }, [mode, XL, XC]);

  const resonantFrequency = useMemo(() => {
    if (mode !== "RLC") return null;
    return calculateResonantFrequency(L, C);
  }, [mode, L, C]);

  const circuitType = useMemo(() => {
    return getCircuitType(X, isResonant);
  }, [X, isResonant]);

  // ============================================================
  // COMPUTED VALUES: FREQUENCY SWEEP
  // ============================================================

  const frequencySweepData = useMemo(() => {
    return generateFrequencySweep(R, L, C, V, mode, 10, 500, 200);
  }, [R, L, C, V, mode]);

  // ============================================================
  // COMPUTED VALUES: WAVEFORM
  // ============================================================

  const waveformData = useMemo(() => {
    // Peak values from RMS voltage and current
    const V_peak = V * Math.sqrt(2);
    const I_peak = I * Math.sqrt(2);

    // Generate 2 cycles of waveform with 600 samples total
    const period = 1 / f;
    const duration = 2 * period;

    return generateWaveforms(V_peak, I_peak, phi, f, duration, 600);
  }, [V, I, phi, f]);

  // ============================================================
  // RETURN COMPLETE STATE
  // ============================================================

  return {
    // Input parameters
    R,
    L,
    C,
    V,
    f,
    mode,

    // Setters
    setR: useCallback((value: number) => setR(Math.max(0, value)), []),
    setL: useCallback((value: number) => setL(Math.max(0, value)), []),
    setC: useCallback((value: number) => setC(Math.max(0, value)), []),
    setV: useCallback((value: number) => setV(Math.max(0, value)), []),
    setF: useCallback((value: number) => setF(Math.max(0.1, value)), []),
    setMode: useCallback((newMode: CircuitMode) => setMode(newMode), []),

    // Computed AC values
    omega,
    XL,
    XC,
    X,
    Z,
    I,
    phi,
    phiDeg,
    powerFactor,

    // Power values
    P,
    Q,
    S,

    // Resonance information
    isResonant,
    resonantFrequency,
    powerFactorType,
    circuitType,

    // Analysis data
    frequencySweepData,
    waveformData,
  };
}
