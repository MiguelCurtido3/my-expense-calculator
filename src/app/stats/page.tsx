'use client'
import Link from 'next/link'
import { Home as HomeIcon } from 'lucide-react'
import { useMemo } from 'react'
import dynamic from 'next/dynamic'
import { useExpenseStore } from '@/store/useExpenseStore'

// Carga del gráfico solo en cliente para evitar SSR mismatch
const ChartSummary = dynamic(() => import('@/components/ChartSummary'), { ssr: false })

export default function StatsPage() {
  const { expenses } = useExpenseStore()

  // Cálculos estadísticos
  const totalGastos = useMemo(
    () => expenses.reduce((sum, e) => sum + e.amount, 0),
    [expenses]
  )
  const cantidadGastos = expenses.length
  const promedio = useMemo(
    () => (cantidadGastos ? totalGastos / cantidadGastos : 0),
    [totalGastos, cantidadGastos]
  )

  return (
    <main className="container mx-auto p-6 space-y-8">
       {/* Navegación de regreso */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-2"
        >
          <HomeIcon className="w-5 h-5 mr-1" />Inicio
        </Link>
      </div>

      {/* Header */}
      <header className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
          📊 Estadísticas de Gastos
        </h1>
        <p className="text-gray-600">
          Revisa tus métricas clave y el desglose por categoría.
        </p>
      </header>

      {/* Cards estadísticos */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-lg font-medium text-gray-700">Total Gastos</h2>
          <p className="mt-2 text-3xl font-bold text-red-600">
            ${totalGastos.toFixed(2)}
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-lg font-medium text-gray-700"># de Gastos</h2>
          <p className="mt-2 text-3xl font-bold text-gray-800">
            {cantidadGastos}
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-lg font-medium text-gray-700">Promedio</h2>
          <p className="mt-2 text-3xl font-bold text-green-600">
            ${promedio.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Gráfico de pastel */}
      <section className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          📈 Distribución por Categoría
        </h2>
        <div className="w-full h-80">
          <ChartSummary />
        </div>
      </section>
    </main>
  )
}