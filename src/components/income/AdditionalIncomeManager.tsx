import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { colors, typography, spacing } from '../../theme';
import AdditionalIncomeForm from './AdditionalIncomeForm';
import IncomeList from './IncomeList';

interface Income {
  id: string;
  name: string;
  amount: number;
  month: string;
}

interface AdditionalIncomeManagerProps {
  incomes: Income[];
  onAdd: (income: Omit<Income, 'id'>) => void;
  onDelete: (id: string) => void;
}

export default function AdditionalIncomeManager({
  incomes,
  onAdd,
  onDelete,
}: AdditionalIncomeManagerProps) {
  const [isAddingIncome, setIsAddingIncome] = useState(false);
  const [newIncome, setNewIncome] = useState({
    name: '',
    amount: '',
    month: new Date().toISOString().split('T')[0].slice(0, 7),
  });

  const handleAdd = () => {
    if (!newIncome.name || !newIncome.amount) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios');
      return;
    }

    const cleanValue = newIncome.amount.replace(/\./g, '').replace(',', '.');
    const amount = Math.round(parseFloat(cleanValue) * 100);

    if (isNaN(amount)) {
      Alert.alert('Erro', 'Valor inválido');
      return;
    }

    onAdd({
      name: newIncome.name,
      amount,
      month: newIncome.month,
    });

    setIsAddingIncome(false);
    setNewIncome({
      name: '',
      amount: '',
      month: new Date().toISOString().split('T')[0].slice(0, 7),
    });
  };

  const handleDelete = (id: string) => {
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
          onPress: () => onDelete(id),
        },
      ]
    );
  };

  return (
    <Card style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Rendas Adicionais</Text>
        <Button
          title="Nova Renda"
          onPress={() => setIsAddingIncome(true)}
          size="sm"
        />
      </View>

      {isAddingIncome && (
        <AdditionalIncomeForm
          income={newIncome}
          onCancel={() => {
            setIsAddingIncome(false);
            setNewIncome({
              name: '',
              amount: '',
              month: new Date().toISOString().split('T')[0].slice(0, 7),
            });
          }}
          onSubmit={handleAdd}
          onChange={(field, value) => setNewIncome({ ...newIncome, [field]: value })}
        />
      )}

      <IncomeList
        incomes={incomes}
        onDelete={handleDelete}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold as any,
    color: colors.gray[900],
  },
});