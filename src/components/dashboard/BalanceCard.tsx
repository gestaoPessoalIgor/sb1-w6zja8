import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Card } from '../common/Card';
import { useAuthStore } from '../../store/useAuthStore';
import { useExpenseStore } from '../../store/useExpenseStore';
import { colors, typography, spacing } from '../../theme';
import { formatCurrency } from '../../utils/formatters';

export default function BalanceCard() {
  const { user } = useAuthStore();
  const { expenses } = useExpenseStore();
  const currentMonth = new Date().toISOString().slice(0, 7);

  const calculateIncome = () => {
    const salary = user?.salary || 0;
    const additionalIncomes = user?.additionalIncomes || [];
    
    const monthlyIncomes = additionalIncomes.filter(income => 
      income.month.startsWith(currentMonth)
    );
    
    const totalAdditionalIncome = monthlyIncomes.reduce((sum, income) => 
      sum + income.amount, 0
    );
    
    return salary + totalAdditionalIncome;
  };

  const calculateExpenses = () => {
    return expenses
      .filter(expense => expense.date.startsWith(currentMonth))
      .reduce((sum, expense) => sum + expense.amount, 0);
  };

  const calculateBalance = () => {
    return calculateIncome() - calculateExpenses();
  };

  return (
    <Card style={[styles.container, { backgroundColor: colors.primary }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Saldo Atual</Text>
        <Text style={styles.balance}>{formatCurrency(calculateBalance())}</Text>
        <Text style={styles.subtitle}>disponível</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Receitas</Text>
          <Text style={[styles.statValue, styles.incomeValue]}>
            {formatCurrency(calculateIncome())}
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Despesas</Text>
          <Text style={[styles.statValue, styles.expenseValue]}>
            {formatCurrency(calculateExpenses())}
          </Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  header: {
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold as any,
    color: colors.white,
    marginBottom: spacing.xs,
  },
  balance: {
    fontSize: typography.sizes.xxxl,
    fontWeight: typography.weights.bold as any,
    color: colors.white,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.sizes.sm,
    color: colors.primaryLight,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: `${colors.white}10`,
    borderRadius: 12,
    padding: spacing.md,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  divider: {
    width: 1,
    backgroundColor: `${colors.white}20`,
    marginHorizontal: spacing.md,
  },
  statLabel: {
    fontSize: typography.sizes.sm,
    color: colors.primaryLight,
    marginBottom: spacing.xs,
  },
  statValue: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold as any,
  },
  incomeValue: {
    color: colors.success,
  },
  expenseValue: {
    color: colors.error,
  },
});