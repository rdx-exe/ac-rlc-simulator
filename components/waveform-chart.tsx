'use client';

import { WaveformPoint } from '@/lib/types';
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

interface WaveformChartProps {
  data: WaveformPoint[];
}

export function WaveformChart({ data }: WaveformChartProps) {
  return (
    <Card className="p-4 md:p-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700 shadow-2xl">
      <h3 className="text-base md:text-lg font-bold text-white mb-3 md:mb-4">Voltage & Current Waveforms</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <defs>
            <linearGradient id="colorVoltage" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="rgb(59, 130, 246)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="rgb(59, 130, 246)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="rgb(168, 85, 247)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="rgb(168, 85, 247)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgb(51, 65, 85)"
            opacity={0.5}
          />
          <XAxis
            dataKey="time"
            stroke="rgb(100, 116, 139)"
            style={{ fontSize: '12px' }}
            label={{ value: 'Time (ms)', position: 'insideBottomRight', offset: -5, fill: 'rgb(100, 116, 139)' }}
          />
          <YAxis
            stroke="rgb(100, 116, 139)"
            style={{ fontSize: '12px' }}
            label={{ value: 'Amplitude (V/A)', angle: -90, position: 'insideLeft', fill: 'rgb(100, 116, 139)' }}
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
            type="monotone"
            dataKey="voltage"
            stroke="rgb(59, 130, 246)"
            dot={false}
            strokeWidth={2.5}
            name="Voltage (V)"
            isAnimationActive={false}
          />
          <Line
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

      <p className="text-xs text-slate-400 mt-4">
        Voltage and current waveforms display the instantaneous values across one period at the operating frequency.
        The phase difference between them is determined by the circuit impedance.
      </p>
    </Card>
  );
}
