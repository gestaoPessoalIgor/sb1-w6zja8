import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Card } from '../common/Card';
import { colors, typography, spacing } from '../../theme';
import { formatCurrency } from '../../utils/formatters';

interface ExpenseSummaryProps {
  expenses: any[];
}

export default function ExpenseSummary({ expenses }: ExpenseSummaryProps) {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalCredit = expenses
    .filter(expense => expense.paymentMethod === 'credit')
    .reduce((sum, expense) => sum + expense.amount, 0);
  const totalDebit = expenses
    .filter(expense => expense.paymentMethod === 'debit')
    .reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <Card style={styles.container}>
      <Text style={styles.title}>Resumo de Despesas</Text>
      
      <View style={styles.row}>
        <Text style={styles.label}>Total Gasto</Text>
        <Text style={styles.totalValue}>{formatCurrency(totalExpenses)}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Crédito</Text>
        <Text style={styles.value}>{formatCurrency(totalCredit)}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Débito</Text>
        <Text style={styles.value}>{formatCurrency(totalDebit)}</Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold as any,
    color: colors.gray[900],
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  label: {
    fontSize: typography.sizes.md,
    color: colors.gray[600],
  },
  value: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium as any,
    color: colors.gray[900],
  },
  totalValue: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold as any,
    color: colors.primary,
  },
});