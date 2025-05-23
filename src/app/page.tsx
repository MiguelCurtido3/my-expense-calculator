'use client'

import Link from 'next/link'
import { List as ListIcon, PieChart as PieChartIcon, ArrowRight as ArrowRightIcon } from 'lucide-react'

export default function Dashboard() {
  return (
    <main className="container mx-auto p-8">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
          Bienvenido a tu Calculadora de Gastos
        </h1>
        <p className="text-lg text-gray-600">
          Controla tu presupuesto, revisa tus gastos y obtén estadísticas al instante.
        </p>
      </header>

      {/* Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link
          href="/expenses"
          className="group block bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition"
        >
          <div className="flex items-center space-x-4">
            <ListIcon className="h-8 w-8 text-indigo-600 group-hover:text-indigo-800 transition" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 group-hover:text-gray-900 transition">
                Ver Gastos
              </h2>
              <p className="text-sm text-gray-500">
                Agrega, edita o elimina tus gastos individuales.
              </p>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <ArrowRightIcon className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition" />
          </div>
        </Link>

        <Link
          href="/stats"
          className="group block bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition"
        >
          <div className="flex items-center space-x-4">
            <PieChartIcon className="h-8 w-8 text-green-600 group-hover:text-green-800 transition" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 group-hover:text-gray-900 transition">
                Estadísticas
              </h2>
              <p className="text-sm text-gray-500">
                Visualiza gráficos y métricas clave de tus gastos.
              </p>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <ArrowRightIcon className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition" />
          </div>
        </Link>
      </div>
    </main>
  )
}
