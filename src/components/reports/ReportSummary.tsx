import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useExpenseStore } from '../../store/useExpenseStore';
import { Card } from '../common/Card';
import { colors, typography, spacing } from '../../theme';
import { formatCurrency } from '../../utils/formatters';
import MonthPicker from '../common/MonthPicker';
import ExpenseChart from './ExpenseChart';
import PaymentMethodSummary from './PaymentMethodSummary';

const CATEGORIES = {
  alimentacao: { label: 'Alimentação', color: colors.primary, icon: '🍽️' },
  transporte: { label: 'Transporte', color: colors.warning, icon: '🚗' },
  lazer: { label: 'Lazer', color: colors.success, icon: '🎮' },
  contas: { label: 'Contas', color: colors.error, icon: '📝' },
  outros: { label: 'Outros', color: colors.gray[400], icon: '📦' },
};

export default function ReportSummary() {
  const { expenses } = useExpenseStore();
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );
  const [showMonthPicker, setShowMonthPicker] = useState(false);

  // Filter expenses for selected month
  const monthlyExpenses = expenses.filter(expense =>
    expense.date.startsWith(selectedMonth)
  );

  // Calculate total expenses
  const totalExpenses = monthlyExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  // Group expenses by category
  const expensesByCategory = Object.entries(CATEGORIES).map(([key, { label, icon }]) => {
    const amount = monthlyExpenses
      .filter(expense => expense.category === key)
      .reduce((sum, expense) => sum + expense.amount, 0);
    
    const percentage = totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0;

    return {
      category: key,
      label,
      icon,
      amount,
      percentage,
    };
  }).sort((a, b) => b.amount - a.amount);

  return (
    <View style={styles.container}>
      {/* Period Selector */}
      <TouchableOpacity
        onPress={() => setShowMonthPicker(true)}
        style={styles.periodSelector}
      >
        <Text style={styles.periodText}>
          {new Date(selectedMonth + '-01').toLocaleDateString('pt-BR', {
            month: 'long',
            year: 'numeric'
          })}
        </Text>
        <Icon 
          name="chevron-down" 
          size={20} 
          color={colors.gray[500]}
          style={[
            styles.periodIcon,
            showMonthPicker && styles.periodIconRotated
          ]}
        />
      </TouchableOpacity>

      {/* Total Expenses */}
      <Card style={styles.totalCard}>
        <Text style={styles.totalLabel}>Total de Gastos</Text>
        <Text style={styles.totalAmount}>{formatCurrency(totalExpenses)}</Text>
        <Text style={styles.totalPeriod}>
          em {new Date(selectedMonth + '-01').toLocaleDateString('pt-BR', {
            month: 'long',
            year: 'numeric'
          })}
        </Text>
      </Card>

      {/* Expense Chart */}
      <Card style={styles.chartCard}>
        <Text style={styles.cardTitle}>Gastos por Categoria</Text>
        <ExpenseChart expenses={monthlyExpenses} />

        <ScrollView style={styles.categoryList}>
          {expensesByCategory.map(({ category, label, icon, amount, percentage }) => (
            <View key={category} style={styles.categoryItem}>
              <View style={styles.categoryHeader}>
                <View style={[
                  styles.categoryIcon,
                  { backgroundColor: CATEGORIES[category].color + '20' }
                ]}>
                  <Text>{icon}</Text>
                </View>
                <View style={styles.categoryInfo}>
                  <Text style={styles.categoryLabel}>{label}</Text>
                  <View style={styles.progressContainer}>
                    <View 
                      style={[
                        styles.progressBar,
                        { 
                          width: `${percentage}%`,
                          backgroundColor: CATEGORIES[category].color
                        }
                      ]} 
                    />
                  </View>
                </View>
                <Text style={styles.categoryAmount}>
                  {formatCurrency(amount)}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </Card>

      {/* Payment Methods Summary */}
      <PaymentMethodSummary expenses={monthlyExpenses} />

      <MonthPicker
        visible={showMonthPicker}
        onClose={() => setShowMonthPicker(false)}
        onSelect={(month) => {
          setSelectedMonth(month);
          setShowMonthPicker(false);
        }}
        selectedMonth={selectedMonth}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  periodSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
    padding: spacing.md,
    backgroundColor: colors.white,
    borderRadius: spacing.xl,
  },
  periodText: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium as any,
    color: colors.gray[900],
    marginRight: spacing.sm,
  },
  periodIcon: {
    transform: [{ rotate: '0deg' }],
  },
  periodIconRotated: {
    transform: [{ rotate: '180deg' }],
  },
  totalCard: {
    backgroundColor: colors.primary,
    marginBottom: spacing.lg,
  },
  totalLabel: {
    fontSize: typography.sizes.sm,
    color: colors.white + '90',
    marginBottom: spacing.xs,
  },
  totalAmount: {
    fontSize: typography.sizes.xxxl,
    fontWeight: typography.weights.bold as any,
    color: colors.white,
    marginBottom: spacing.xs,
  },
  totalPeriod: {
    fontSize: typography.sizes.sm,
    color: colors.white + '75',
  },
  chartCard: {
    marginBottom: spacing.lg,
  },
  cardTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold as any,
    color: colors.gray[900],
    marginBottom: spacing.md,
  },
  categoryList: {
    marginTop: spacing.md,
  },
  categoryItem: {
    marginBottom: spacing.md,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  categoryInfo: {
    flex: 1,
    marginRight: spacing.md,
  },
  categoryLabel: {
    fontSize: typography.sizes.sm,
    color: colors.gray[700],
    marginBottom: spacing.xs,
  },
  progressContainer: {
    height: 4,
    backgroundColor: colors.gray[100],
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 2,
  },
  categoryAmount: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium as any,
    color: colors.gray[900],
  },
});