'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Home as HomeIcon } from 'lucide-react'
import ExpenseForm from '@/components/ExpenseForm'
import ExpenseList from '@/components/ExpenseList'

// ChartSummary cargado sólo en cliente para evitar SSR mismatch
const ChartSummary = dynamic(
  () => import('@/components/ChartSummary'),
  { ssr: false }
)

export default function ExpensesPage() {
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
          📊 Calculadora de Gastos
        </h1>
        <p className="text-gray-600">
          Controla tus gastos diarios y revisa tus estadísticas.
        </p>
      </header>

      {/* Formulario de nuevo gasto */}
      <section className="bg-white shadow-md rounded-lg p-6">
        <ExpenseForm onDone={() => { /* Opcional: scroll o toast */ }} />
      </section>

      {/* Lista y Gráfico en grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Listado de gastos ocupa 2/3 columnas */}
        <section className="lg:col-span-2 bg-white shadow-md rounded-lg p-6 max-h-[600px] overflow-y-auto">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            📝 Listado de Gastos
          </h2>
          <ExpenseList />
        </section>

        {/* Gráfico ocupa 1/3 columna */}
        <section className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            📈 Resumen por Categoría
          </h2>
          <ChartSummary />
        </section>
      </div>
    </main>
  )
}
