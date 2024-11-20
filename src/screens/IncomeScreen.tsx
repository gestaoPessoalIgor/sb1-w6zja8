import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useAuthStore } from '../store/useAuthStore';
import { colors, spacing } from '../theme';
import ScreenContainer from '../components/common/ScreenContainer';
import Header from '../components/common/Header';
import SalaryManager from '../components/income/SalaryManager';
import AdditionalIncomeManager from '../components/income/AdditionalIncomeManager';

export default function IncomeScreen() {
  const { user, updateUserIncome } = useAuthStore();
  const [additionalIncomes, setAdditionalIncomes] = useState(user?.additionalIncomes || []);

  useEffect(() => {
    if (user) {
      setAdditionalIncomes(user.additionalIncomes || []);
    }
  }, [user]);

  const handleSaveSalary = (salary: number) => {
    updateUserIncome(salary, additionalIncomes);
  };

  const handleAddIncome = (income: { name: string; amount: number; month: string }) => {
    const updatedIncomes = [...additionalIncomes, { ...income, id: Date.now().toString() }];
    setAdditionalIncomes(updatedIncomes);
    updateUserIncome(user?.salary || 0, updatedIncomes);
  };

  const handleDeleteIncome = (id: string) => {
    const updatedIncomes = additionalIncomes.filter(income => income.id !== id);
    setAdditionalIncomes(updatedIncomes);
    updateUserIncome(user?.salary || 0, updatedIncomes);
  };

  return (
    <ScreenContainer>
      <Header
        title="Gerenciar Salário e Rendas"
        showBackButton
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <SalaryManager
          salary={user?.salary || 0}
          onSave={handleSaveSalary}
        />
        
        <AdditionalIncomeManager
          incomes={additionalIncomes}
          onAdd={handleAddIncome}
          onDelete={handleDeleteIncome}
        />
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