import { CircuitDashboard } from '@/components/circuit-dashboard';

export const metadata = {
  title: 'AC-RLC Circuit Simulator',
  description: 'Interactive AC circuit simulator with real-time physics calculations and visualizations',
};

export default function Home() {
  return <CircuitDashboard />;
}
