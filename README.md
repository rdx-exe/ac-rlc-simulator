# AC-RLC Circuit Simulator

An interactive, real-time simulator for AC (Alternating Current) circuits with comprehensive physics calculations and advanced visualizations. Explore the behavior of resistive, inductive, and capacitive circuit configurations with instant visual feedback.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Circuit Modes](#circuit-modes)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Key Components](#key-components)
- [Physics Engine](#physics-engine)
- [Visualizations](#visualizations)
- [Usage Guide](#usage-guide)
- [Building & Deployment](#building--deployment)
- [API Reference](#api-reference)

## 🎯 Overview

The AC-RLC Circuit Simulator is an educational tool designed to help students and engineers understand AC circuit behavior through interactive visualization. It calculates real-time electrical properties and displays them through multiple visualization formats including phasor diagrams, impedance triangles, waveforms, and frequency response curves.

Perfect for:
- Circuit Theory Education
- Electrical Engineering Students
- Circuit Design Analysis
- Interactive Learning and Experimentation
- Understanding AC Circuit Fundamentals

## ✨ Features

### Dynamic Circuit Configuration
- **6 Circuit Modes**: R (Pure Resistance), L (Pure Inductance), C (Pure Capacitance), RL, RC, and RLC (Full Circuit)
- **Adjustable Parameters**: Real-time modification of resistance, inductance, capacitance, voltage, and frequency
- **Input Validation**: All values are constrained to realistic ranges

### Comprehensive Calculations
- **Reactance Calculations**: Inductive (XL) and capacitive (XC) reactance
- **Impedance Analysis**: Total impedance magnitude and complex representation
- **Current Analysis**: Real-time current calculations
- **Power Analysis**: Real power (P), reactive power (Q), apparent power (S), and power factor
- **Phase Angle Computation**: Both radians and degrees
- **Resonant Frequency**: Calculation for RLC circuits
- **Quality Factor (Q)**: Circuit resonance characteristic

### Advanced Visualizations
- **Phasor Diagram**: Voltage and current phasor relationships in the complex plane
- **Impedance Triangle**: Visual representation of resistance, reactance, and impedance
- **Waveform Chart**: Time-domain voltage and current waveforms
- **Frequency Sweep Chart**: Impedance response across the frequency spectrum
- **Real-Time Updates**: All visualizations update instantly as you adjust parameters

### User Experience
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Dark Theme**: Professional dark interface with gradient styling
- **Intuitive Controls**: Sliders and input fields for easy parameter adjustment
- **Results Panel**: Clear display of all calculated electrical properties
- **Live Calculations**: Instant feedback on all changes

## 📊 Circuit Modes

### R (Pure Resistor)
- Only resistive element active
- No reactive components
- Phase angle: 0°
- Current in phase with voltage

### L (Pure Inductor)
- Only inductive element active
- Reactance: XL = 2πfL
- Phase angle: +90° (current lags voltage)
- Energy stored in magnetic field

### C (Pure Capacitor)
- Only capacitive element active
- Reactance: XC = 1/(2πfC)
- Phase angle: -90° (current leads voltage)
- Energy stored in electric field

### RL (Resistor + Inductor)
- Series combination of R and L
- Total impedance: Z = √(R² + XL²)
- Phase angle between 0° and +90°

### RC (Resistor + Capacitor)
- Series combination of R and C
- Total impedance: Z = √(R² + XC²)
- Phase angle between -90° and 0°

### RLC (Full Circuit)
- All three elements in series
- Resonant frequency: f₀ = 1/(2π√(LC))
- Can operate inductive or capacitive depending on frequency
- Quality factor: Q = (1/R)√(L/C)

## 🛠 Technology Stack

### Frontend Framework
- **Next.js 16.1.6**: React framework with server-side rendering
- **React 19**: UI component library
- **TypeScript**: Type-safe development

### UI & Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Unstyled, accessible component primitives
- **Lucide React**: Icon library
- **CVA (Class Variance Authority)**: Component variant patterns

### Visualization
- **Recharts**: Composable charting library for React
- **Custom Canvas Graphics**: SVG-based phasor and impedance diagrams

### Form & State Management
- **React Hook Form**: Efficient form state management
- **@hookform/resolvers**: Validation resolvers
- **Zod**: TypeScript-first schema validation

### Additional Libraries
- **Next Themes**: Dark mode support
- **Sonner**: Toast notifications
- **Date-fns**: Date utilities
- **Embla Carousel**: Carousel component
- **Vercel Analytics**: Performance monitoring

## 📦 Installation

### Prerequisites
- **Node.js**: 18.x or higher
- **npm/pnpm**: Package manager

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/rlc-circuit-simulator.git
   cd rlc-circuit-simulator
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:3000`
   - The application will automatically reload on file changes

## 🚀 Getting Started

### Running the Development Server
```bash
npm run dev
```
The simulator will be available at `http://localhost:3000` with hot-reload enabled.

### Building for Production
```bash
npm run build
npm run start
```

### Linting
```bash
npm run lint
```

## 📁 Project Structure

```
rlc-circuit-simulator/
├── app/                          # Next.js app directory
│   ├── layout.tsx               # Root layout component
│   ├── page.tsx                 # Home page
│   └── globals.css              # Global styles
│
├── components/                   # React components
│   ├── circuit-dashboard.tsx    # Main dashboard component
│   ├── input-panel.tsx          # Circuit parameter inputs
│   ├── results-panel.tsx        # Calculated metrics display
│   ├── phasor-diagram.tsx       # Phasor visualization
│   ├── impedance-triangle.tsx   # Impedance triangle diagram
│   ├── waveform-chart.tsx       # Time-domain waveform chart
│   ├── frequency-sweep-chart.tsx # Frequency response chart
│   ├── theme-provider.tsx       # Theme configuration
│   └── ui/                      # Radix UI component library
│       ├── button.tsx
│       ├── slider.tsx
│       ├── select.tsx
│       ├── card.tsx
│       └── ... (40+ UI components)
│
├── lib/                          # Utility and physics calculations
│   ├── physics.ts               # Physics engine and calculations
│   ├── types.ts                 # TypeScript type definitions
│   └── utils.ts                 # Helper utilities
│
├── hooks/                        # Custom React hooks
│   ├── use-mobile.ts            # Responsive design hook
│   └── use-toast.ts             # Toast notification hook
│
├── public/                       # Static assets
├── styles/                       # Global CSS files
│
├── package.json                  # Project dependencies
├── tsconfig.json                 # TypeScript configuration
├── next.config.mjs              # Next.js configuration
└── postcss.config.mjs           # PostCSS configuration
```

## 🧩 Key Components

### CircuitDashboard
The main container component that orchestrates the entire simulation. Manages state, calculations, and layout.
- Maintains circuit state (R, L, C, V, f, mode)
- Triggers physics calculations
- Layouts all child components responsively

### InputPanel
Interactive control panel for adjusting circuit parameters.
- Dropdowns for circuit mode selection
- Sliders for R, L, C adjustments (with validation)
- Input fields for voltage and frequency
- Real-time state updates

### ResultsPanel
Displays calculated electrical properties in a tabular format.
- Reactances (XL, XC, X)
- Impedance (magnitude and complex form)
- Current
- Phase angle (degrees and radians)
- Power factors and power values

### PhasorDiagram
SVG-based visualization of phasor relationships.
- Voltage phasor
- Current phasor
- Impedance phasor
- Complex plane representation

### ImpedanceTriangle
Right-triangle visualization of impedance components.
- Resistance (R) on horizontal axis
- Reactance (X) on vertical axis
- Impedance (Z) as hypotenuse
- Phase angle annotation

### WaveformChart
Time-domain visualization using Recharts.
- Voltage waveform
- Current waveform
- Multiple cycles displayed
- Real-time updates

### FrequencySweepChart
Frequency response analysis using Recharts.
- Impedance vs. Frequency curve
- Resonant frequency marking
- Log or linear frequency scale
- Interactive tooltips

## ⚙️ Physics Engine

The physics engine (`lib/physics.ts`) provides the core calculations using fundamental AC circuit theory.

### Core Formulas

**Inductive Reactance**
```
XL = 2πfL
```
- f: frequency (Hz)
- L: inductance (H)

**Capacitive Reactance**
```
XC = 1/(2πfC)
```
- C: capacitance (F)

**Total Reactance**
```
X = XL - XC
```

**Impedance**
```
Z = √(R² + X²)
```
- R: resistance (Ω)

**Current**
```
I = V/Z
```
- V: voltage (V)

**Phase Angle**
```
φ = arctan(X/R)
```

**Power Factor**
```
PF = cos(φ)
```

**Real Power**
```
P = VI·cos(φ) (Watts)
```

**Reactive Power**
```
Q = VI·sin(φ) (VAR)
```

**Apparent Power**
```
S = VI (VA)
```

**Resonant Frequency (RLC)**
```
f₀ = 1/(2π√(LC))
```

**Quality Factor**
```
Q = (1/R)·√(L/C)
```

### Key Functions

#### calculateMetrics(state: CircuitState)
Calculates all electrical properties based on current circuit state.

**Parameters:**
- `state`: Circuit configuration with R, L, C, V, f, and mode

**Returns:**
- `CircuitMetrics`: Object containing all calculated electrical properties

#### generatePhasorData(state, metrics)
Generates phasor coordinates for visualization.

**Returns:**
- `PhasorData`: Complex coordinates for voltage, current, and impedance

#### generateWaveformData(state, metrics)
Generates time-domain waveform points.

**Returns:**
- `WaveformPoint[]`: Array of time, voltage, and current samples

#### generateFrequencySweepData(state)
Generates frequency response data across a frequency range.

**Returns:**
- Impedance vs. frequency array with resonant frequency

## 📈 Visualizations

### Phasor Diagram
- **Type**: Vector diagram in complex plane
- **Axes**: Real and Imaginary components
- **Data**: Voltage, Current, Impedance phasors
- **Update**: Real-time as parameters change
- **Use Cases**: Understanding phase relationships, power factor

### Impedance Triangle
- **Type**: Right triangle diagram
- **Components**: Resistance, Reactance, Impedance
- **Features**: Phase angle annotation, color-coded sides
- **Update**: Real-time
- **Use Cases**: Visualizing impedance composition

### Waveform Chart
- **Type**: Line chart (multiple series)
- **Data**: Voltage and current vs. time
- **Duration**: Multiple AC cycles
- **Features**: Synchronized plots, amplitude reference lines
- **Update**: Real-time
- **Use Cases**: Understanding instantaneous values, signal shape

### Frequency Response Chart
- **Type**: Line chart
- **Data**: Impedance vs. frequency
- **Range**: Typically 1 Hz to 10,000 Hz
- **Features**: Resonant frequency marking, interactive tooltips
- **Update**: Real-time
- **Use Cases**: Resonance analysis, frequency response characteristics

## 📖 Usage Guide

### Basic Workflow

1. **Select Circuit Mode**
   - Use the mode dropdown in the Input Panel
   - Choose from: R, L, C, RL, RC, or RLC

2. **Adjust Parameters**
   - Use sliders for R, L, C adjustments
   - Set voltage and frequency with input fields
   - All parameters update calculations in real-time

3. **Observe Results**
   - Check Results Panel for calculated values
   - Review phasor relationships in Phasor Diagram
   - Analyze impedance composition in Impedance Triangle
   - Examine waveforms in Waveform Chart
   - Study frequency response in Frequency Sweep Chart

4. **Experiment**
   - Vary frequency to observe circuit behavior changes
   - Adjust component values to change impedance
   - Study resonance in RLC circuits

### Parameter Ranges

- **Resistance (R)**: 0 - 10,000 Ω
- **Inductance (L)**: 0 - 500 mH
- **Capacitance (C)**: 0 - 100 µF
- **Voltage (V)**: 1 - 240 V
- **Frequency (f)**: 1 - 10,000 Hz

### Educational Scenarios

**Understanding Phase Angle**
1. Switch to RL mode
2. Increase frequency and observe +90° approach
3. Switch to RC mode and observe -90° behavior

**Resonance in RLC**
1. Select RLC mode
2. Use frequency sweep to find resonant point
3. Observe impedance minimum at resonance

**Power Factor**
1. Experiment with different circuit modes
2. Observe power factor changes with frequency
3. Compare real power vs. apparent power

## 🏗️ Building & Deployment

### Development Build
```bash
npm run dev
```
- Runs with hot-reload
- Includes source maps for debugging
- Available at `http://localhost:3000`

### Production Build
```bash
npm run build
npm run start
```
- Optimized and minified output
- Production-ready application
- Better performance

### Environment Variables
Create a `.env.local` file if needed for API keys or configuration:
```
NEXT_PUBLIC_API_URL=your_api_url
```

### Deployment Options

**Vercel (Recommended)**
```bash
npm install -g vercel
vercel
```

**Docker**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

**Traditional Server**
1. Build: `npm run build`
2. Copy `.next` folder and `package.json` to server
3. Install: `npm ci --production`
4. Start: `npm run start`

## 📚 API Reference

### Types

#### CircuitMode
```typescript
type CircuitMode = 'R' | 'L' | 'C' | 'RL' | 'RC' | 'RLC'
```
Specifies the active circuit configuration.

#### CircuitState
```typescript
interface CircuitState {
  mode: CircuitMode;
  resistance: number;        // Ohms
  inductance: number;        // Millihenries
  capacitance: number;       // Microfarads
  voltage: number;           // Volts
  frequency: number;         // Hertz
}
```
Complete circuit configuration.

#### CircuitMetrics
```typescript
interface CircuitMetrics {
  inductive_reactance: number;
  capacitive_reactance: number;
  total_reactance: number;
  impedance: number;
  current: number;
  phase_angle: number;
  phase_angle_degrees: number;
  power_factor: number;
  real_power: number;
  reactive_power: number;
  apparent_power: number;
  resonant_frequency: number;
  quality_factor: number;
}
```
All calculated electrical properties.

#### PhasorData
```typescript
interface PhasorData {
  voltage_real: number;
  voltage_imag: number;
  current_real: number;
  current_imag: number;
  impedance_real: number;
  impedance_imag: number;
}
```
Complex plane coordinates for phasor visualization.

#### WaveformPoint
```typescript
interface WaveformPoint {
  time: number;
  voltage: number;
  current: number;
}
```
Single time-domain sample point.

### Physics Functions

All functions are exported from `lib/physics.ts`:

- `calculateInductiveReactance(frequency, inductance): number`
- `calculateCapacitiveReactance(frequency, capacitance): number`
- `calculateTotalReactance(xl, xc): number`
- `calculateImpedance(resistance, reactance): number`
- `calculateCurrent(voltage, impedance): number`
- `calculatePhaseAngle(reactance, resistance): number`
- `calculatePowerFactor(phaseAngle): number`
- `calculateRealPower(voltage, current, phaseAngle): number`
- `calculateReactivePower(voltage, current, phaseAngle): number`
- `calculateApparentPower(voltage, current): number`
- `calculateResonantFrequency(inductance, capacitance): number`
- `calculateQualityFactor(resistance, inductance, capacitance): number`
- `calculateMetrics(state): CircuitMetrics`
- `generatePhasorData(state, metrics): PhasorData`
- `generateWaveformData(state, metrics): WaveformPoint[]`
- `generateFrequencySweepData(state): FrequencySweepData[]`

## 🎓 Educational Resources

### Concepts Covered
- AC circuit theory fundamentals
- Complex impedance analysis
- Phasor representations
- Power factor and power calculations
- Resonance phenomena
- Frequency response characteristics

### Learning Paths

**Beginner**
1. Start with R mode - understand pure resistance
2. Switch to L and C individually
3. Observe phase relationships
4. Progress to RL and RC combinations

**Intermediate**
1. Study RLC circuits
2. Explore resonance behavior
3. Analyze power factor relationships
4. Use frequency sweep for band analysis

**Advanced**
1. Calculate quality factor implications
2. Analyze frequency response curves
3. Design for specific impedance requirements
4. Study complex power relationships

## 🐛 Troubleshooting

### High Impedance Values
- Check that frequency is not too low
- Ensure capacitance is not extremely small
- Verify inductance values are reasonable

### Unexpected Phase Angles
- Confirm correct circuit mode is selected
- Check that reactance values are calculated correctly
- Remember: Phase leads with capacitance, lags with inductance

### Visualization Not Updating
- Ensure JavaScript is enabled
- Check browser console for errors
- Try refreshing the page
- Clear browser cache if needed

## 📝 License

This project is available for educational use. Modify and distribute as needed for learning purposes.

## 🤝 Contributing

Contributions are welcome! Areas for enhancement:
- Additional circuit topologies
- More visualization types
- Performance optimizations
- Mobile UI improvements
- Advanced analysis features

## 📧 Contact & Support

For questions, suggestions, or issues:
- Create an issue in the repository
- Review existing documentation
- Check physics calculations in `lib/physics.ts`

---

**Enjoy exploring AC circuit behavior with the RLC Circuit Simulator!**

Built with ❤️ by Ritam Das for electrical engineers and students learning circuit theory.
