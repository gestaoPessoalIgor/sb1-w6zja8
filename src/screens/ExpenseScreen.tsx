import React, { useState, useCallback } from 'react';
import {
  ScrollView,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, spacing } from '../theme';
import ScreenContainer from '../components/common/ScreenContainer';
import Header from '../components/common/Header';
import ExpenseList from '../components/expenses/ExpenseList';
import CreditCardList from '../components/expenses/CreditCardList';

export default function ExpenseScreen() {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    // Implement refresh logic here
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const handleAddExpense = () => {
    navigation.navigate('ExpenseForm' as never);
  };

  return (
    <ScreenContainer>
      <Header 
        title="Despesas" 
        rightAction={{
          icon: 'plus',
          onPress: handleAddExpense
        }}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <CreditCardList />
        <ExpenseList />
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