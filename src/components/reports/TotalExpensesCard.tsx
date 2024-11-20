import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Card } from '../common/Card';
import { colors, typography, spacing } from '../../theme';
import { formatCurrency } from '../../utils/formatters';

interface TotalExpensesCardProps {
  amount: number;
  period: string;
}

export default function TotalExpensesCard({ amount, period }: TotalExpensesCardProps) {
  return (
    <Card style={[styles.container, { backgroundColor: colors.primary }]}>
      <Text style={styles.label}>Total de Gastos</Text>
      <Text style={styles.amount}>{formatCurrency(amount)}</Text>
      <Text style={styles.period}>em {period}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: typography.sizes.sm,
    color: colors.white + '90',
    marginBottom: spacing.xs,
  },
  amount: {
    fontSize: typography.sizes.xxxl,
    fontWeight: typography.weights.bold as any,
    color: colors.white,
    marginBottom: spacing.xs,
  },
  period: {
    fontSize: typography.sizes.sm,
    color: colors.white + '75',
  },
});