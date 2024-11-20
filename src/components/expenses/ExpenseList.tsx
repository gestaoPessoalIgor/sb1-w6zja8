import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { useExpenseStore } from '../../store/useExpenseStore';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { colors, typography, spacing } from '../../theme';
import { formatCurrency } from '../../utils/formatters';

const CATEGORIES = {
  alimentacao: { label: 'Alimentação', color: colors.primary },
  transporte: { label: 'Transporte', color: colors.warning },
  lazer: { label: 'Lazer', color: colors.success },
  contas: { label: 'Contas', color: colors.error },
  outros: { label: 'Outros', color: colors.gray[400] },
};

export default function ExpenseList() {
  const navigation = useNavigation();
  const { expenses, removeExpense } = useExpenseStore();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredExpenses = selectedCategory
    ? expenses.filter(expense => expense.category === selectedCategory)
    : expenses;

  const sortedExpenses = [...filteredExpenses].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const handleEditExpense = (id: string) => {
    navigation.navigate('ExpenseForm' as never, { id } as never);
  };

  const handleDeleteExpense = (id: string) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir esta despesa?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => removeExpense(id),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Últimas Despesas</Text>
        <Button
          title="Nova"
          size="sm"
          onPress={() => navigation.navigate('ExpenseForm' as never)}
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryList}
        contentContainerStyle={styles.categoryContent}
      >
        {Object.entries(CATEGORIES).map(([key, { label }]) => (
          <TouchableOpacity
            key={key}
            style={[
              styles.categoryButton,
              selectedCategory === key && styles.categoryButtonActive
            ]}
            onPress={() => setSelectedCategory(
              selectedCategory === key ? null : key
            )}
          >
            <Text style={[
              styles.categoryButtonText,
              selectedCategory === key && styles.categoryButtonTextActive
            ]}>
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {sortedExpenses.map((expense) => (
        <Card key={expense.id} style={styles.expenseCard}>
          <View style={styles.expenseHeader}>
            <View>
              <Text style={styles.expenseTitle}>{expense.description}</Text>
              <Text style={styles.expenseAmount}>
                {formatCurrency(expense.amount)}
              </Text>
            </View>
            <View style={styles.expenseActions}>
              <TouchableOpacity
                onPress={() => handleEditExpense(expense.id)}
                style={styles.actionButton}
              >
                <Icon name="edit-2" size={16} color={colors.gray[600]} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDeleteExpense(expense.id)}
                style={[styles.actionButton, styles.deleteButton]}
              >
                <Icon name="trash-2" size={16} color={colors.error} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.expenseMeta}>
            <View style={styles.metaItem}>
              <Icon name="calendar" size={14} color={colors.gray[500]} />
              <Text style={styles.metaText}>{expense.date}</Text>
            </View>
            <View style={styles.metaItem}>
              {expense.paymentMethod === 'credit' ? (
                <Icon name="credit-card" size={14} color={colors.gray[500]} />
              ) : (
                <Icon name="dollar-sign" size={14} color={colors.gray[500]} />
              )}
              <Text style={styles.metaText}>
                {expense.paymentMethod === 'credit' ? 'Crédito' : 'Débito'}
                {expense.cardName && ` - ${expense.cardName}`}
                {expense.installments && expense.installments > 1 && 
                  ` (${expense.installments}x)`}
              </Text>
            </View>
          </View>

          {expense.notes && (
            <View style={styles.notes}>
              <Icon name="message-square" size={14} color={colors.gray[500]} />
              <Text style={styles.notesText}>{expense.notes}</Text>
            </View>
          )}
        </Card>
      ))}

      {sortedExpenses.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>
            Nenhuma despesa encontrada
          </Text>
          <Button
            title="Criar Nova Despesa"
            onPress={() => navigation.navigate('ExpenseForm' as never)}
            style={styles.emptyStateButton}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  title: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold as any,
    color: colors.gray[900],
  },
  categoryList: {
    marginBottom: spacing.lg,
  },
  categoryContent: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  categoryButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: spacing.xl,
    backgroundColor: colors.gray[100],
  },
  categoryButtonActive: {
    backgroundColor: colors.violet[100],
  },
  categoryButtonText: {
    fontSize: typography.sizes.sm,
    color: colors.gray[600],
  },
  categoryButtonTextActive: {
    color: colors.violet[600],
    fontWeight: typography.weights.medium as any,
  },
  expenseCard: {
    marginBottom: spacing.md,
  },
  expenseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  expenseTitle: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium as any,
    color: colors.gray[900],
    marginBottom: spacing.xs,
  },
  expenseAmount: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold as any,
    color: colors.gray[900],
  },
  expenseActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionButton: {
    padding: spacing.sm,
    borderRadius: spacing.md,
    backgroundColor: colors.gray[100],
  },
  deleteButton: {
    backgroundColor: colors.error + '10',
  },
  expenseMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  metaText: {
    fontSize: typography.sizes.sm,
    color: colors.gray[500],
  },
  notes: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    backgroundColor: colors.gray[50],
    padding: spacing.md,
    borderRadius: spacing.md,
  },
  notesText: {
    flex: 1,
    fontSize: typography.sizes.sm,
    color: colors.gray[600],
  },
  emptyState: {
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyStateText: {
    fontSize: typography.sizes.md,
    color: colors.gray[500],
    marginBottom: spacing.md,
  },
  emptyStateButton: {
    marginTop: spacing.md,
  },
});