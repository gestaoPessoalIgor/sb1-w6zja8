import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { colors, typography, spacing } from '../../theme';
import { formatCurrency } from '../../utils/formatters';

interface CategoryChartProps {
  expenses: any[];
}

export default function CategoryChart({ expenses }: CategoryChartProps) {
  // Group expenses by category
  const expensesByCategory = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const totalExpenses = Object.values(expensesByCategory).reduce((sum: any, amount: any) => sum + amount, 0);

  const chartData = Object.entries(expensesByCategory).map(([category, amount]) => ({
    name: category,
    amount,
    color: colors.violet[500],
    legendFontColor: colors.gray[600],
    legendFontSize: 12,
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gastos por Categoria</Text>
      {chartData.length > 0 ? (
        <>
          <PieChart
            data={chartData}
            width={Dimensions.get('window').width - 32}
            height={220}
            chartConfig={{
              color: (opacity = 1) => `rgba(139, 92, 246, ${opacity})`,
              labelColor: () => colors.gray[600],
            }}
            accessor="amount"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
          <View style={styles.legend}>
            {chartData.map(({ name, amount }) => (
              <View key={name} style={styles.legendItem}>
                <View style={styles.legendColor} />
                <View style={styles.legendInfo}>
                  <Text style={styles.legendName}>{name}</Text>
                  <Text style={styles.legendAmount}>
                    {formatCurrency(amount)} ({((amount / totalExpenses) * 100).toFixed(1)}%)
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </>
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>
            Nenhuma despesa registrada neste período
          </Text>
        </View>
      )}
    </View>
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
  legend: {
    marginTop: spacing.lg,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.violet[500],
    marginRight: spacing.sm,
  },
  legendInfo: {
    flex: 1,
  },
  legendName: {
    fontSize: typography.sizes.sm,
    color: colors.gray[900],
  },
  legendAmount: {
    fontSize: typography.sizes.sm,
    color: colors.gray[600],
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