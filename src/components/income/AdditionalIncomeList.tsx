import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Card } from '../common/Card';
import { colors, typography, spacing } from '../../theme';
import { formatCurrency } from '../../utils/formatters';

interface Income {
  id: string;
  name: string;
  amount: number;
  month: string;
}

interface AdditionalIncomeListProps {
  incomes: Income[];
  onDelete: (id: string) => void;
}

export default function AdditionalIncomeList({
  incomes,
  onDelete,
}: AdditionalIncomeListProps) {
  const handleDelete = (id: string) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir esta renda?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => onDelete(id),
        },
      ]
    );
  };

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
        <Card key={income.id} style={styles.incomeCard}>
          <View style={styles.incomeHeader}>
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
              onPress={() => handleDelete(income.id)}
              style={styles.deleteButton}
            >
              <Icon name="trash-2" size={20} color={colors.error} />
            </TouchableOpacity>
          </View>
        </Card>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  incomeCard: {
    padding: spacing.md,
  },
  incomeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  incomeName: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium as any,
    color: colors.gray[900],
    marginBottom: spacing.xs,
  },
  incomeMonth: {
    fontSize: typography.sizes.sm,
    color: colors.gray[600],
    marginBottom: spacing.xs,
  },
  incomeAmount: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold as any,
    color: colors.primary,
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