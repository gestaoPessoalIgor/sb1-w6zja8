import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useCardStore } from './useCardStore';

export type PaymentMethod = 'credit' | 'debit' | 'cash' | 'pix';
export type ExpenseCategory = 'alimentacao' | 'transporte' | 'lazer' | 'contas' | 'outros';

interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: ExpenseCategory;
  paymentMethod: PaymentMethod;
  cardId?: string;
  installments?: number;
  notes?: string;
}

interface ExpenseState {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  removeExpense: (id: string) => void;
  updateExpense: (id: string, expense: Partial<Expense>) => void;
  getMonthlyTotal: (month: number, year: number) => number;
  getDailyTotal: (date: string) => number;
  getCategoryTotals: (month: number, year: number) => { category: ExpenseCategory; amount: number }[];
  getPaymentMethodTotals: (month: number, year: number) => { method: PaymentMethod; amount: number }[];
  getDailyExpenses: (date: string) => { category: ExpenseCategory; amount: number }[];
}

export const useExpenseStore = create<ExpenseState>()(
  persist(
    (set, get) => ({
      expenses: [],
      
      addExpense: (expense) => {
        const id = Date.now().toString();
        
        // Atualizar a fatura do cartão se for compra no crédito
        if (expense.paymentMethod === 'credit' && expense.cardId) {
          const updateCardBill = useCardStore.getState().updateCardBill;
          updateCardBill(expense.cardId, expense.amount);
        }
        
        set((state) => ({
          expenses: [...state.expenses, { ...expense, id }]
        }));
      },
      
      removeExpense: (id) => {
        const expense = get().expenses.find(e => e.id === id);
        
        // Atualizar a fatura do cartão ao remover despesa
        if (expense?.paymentMethod === 'credit' && expense.cardId) {
          const updateCardBill = useCardStore.getState().updateCardBill;
          updateCardBill(expense.cardId, -expense.amount);
        }
        
        set((state) => ({
          expenses: state.expenses.filter((expense) => expense.id !== id)
        }));
      },
      
      updateExpense: (id, updatedExpense) => {
        const oldExpense = get().expenses.find(e => e.id === id);
        
        set((state) => ({
          expenses: state.expenses.map((expense) =>
            expense.id === id ? { ...expense, ...updatedExpense } : expense
          )
        }));
        
        // Atualizar a fatura do cartão se houver mudança no valor
        if (oldExpense?.paymentMethod === 'credit' && oldExpense.cardId) {
          const updateCardBill = useCardStore.getState().updateCardBill;
          const difference = (updatedExpense.amount || oldExpense.amount) - oldExpense.amount;
          updateCardBill(oldExpense.cardId, difference);
        }
      },
      
      getMonthlyTotal: (month: number, year: number) => {
        return get().expenses.reduce((total, expense) => {
          const expenseDate = new Date(expense.date);
          if (expenseDate.getMonth() === month && 
              expenseDate.getFullYear() === year) {
            return total + expense.amount;
          }
          return total;
        }, 0);
      },

      getDailyTotal: (date: string) => {
        return get().expenses.reduce((total, expense) => {
          if (expense.date === date) {
            return total + expense.amount;
          }
          return total;
        }, 0);
      },
      
      getCategoryTotals: (month: number, year: number) => {
        const totals: { [key in ExpenseCategory]?: number } = {};
        
        get().expenses.forEach((expense) => {
          const expenseDate = new Date(expense.date);
          if (expenseDate.getMonth() === month && 
              expenseDate.getFullYear() === year) {
            totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
          }
        });
        
        return Object.entries(totals).map(([category, amount]) => ({
          category: category as ExpenseCategory,
          amount
        }));
      },
      
      getPaymentMethodTotals: (month: number, year: number) => {
        const totals: { [key in PaymentMethod]?: number } = {};
        
        get().expenses.forEach((expense) => {
          const expenseDate = new Date(expense.date);
          if (expenseDate.getMonth() === month && 
              expenseDate.getFullYear() === year) {
            totals[expense.paymentMethod] = (totals[expense.paymentMethod] || 0) + expense.amount;
          }
        });
        
        return Object.entries(totals).map(([method, amount]) => ({
          method: method as PaymentMethod,
          amount
        }));
      },

      getDailyExpenses: (date: string) => {
        const totals: { [key in ExpenseCategory]?: number } = {};
        
        get().expenses.forEach((expense) => {
          if (expense.date === date) {
            totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
          }
        });
        
        return Object.entries(totals).map(([category, amount]) => ({
          category: category as ExpenseCategory,
          amount
        }));
      }
    }),
    {
      name: 'expense-storage'
    }
  )
);