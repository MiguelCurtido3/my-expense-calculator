'use client'
import { useState } from 'react'
import { Expense } from '@/types/Expense'
import { useExpenseStore } from '@/store/useExpenseStore'
import ExpenseForm from './ExpenseForm'

interface Props { expense: Expense }

export default function ExpenseItem({ expense }: Props) {
  const { removeExpense } = useExpenseStore()
  const [isEditing, setIsEditing] = useState(false)

  const handleDelete = () =>
    confirm('¿Seguro que quieres eliminar este gasto?') &&
    removeExpense(expense.id)

  if (isEditing) {
    return (
      <div className="bg-white shadow-lg rounded-lg p-6">
        <ExpenseForm existing={expense} onDone={() => setIsEditing(false)} />
      </div>
    )
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center hover:shadow-lg transition">
      <div className="flex-1">
        <p className="text-lg font-semibold text-gray-800">{expense.description}</p>
        <div className="mt-1 flex items-center space-x-2">
          <span className="text-sm text-gray-500">{expense.date}</span>
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
            {expense.category}
          </span>
        </div>
      </div>
      <div className="mt-4 sm:mt-0 flex items-center space-x-3">
        <span className="text-green-600 font-bold text-lg">
          ${expense.amount.toFixed(2)}
        </span>
        <button
          onClick={() => setIsEditing(true)}
          className="text-yellow-600 bg-yellow-100 hover:bg-yellow-200 px-3 py-1 rounded-md transition"
        >
          Editar
        </button>
        <button
          onClick={handleDelete}
          className="text-red-600 bg-red-100 hover:bg-red-200 px-3 py-1 rounded-md transition"
        >
          Borrar
        </button>
      </div>
    </div>
  )
}
