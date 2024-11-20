import React, { useState, useCallback } from 'react';
import {
  ScrollView,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, spacing } from '../theme';
import ScreenContainer from '../components/common/ScreenContainer';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import BalanceCard from '../components/dashboard/BalanceCard';
import ExpenseChart from '../components/dashboard/ExpenseChart';
import TaskCalendar from '../components/dashboard/TaskCalendar';

export default function DashboardScreen() {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    // Implement refresh logic here
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  return (
    <ScreenContainer>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <DashboardHeader />
        <BalanceCard />
        <ExpenseChart />
        <TaskCalendar />
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
});