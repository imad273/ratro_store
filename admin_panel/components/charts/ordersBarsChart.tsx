import React from 'react'
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type barChartDataProps = {
  date: string
  orders: number
}

interface ChartProps {
  data: barChartDataProps[] | undefined
}

const ordersBarsChart = ({ data }: ChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{
          right: 50,
        }}
      >
        <XAxis dataKey="date" />
        <YAxis tickCount={1} />
        <Bar radius={[15, 15, 0, 0]} dataKey="orders" fill="#3c10cc" activeBar={<Rectangle fill="gold" stroke="purple" />} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default ordersBarsChart