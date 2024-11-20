import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { Select } from '../ui/Select';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { formatCurrency } from '@/lib/utils';
import { useDashboardStore } from '@/store/useDashboardStore';
import { useExpenseStore } from '@/store/useExpenseStore';
import { ChevronDown } from 'lucide-react';

const COLORS = ['#8B5CF6', '#60A5FA', '#34D399', '#F87171', '#9CA3AF'];

const months = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

export default function Reports() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const [isYearOpen, setIsYearOpen] = useState(false);
  const [periodData, setPeriodData] = useState({
    totalExpenses: 0,
    categoryExpenses: []
  });

  const { expenses } = useExpenseStore();

  useEffect(() => {
    // Filtrar despesas pelo período selecionado
    const filteredExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === selectedMonth && 
             expenseDate.getFullYear() === selectedYear;
    });

    // Calcular total
    const total = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);

    // Agrupar por categoria
    const categories = filteredExpenses.reduce((acc, expense) => {
      const category = acc.find(c => c.category === expense.category);
      if (category) {
        category.amount += expense.amount;
      } else {
        acc.push({
          category: expense.category,
          amount: expense.amount,
          icon: getCategoryIcon(expense.category)
        });
      }
      return acc;
    }, []);

    setPeriodData({
      totalExpenses: total,
      categoryExpenses: categories
    });
  }, [selectedMonth, selectedYear, expenses]);

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      alimentacao: '🍽️',
      transporte: '🚗',
      lazer: '🎮',
      contas: '📝',
      outros: '📦'
    };
    return icons[category] || '📦';
  };

  const getCategoryLabel = (category: string) => {
    const labels: { [key: string]: string } = {
      alimentacao: 'Alimentação',
      transporte: 'Transporte',
      lazer: 'Lazer',
      contas: 'Contas',
      outros: 'Outros'
    };
    return labels[category] || category;
  };

  return (
    <div className="py-6 pb-24">
      {/* Seletor de Período */}
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <button
            onClick={() => setIsMonthOpen(!isMonthOpen)}
            className="w-full px-4 py-2.5 bg-white rounded-xl border border-gray-200 flex items-center justify-between"
          >
            <span className="text-gray-700">{months[selectedMonth]}</span>
            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isMonthOpen ? 'rotate-180' : ''}`} />
          </button>
          {isMonthOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-lg border border-gray-200 py-1 z-10">
              <div className="max-h-48 overflow-y-auto">
                {months.map((month, index) => (
                  <button
                    key={month}
                    onClick={() => {
                      setSelectedMonth(index);
                      setIsMonthOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left hover:bg-gray-50 text-sm
                      ${selectedMonth === index ? 'text-violet-600 font-medium' : 'text-gray-700'}
                    `}
                  >
                    {month}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="relative flex-1">
          <button
            onClick={() => setIsYearOpen(!isYearOpen)}
            className="w-full px-4 py-2.5 bg-white rounded-xl border border-gray-200 flex items-center justify-between"
          >
            <span className="text-gray-700">{selectedYear}</span>
            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isYearOpen ? 'rotate-180' : ''}`} />
          </button>
          {isYearOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-lg border border-gray-200 py-1 z-10">
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => {
                    setSelectedYear(year);
                    setIsYearOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-left hover:bg-gray-50 text-sm
                    ${selectedYear === year ? 'text-violet-600 font-medium' : 'text-gray-700'}
                  `}
                >
                  {year}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Total de Gastos */}
      <Card className="p-6 mb-6 bg-gradient-to-r from-violet-500 to-violet-600 text-white">
        <h2 className="text-sm font-medium opacity-90">Total de Gastos</h2>
        <p className="text-3xl font-bold mt-1">{formatCurrency(periodData.totalExpenses)}</p>
        <p className="text-sm opacity-75 mt-1">
          em {months[selectedMonth]} de {selectedYear}
        </p>
      </Card>

      {/* Gastos por Categoria */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Gastos por Categoria
        </h2>
        
        {periodData.categoryExpenses.length > 0 ? (
          <>
            <div className="h-[300px] mb-8">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={periodData.categoryExpenses}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="amount"
                    label={({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
                      const RADIAN = Math.PI / 180;
                      const radius = 25 + innerRadius + (outerRadius - innerRadius);
                      const x = cx + radius * Math.cos(-midAngle * RADIAN);
                      const y = cy + radius * Math.sin(-midAngle * RADIAN);

                      return (
                        <text
                          x={x}
                          y={y}
                          fill={COLORS[index % COLORS.length]}
                          textAnchor={x > cx ? 'start' : 'end'}
                          dominantBaseline="central"
                          className="text-sm font-medium"
                        >
                          {getCategoryLabel(periodData.categoryExpenses[index].category)}
                          {' '}
                          ({((value / periodData.totalExpenses) * 100).toFixed(0)}%)
                        </text>
                      );
                    }}
                  >
                    {periodData.categoryExpenses.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]}
                        stroke="none"
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => formatCurrency(Number(value))}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-4">
              {periodData.categoryExpenses.map((category, index) => (
                <div 
                  key={category.category} 
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${COLORS[index % COLORS.length]}20` }}
                    >
                      <span className="text-lg">{category.icon}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {getCategoryLabel(category.category)}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-16 h-1.5 bg-gray-200 rounded-full">
                          <div 
                            className="h-full rounded-full"
                            style={{ 
                              width: `${(category.amount / periodData.totalExpenses) * 100}%`,
                              backgroundColor: COLORS[index % COLORS.length]
                            }}
                          />
                        </div>
                        <span className="text-xs text-gray-500">
                          {((category.amount / periodData.totalExpenses) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {formatCurrency(category.amount)}
                  </span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-8 text-gray-500">
            Nenhuma despesa registrada neste período
          </div>
        )}
      </Card>
    </div>
  );
}