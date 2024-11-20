import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { colors, typography, spacing } from '../../theme';
import { formatCurrency } from '../../utils/formatters';

interface MonthlyComparisonProps {
  expenses: any[];
}

export default function MonthlyComparison({ expenses }: MonthlyComparisonProps) {
  // Group expenses by month
  const expensesByMonth = expenses.reduce((acc, expense) => {
    const month = expense.date.slice(0, 7);
    acc[month] = (acc[month] || 0) + expense.amount;
    return acc;
  }, {});

  const months = Object.keys(expensesByMonth).sort();
  const data = {
    labels: months.map(month => {
      const [year, monthNum] = month.split('-');
      return `${monthNum}/${year.slice(2)}`;
    }),
    datasets: [{
      data: months.map(month => expensesByMonth[month] / 100),
    }],
  };

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comparação Mensal</Text>
      {months.length > 0 ? (
        <>
          <LineChart
            data={data}
            width={Dimensions.get('window').width - 32}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
          <View style={styles.monthList}>
            {months.map(month => (
              <View key={month} style={styles.monthItem}>
                <Text style={styles.monthLabel}>
                  {new Date(month + '-01').toLocaleDateString('pt-BR', {
                    month: 'long',
                    year: 'numeric'
                  })}
                </Text>
                <Text style={styles.monthAmount}>
                  {formatCurrency(expensesByMonth[month])}
                </Text>
              </View>
            ))}
          </View>
        </>
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>
            Nenhuma despesa registrada
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
  chart: {
    marginVertical: spacing.md,
    borderRadius: 16,
  },
  monthList: {
    marginTop: spacing.lg,
  },
  monthItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  monthLabel: {
    fontSize: typography.sizes.sm,
    color: colors.gray[600],
  },
  monthAmount: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium as any,
    color: colors.gray[900],
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