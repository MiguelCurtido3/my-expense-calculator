export interface Expense {
  id: string;             // UUID
  description: string;
  amount: number;         // en tu moneda
  category: string;       // p.ej. "Transporte", "Comida"
  date: string;           // ISO (yyyy-MM-dd)
}