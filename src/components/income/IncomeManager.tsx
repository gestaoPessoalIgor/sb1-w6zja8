import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useAuthStore } from '../../store/useAuthStore';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { SalaryCard } from './SalaryCard';
import { SalaryForm } from './SalaryForm';
import { IncomeForm } from './IncomeForm';
import { IncomeList } from './IncomeList';
import { colors, typography, spacing } from '../../theme';

export default function IncomeManager() {
  const { user, updateUserIncome } = useAuthStore();
  const [isEditingSalary, setIsEditingSalary] = useState(false);
  const [salaryInput, setSalaryInput] = useState('');
  const [isAddingIncome, setIsAddingIncome] = useState(false);
  const [additionalIncomes, setAdditionalIncomes] = useState(user?.additionalIncomes || []);

  useEffect(() => {
    if (user) {
      if (typeof user.salary === 'number') {
        setSalaryInput((user.salary / 100).toFixed(2));
        setIsEditingSalary(false);
      } else {
        setIsEditingSalary(true);
        setSalaryInput('');
      }
      setAdditionalIncomes(user.additionalIncomes || []);
    }
  }, [user]);

  const handleSaveSalary = (value: string) => {
    const cleanValue = value.replace(/\./g, '').replace(',', '.');
    const salaryInCents = Math.round(parseFloat(cleanValue) * 100);
    
    if (isNaN(salaryInCents)) {
      Alert.alert('Erro', 'Valor inválido');
      return;
    }

    updateUserIncome(salaryInCents, additionalIncomes);
    setIsEditingSalary(false);
  };

  const handleAddIncome = (formData: { name: string; amount: string; month: string }) => {
    const cleanValue = formData.amount.replace(/\./g, '').replace(',', '.');
    const amount = Math.round(parseFloat(cleanValue) * 100);
    
    if (isNaN(amount)) {
      Alert.alert('Erro', 'Valor inválido');
      return;
    }

    const income = {
      id: Date.now().toString(),
      name: formData.name,
      amount,
      month: formData.month
    };

    const updatedIncomes = [...additionalIncomes, income];
    setAdditionalIncomes(updatedIncomes);
    updateUserIncome(user?.salary || 0, updatedIncomes);
    setIsAddingIncome(false);
  };

  const handleDeleteIncome = (id: string) => {
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
          onPress: () => {
            const updatedIncomes = additionalIncomes.filter(income => income.id !== id);
            setAdditionalIncomes(updatedIncomes);
            updateUserIncome(user?.salary || 0, updatedIncomes);
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Salário Principal */}
      <Card style={styles.card}>
        <Text style={styles.cardTitle}>Salário Principal</Text>
        {isEditingSalary ? (
          <SalaryForm
            initialValue={salaryInput}
            onSubmit={handleSaveSalary}
            onCancel={() => {
              setIsEditingSalary(false);
              setSalaryInput(((user?.salary || 0) / 100).toFixed(2));
            }}
          />
        ) : (
          <SalaryCard
            salary={user?.salary || 0}
            onEdit={() => setIsEditingSalary(true)}
          />
        )}
      </Card>

      {/* Rendas Adicionais */}
      <Card style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.cardTitle}>Rendas Adicionais</Text>
          <Button
            title="Nova Renda"
            onPress={() => setIsAddingIncome(true)}
            size="sm"
          />
        </View>

        {isAddingIncome && (
          <IncomeForm
            onSubmit={handleAddIncome}
            onCancel={() => setIsAddingIncome(false)}
          />
        )}

        <IncomeList
          incomes={additionalIncomes}
          onDelete={handleDeleteIncome}
        />
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    marginBottom: spacing.lg,
  },
  cardTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold as any,
    color: colors.gray[900],
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
});