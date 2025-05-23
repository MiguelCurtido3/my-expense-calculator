// components/ExpenseForm.tsx
'use client'
import { useState } from 'react'
import { Expense } from '@/types/Expense'
import { useExpenseStore } from '@/store/useExpenseStore'
import { v4 as uuidv4 } from 'uuid'

interface Props {
  existing?: Expense
  onDone: () => void
}

export default function ExpenseForm({ existing, onDone }: Props) {
  const isEdit = Boolean(existing)
  const [form, setForm] = useState<Expense>(
    existing ?? {
      id: '',
      description: '',
      amount: 0,
      category: '',
      date: new Date().toISOString().slice(0, 10),
    }
  )
  const { addExpense, updateExpense } = useExpenseStore()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (isEdit) updateExpense(form)
    else addExpense({ ...form, id: uuidv4() })
    onDone()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-lg p-6 space-y-6"
    >
      <h2 className="text-xl font-semibold text-gray-800">
        {isEdit ? '✏️ Editar Gasto' : '➕ Nuevo Gasto'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Descripción */}
        <div>
          <label
            htmlFor="description"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Descripción
          </label>
          <input
            id="description"
            type="text"
            required
            placeholder="e.g., Café diario"
            value={form.description}
            onChange={e =>
              setForm({ ...form, description: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Monto */}
        <div>
          <label
            htmlFor="amount"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Monto
          </label>
          <input
            id="amount"
            type="number"
            required
            step="0.01"
            placeholder="0.00"
            value={form.amount}
            onChange={e =>
              setForm({ ...form, amount: +e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Fecha */}
        <div>
          <label
            htmlFor="date"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Fecha
          </label>
          <input
            id="date"
            type="date"
            required
            value={form.date}
            onChange={e =>
              setForm({ ...form, date: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Categoría */}
        <div>
          <label
            htmlFor="category"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Categoría
          </label>
          <input
            id="category"
            type="text"
            required
            placeholder="e.g., Transporte"
            value={form.category}
            onChange={e =>
              setForm({ ...form, category: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Botones */}
      <div className="flex justify-end space-x-4">
        {isEdit && (
          <button
            type="button"
            onClick={onDone}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg
                       hover:bg-gray-300 transition"
          >
            Cancelar
          </button>
        )}
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium
                     hover:bg-blue-700 transition"
        >
          {isEdit ? 'Actualizar' : 'Agregar'} Gasto
        </button>
      </div>
    </form>
  )
}
