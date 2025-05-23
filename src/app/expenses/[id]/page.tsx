// app/expenses/[id]/page.tsx
'use client'

import { useParams, useRouter } from 'next/navigation'
import { useExpenseStore } from '@/store/useExpenseStore'
import ExpenseForm from '@/components/ExpenseForm'

export default function ExpenseDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const expense = useExpenseStore(state =>
    state.expenses.find(e => e.id === id)
  )

  if (!expense) {
    return (
      <main className="max-w-2xl mx-auto p-6">
        <p className="text-red-600">Gasto no encontrado.</p>
        <button
          onClick={() => router.push('/expenses')}
          className="mt-4 btn-secondary"
        >
          Volver al listado
        </button>
      </main>
    )
  }

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">✏️ Editar Gasto</h1>

      {/* Reutilizamos el ExpenseForm pasando el gasto existente */}
      <ExpenseForm
        existing={expense}
        onDone={() => router.push('/expenses')}
      />
    </main>
  )
}
