import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Card } from '../common/Card';
import { colors, typography, spacing } from '../../theme';
import { formatCurrency } from '../../utils/formatters';

interface IncomeSummaryProps {
  salary: number;
  additionalIncome: number;
  totalIncome: number;
}

export default function IncomeSummary({
  salary,
  additionalIncome,
  totalIncome,
}: IncomeSummaryProps) {
  return (
    <Card style={styles.container}>
      <Text style={styles.title}>Resumo de Rendas</Text>
      
      <View style={styles.row}>
        <Text style={styles.label}>Salário</Text>
        <Text style={styles.value}>{formatCurrency(salary)}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Rendas Adicionais</Text>
        <Text style={styles.value}>{formatCurrency(additionalIncome)}</Text>
      </View>

      <View style={[styles.row, styles.totalRow]}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>{formatCurrency(totalIncome)}</Text>
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
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
    marginTop: spacing.sm,
    paddingTop: spacing.md,
  },
  totalLabel: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold as any,
    color: colors.gray[900],
  },
  totalValue: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold as any,
    color: colors.primary,
  },
});