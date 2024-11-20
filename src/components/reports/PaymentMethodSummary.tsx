import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Card } from '../common/Card';
import { colors, typography, spacing } from '../../theme';
import { formatCurrency } from '../../utils/formatters';

interface PaymentMethodSummaryProps {
  expenses: any[];
}

export default function PaymentMethodSummary({ expenses }: PaymentMethodSummaryProps) {
  // Calculate totals by payment method
  const totals = expenses.reduce((acc, expense) => {
    acc[expense.paymentMethod] = (acc[expense.paymentMethod] || 0) + expense.amount;
    return acc;
  }, {});

  const methods = [
    {
      key: 'credit',
      label: 'Crédito',
      icon: 'credit-card',
      color: colors.primary,
      amount: totals.credit || 0,
    },
    {
      key: 'debit',
      label: 'Débito',
      icon: 'dollar-sign',
      color: colors.success,
      amount: totals.debit || 0,
    },
    {
      key: 'cash',
      label: 'Dinheiro',
      icon: 'dollar-sign',
      color: colors.warning,
      amount: totals.cash || 0,
    },
  ];

  return (
    <Card style={styles.container}>
      <Text style={styles.title}>Método de Pagamento</Text>
      <View style={styles.grid}>
        {methods.map(({ key, label, icon, color, amount }) => (
          <View key={key} style={styles.methodItem}>
            <View style={[styles.methodIcon, { backgroundColor: color + '20' }]}>
              <Icon name={icon} size={24} color={color} />
            </View>
            <Text style={styles.methodLabel}>{label}</Text>
            <Text style={styles.methodAmount}>
              {formatCurrency(amount)}
            </Text>
          </View>
        ))}
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  methodItem: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.gray[50],
    padding: spacing.md,
    borderRadius: spacing.md,
    alignItems: 'center',
  },
  methodIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  methodLabel: {
    fontSize: typography.sizes.sm,
    color: colors.gray[600],
    marginBottom: spacing.xs,
  },
  methodAmount: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold as any,
    color: colors.gray[900],
  },
});