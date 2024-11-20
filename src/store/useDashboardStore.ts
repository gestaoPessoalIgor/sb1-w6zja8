import { create } from 'zustand';
import { useAuthStore } from './useAuthStore';
import { useExpenseStore } from './useExpenseStore';

interface DashboardState {
  getBalance: () => number;
  getIncome: () => number;
  getExpenses: () => number;
  getDebitTotal: () => number;
  getCreditTotal: () => number;
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  getBalance: () => {
    const user = useAuthStore.getState().user;
    const income = (user?.salary || 0) + (user?.extraIncome || 0);
    const expenses = useExpenseStore.getState().getMonthlyTotal(
      new Date().getMonth(),
      new Date().getFullYear()
    );
    return income - expenses;
  },

  getIncome: () => {
    const user = useAuthStore.getState().user;
    return (user?.salary || 0) + (user?.extraIncome || 0);
  },

  getExpenses: () => {
    return useExpenseStore.getState().getMonthlyTotal(
      new Date().getMonth(),
      new Date().getFullYear()
    );
  },

  getDebitTotal: () => {
    const totals = useExpenseStore.getState().getPaymentMethodTotals(
      new Date().getMonth(),
      new Date().getFullYear()
    );
    return totals.find(t => t.method === 'debit')?.amount || 0;
  },

  getCreditTotal: () => {
    const totals = useExpenseStore.getState().getPaymentMethodTotals(
      new Date().getMonth(),
      new Date().getFullYear()
    );
    return totals.find(t => t.method === 'credit')?.amount || 0;
  }
}));