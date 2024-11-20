import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { colors } from '../../theme';

interface ExpenseChartProps {
  expenses: any[];
}

export default function ExpenseChart({ expenses }: ExpenseChartProps) {
  // Group expenses by day
  const expensesByDay = expenses.reduce((acc, expense) => {
    const day = new Date(expense.date).getDate();
    acc[day] = (acc[day] || 0) + expense.amount;
    return acc;
  }, {});

  // Prepare data for chart
  const days = Object.keys(expensesByDay).sort((a, b) => Number(a) - Number(b));
  const data = {
    labels: days,
    datasets: [{
      data: days.map(day => expensesByDay[day] / 100),
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
      <LineChart
        data={data}
        width={Dimensions.get('window').width - 64}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});