import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors, typography, spacing } from '../../theme';
import { formatCurrency } from '../../utils/formatters';

interface Income {
  id: string;
  name: string;
  amount: number;
  month: string;
}

interface IncomeListProps {
  incomes: Income[];
  onDelete: (id: string) => void;
}

export default function IncomeList({ incomes, onDelete }: IncomeListProps) {
  if (incomes.length === 0) {
    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyText}>
          Nenhuma renda adicional cadastrada
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {incomes.map((income) => (
        <View key={income.id} style={styles.incomeItem}>
          <View>
            <Text style={styles.incomeName}>{income.name}</Text>
            <Text style={styles.incomeMonth}>
              {new Date(income.month + '-01').toLocaleDateString('pt-BR', {
                month: 'long',
                year: 'numeric'
              })}
            </Text>
            <Text style={styles.incomeAmount}>
              {formatCurrency(income.amount)}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => onDelete(income.id)}
            style={styles.deleteButton}
          >
            <Icon name="trash-2" size={20} color={colors.error} />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  incomeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.gray[50],
    padding: spacing.md,
    borderRadius: spacing.md,
  },
  incomeName: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium as any,
    color: colors.gray[900],
  },
  incomeMonth: {
    fontSize: typography.sizes.sm,
    color: colors.gray[600],
    marginTop: spacing.xs,
  },
  incomeAmount: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold as any,
    color: colors.primary,
    marginTop: spacing.xs,
  },
  deleteButton: {
    padding: spacing.sm,
    backgroundColor: colors.error + '10',
    borderRadius: spacing.md,
  },
  emptyState: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: typography.sizes.md,
    color: colors.gray[500],
    textAlign: 'center',
  },
});