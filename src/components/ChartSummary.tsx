'use client'
import { useExpenseStore } from '@/store/useExpenseStore'
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts'

const COLORS = [
  '#4F46E5', // indigo
  '#E11D48', // red
  '#047857', // emerald
  '#F59E0B', // amber
  '#0EA5E9', // sky
  '#8B5CF6', // violet
  '#F43F5E', // rose
]

export default function ChartSummary() {
  const { expenses } = useExpenseStore()

  const grouped = expenses.reduce<Record<string, number>>((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount
    return acc
  }, {})

  const data = Object.entries(grouped).map(([category, total]) => ({
    name: category,
    value: total,
  }))

  if (!data.length) {
    return (
      <div className="py-8 text-center text-gray-500">
        No hay datos para mostrar.
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius="80%"
          innerRadius="40%"
          paddingAngle={4}
          label={({ name, percent }) =>
            `${name}: ${(percent! * 100).toFixed(0)}%`
          }
        >
          {data.map((_, idx) => (
            <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value: number) => `$${value.toFixed(2)}`}
          contentStyle={{ borderRadius: '0.5rem' }}
        />
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
    </ResponsiveContainer>
  )
}
