'use client'
import { useExpenseStore } from '@/store/useExpenseStore'
import ExpenseItem from './ExpenseItem'

export default function ExpenseList() {
  const { expenses } = useExpenseStore()
  return (
    <div className="mt-6 space-y-4">
      {expenses.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No hay gastos registrados.
        </div>
      ) : (
        expenses.map(expense => (
          <ExpenseItem key={expense.id} expense={expense} />
        ))
      )}
    </div>
  )
}
