import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

interface ChartProps {
  data: {
    date: string | null | undefined
    activeUsers: number
  }[]
}

const visitorChart = ({ data }: ChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{
          right: 50,
        }}
      >
        <XAxis dataKey="date" scale="point" />
        <YAxis />
        <Line type="monotone" dataKey="activeUsers" stroke="#3c10cc" />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default visitorChart