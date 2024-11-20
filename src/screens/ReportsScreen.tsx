import React, { useState, useCallback } from 'react';
import {
  ScrollView,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import { colors, spacing } from '../theme';
import ScreenContainer from '../components/common/ScreenContainer';
import Header from '../components/common/Header';
import ReportSummary from '../components/reports/ReportSummary';

export default function ReportsScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    // Implement refresh logic here
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  return (
    <ScreenContainer>
      <Header title="Relatórios" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <ReportSummary />
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