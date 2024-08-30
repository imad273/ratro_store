import React from 'react'
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';

type devicesProps = {
  name: string | null | undefined
  value: number
}

interface ChartProps {
  data: devicesProps[] | undefined
}

const devicesPieChart = ({ data }: ChartProps) => {
  const COLORS = {
    desktop: '#F9CC5B',
    phones: '#F56B4A',
    others: '#F3F3F3',
  };

  return (
    <ResponsiveContainer width="100%" height={225}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          innerRadius={60} // Add this line to create the donut effect
          fill="#8884d8"
          dataKey="value"
          stroke="none"
          paddingAngle={5}
          cornerRadius={5}
        >
          {data?.map((entry, index) => (
            <Cell key={`cell-${index}`} style={{ outline: 'none' }} fill={entry.name === "desktop" ? COLORS.desktop : entry.name === "mobile" ? COLORS.phones : COLORS.others} />
          ))}
          <Tooltip />
        </Pie>

      </PieChart>
    </ResponsiveContainer>
  )
}

export default devicesPieChart