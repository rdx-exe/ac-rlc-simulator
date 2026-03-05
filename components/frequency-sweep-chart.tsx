'use client';

import { Card } from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface FrequencySweepChartProps {
  data: Array<{
    frequency: number;
    impedance: number;
    current: number;
  }>;
}

export function FrequencySweepChart({ data }: FrequencySweepChartProps) {
  return (
    <Card className="p-4 md:p-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700 shadow-2xl">
      <h3 className="text-base md:text-lg font-bold text-white mb-3 md:mb-4">Frequency Response</h3>

      <div className="w-full h-72 md:h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} key={`freq-${data.length}`}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgb(51, 65, 85)"
            opacity={0.5}
          />
          <XAxis
            dataKey="frequency"
            scale="logarithmic"
            stroke="rgb(100, 116, 139)"
            style={{ fontSize: '12px' }}
            label={{
              value: 'Frequency (Hz) - Logarithmic Scale',
              position: 'insideBottomRight',
              offset: -5,
              fill: 'rgb(100, 116, 139)',
            }}
          />
          <YAxis
            yAxisId="left"
            stroke="rgb(59, 130, 246)"
            style={{ fontSize: '12px' }}
            label={{
              value: 'Impedance (Ω)',
              angle: -90,
              position: 'insideLeft',
              fill: 'rgb(59, 130, 246)',
            }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="rgb(168, 85, 247)"
            style={{ fontSize: '12px' }}
            label={{
              value: 'Current (A)',
              angle: 90,
              position: 'insideRight',
              fill: 'rgb(168, 85, 247)',
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgb(15, 23, 42)',
              border: '1px solid rgb(71, 85, 105)',
              borderRadius: '8px',
              color: 'rgb(226, 232, 240)',
            }}
            labelStyle={{ color: 'rgb(226, 232, 240)' }}
          />
          <Legend
            wrapperStyle={{ paddingTop: '16px' }}
            iconType="line"
            textStyle={{ color: 'rgb(148, 163, 184)' }}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="impedance"
            stroke="rgb(59, 130, 246)"
            dot={false}
            strokeWidth={2.5}
            name="Impedance (Ω)"
            isAnimationActive={false}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="current"
            stroke="rgb(168, 85, 247)"
            dot={false}
            strokeWidth={2.5}
            name="Current (A)"
            isAnimationActive={false}
          />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p className="text-xs text-slate-400 mt-4">
        Frequency response shows how impedance and current vary across a frequency range.
        Resonance occurs where impedance is minimum and current is maximum.
      </p>
    </Card>
  );
}
