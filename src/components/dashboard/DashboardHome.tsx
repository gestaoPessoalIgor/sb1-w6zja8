import React from 'react';
import { Card } from '../ui/Card';
import { formatCurrency } from '@/lib/utils';
import { LineChart, CreditCard, Wallet, TrendingUp, Activity } from 'lucide-react';
import ExpenseChart from './ExpenseChart';
import TaskCalendar from './TaskCalendar';
import DashboardHeader from './DashboardHeader';
import { useAuthStore } from '@/store/useAuthStore';
import { useExpenseStore } from '@/store/useExpenseStore';

export default function DashboardHome() {
  const { user } = useAuthStore();
  const { expenses } = useExpenseStore();
  const [selectedMonth, setSelectedMonth] = React.useState(new Date().toISOString().slice(0, 7));

  // Filtrar despesas do mês selecionado
  const monthlyExpenses = expenses.filter(expense => 
    expense.date.startsWith(selectedMonth)
  );

  // Calcular total de receitas (salário + rendas adicionais)
  const calculateIncome = () => {
    const salary = user?.salary || 0;
    const additionalIncomes = user?.additionalIncomes || [];
    
    // Filtrar rendas adicionais do mês selecionado
    const monthlyIncomes = additionalIncomes.filter(income => 
      income.month.startsWith(selectedMonth)
    );
    
    // Somar todas as rendas do mês
    const totalAdditionalIncome = monthlyIncomes.reduce((sum, income) => 
      sum + income.amount, 0
    );
    
    return salary + totalAdditionalIncome;
  };

  // Calcular total de despesas para o mês
  const calculateExpenses = () => {
    return monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  };

  // Calcular saldo atual (receitas - despesas do mês)
  const calculateBalance = () => {
    const totalIncome = calculateIncome();
    const totalExpenses = calculateExpenses();
    return totalIncome - totalExpenses;
  };

  // Calcular total de débito para o mês
  const calculateDebit = () => {
    return monthlyExpenses
      .filter(expense => expense.paymentMethod === 'debit')
      .reduce((sum, expense) => sum + expense.amount, 0);
  };

  // Calcular total de crédito para o mês
  const calculateCredit = () => {
    return monthlyExpenses
      .filter(expense => expense.paymentMethod === 'credit')
      .reduce((sum, expense) => sum + expense.amount, 0);
  };

  return (
    <div className="py-6 pb-24">
      <DashboardHeader />

      <div className="bg-violet-100 rounded-xl p-3 mb-6">
        <p className="text-sm text-violet-800">
          Seu saldo atual é de <span className="font-semibold">{formatCurrency(calculateBalance())}</span>
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card className="p-4 bg-violet-500 text-white">
          <div className="flex justify-between items-start mb-2">
            <span className="text-sm opacity-80">Receitas</span>
            <Activity className="w-4 h-4 opacity-80" />
          </div>
          <p className="text-2xl font-bold">{formatCurrency(calculateIncome())}</p>
          <div className="mt-2 flex items-center gap-1 text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>este mês</span>
          </div>
        </Card>

        <Card className="p-4 bg-violet-100">
          <div className="flex justify-between items-start mb-2">
            <span className="text-sm text-violet-600">Despesas</span>
            <LineChart className="w-4 h-4 text-violet-600" />
          </div>
          <p className="text-2xl font-bold text-violet-900">{formatCurrency(calculateExpenses())}</p>
          <p className="text-sm text-violet-600 mt-2">neste mês</p>
        </Card>

        <Card className="p-4 bg-blue-500 text-white">
          <div className="flex justify-between items-start mb-2">
            <span className="text-sm opacity-80">Débito</span>
            <Wallet className="w-4 h-4 opacity-80" />
          </div>
          <p className="text-2xl font-bold">{formatCurrency(calculateDebit())}</p>
          <p className="text-sm opacity-80 mt-2">neste mês</p>
        </Card>

        <Card className="p-4 bg-violet-600 text-white">
          <div className="flex justify-between items-start mb-2">
            <span className="text-sm opacity-80">Crédito</span>
            <CreditCard className="w-4 h-4 opacity-80" />
          </div>
          <p className="text-2xl font-bold">{formatCurrency(calculateCredit())}</p>
          <p className="text-sm opacity-80 mt-2">neste mês</p>
        </Card>
      </div>

      {/* Expense Chart */}
      <Card className="p-6 mb-6">
        <ExpenseChart 
          onDateSelect={(date) => setSelectedMonth(date.slice(0, 7))} 
        />
      </Card>

      {/* Task Calendar */}
      <TaskCalendar />
    </div>
  );
}