// store/useExpenseStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Expense } from '@/types/Expense'

interface ExpenseState {
  expenses: Expense[]
  addExpense: (e: Expense) => void
  removeExpense: (id: string) => void
  updateExpense: (e: Expense) => void
}

export const useExpenseStore = create<ExpenseState>()(
  persist(
    (set) => ({
      expenses: [],
      addExpense: (e) => set((s) => ({ expenses: [...s.expenses, e] })),
      removeExpense: (id) => set((s) => ({ expenses: s.expenses.filter(x => x.id !== id) })),
      updateExpense: (e) => set((s) => ({ expenses: s.expenses.map(x => x.id === e.id ? e : x) })),
    }),
    {
      name: 'expense-storage', // clave en localStorage
    }
  )
)
