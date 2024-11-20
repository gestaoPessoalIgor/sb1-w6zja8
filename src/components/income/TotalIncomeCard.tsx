import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Card } from '../common/Card';
import { colors, typography, spacing } from '../../theme';
import { formatCurrency } from '../../utils/formatters';

interface TotalIncomeCardProps {
  salary: number;
  additionalIncome: number;
}

export default function TotalIncomeCard({
  salary,
  additionalIncome,
}: TotalIncomeCardProps) {
  const totalIncome = salary + additionalIncome;

  return (
    <Card style={[styles.container, { backgroundColor: colors.primary }]}>
      <Text style={styles.label}>Renda Total</Text>
      <Text style={styles.amount}>{formatCurrency(totalIncome)}</Text>
      <View style={styles.breakdown}>
        <View style={styles.breakdownItem}>
          <Text style={styles.breakdownLabel}>Salário</Text>
          <Text style={styles.breakdownValue}>{formatCurrency(salary)}</Text>
        </View>
        <View style={styles.breakdownItem}>
          <Text style={styles.breakdownLabel}>Rendas Adicionais</Text>
          <Text style={styles.breakdownValue}>{formatCurrency(additionalIncome)}</Text>
        </View>
      </View>
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
    marginBottom: spacing.md,
  },
  breakdown: {
    borderTopWidth: 1,
    borderTopColor: colors.white + '20',
    paddingTop: spacing.md,
    gap: spacing.sm,
  },
  breakdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  breakdownLabel: {
    fontSize: typography.sizes.sm,
    color: colors.white + '90',
  },
  breakdownValue: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium as any,
    color: colors.white,
  },
});