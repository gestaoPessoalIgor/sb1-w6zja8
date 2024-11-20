import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Card } from '../common/Card';
import { useExpenseStore } from '../../store/useExpenseStore';
import { colors, typography, spacing } from '../../theme';
import { formatCurrency } from '../../utils/formatters';

const CATEGORIES = {
  alimentacao: { label: 'Alimentação', color: colors.primary },
  transporte: { label: 'Transporte', color: colors.warning },
  lazer: { label: 'Lazer', color: colors.success },
  contas: { label: 'Contas', color: colors.error },
  outros: { label: 'Outros', color: colors.gray[400] },
};

const screenWidth = Dimensions.get('window').width;
const chartConfig = {
  backgroundColor: colors.white,
  backgroundGradientFrom: colors.white,
  backgroundGradientTo: colors.white,
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(139, 92, 246, ${opacity})`,
  labelColor: () => colors.gray[600],
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: colors.violet[600],
  },
};

interface ExpenseChartProps {
  onDateSelect?: (date: string) => void;
}

export default function ExpenseChart({ onDateSelect }: ExpenseChartProps) {
  const { expenses } = useExpenseStore();
  const currentMonth = new Date().toISOString().slice(0, 7);

  const monthlyExpenses = expenses.filter(expense =>
    expense.date.startsWith(currentMonth)
  );

  const expensesByCategory = Object.entries(CATEGORIES).map(([key, { label }]) => {
    const amount = monthlyExpenses
      .filter(expense => expense.category === key)
      .reduce((sum, expense) => sum + expense.amount, 0);

    const percentage = monthlyExpenses.length > 0
      ? (amount / monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0)) * 100
      : 0;

    return {
      category: key,
      label,
      amount,
      percentage,
    };
  }).sort((a, b) => b.amount - a.amount);

  const chartData = {
    labels: expensesByCategory.slice(0, 4).map(({ label }) => label),
    datasets: [{
      data: expensesByCategory.slice(0, 4).map(({ amount }) => amount / 100),
    }],
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Despesas por Categoria</Text>

      {expensesByCategory.length > 0 ? (
        <>
          <View style={styles.chartContainer}>
            <LineChart
              data={chartData}
              width={screenWidth - 48}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={styles.chart}
            />
          </View>

          <View style={styles.legendContainer}>
            {expensesByCategory.map(({ category, label, amount, percentage }) => (
              <View key={category} style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: CATEGORIES[category].color }]} />
                <View style={styles.legendInfo}>
                  <Text style={styles.legendLabel}>{label}</Text>
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
                <Text style={styles.legendValue}>{formatCurrency(amount)}</Text>
              </View>
            ))}
          </View>
        </>
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>
            Nenhuma despesa registrada neste mês
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold as any,
    color: colors.gray[900],
    marginBottom: spacing.md,
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  chart: {
    marginVertical: spacing.md,
    borderRadius: 16,
  },
  legendContainer: {
    marginTop: spacing.md,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    backgroundColor: colors.gray[50],
    padding: spacing.sm,
    borderRadius: spacing.md,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: spacing.sm,
  },
  legendInfo: {
    flex: 1,
    marginRight: spacing.sm,
  },
  legendLabel: {
    fontSize: typography.sizes.sm,
    color: colors.gray[700],
    marginBottom: spacing.xs,
  },
  progressContainer: {
    height: 4,
    backgroundColor: colors.gray[200],
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 2,
  },
  legendValue: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium as any,
    color: colors.gray[900],
  },
  emptyState: {
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateText: {
    fontSize: typography.sizes.md,
    color: colors.gray[500],
    textAlign: 'center',
  },
});