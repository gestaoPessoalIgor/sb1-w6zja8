import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useExpenseStore } from '../store/useExpenseStore';
import { useCardStore } from '../store/useCardStore';
import ScreenContainer from '../components/common/ScreenContainer';
import Header from '../components/common/Header';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { colors, typography, spacing } from '../theme';
import DatePicker from '../components/common/DatePicker';
import CategorySelector from '../components/expenses/CategorySelector';
import PaymentMethodSelector from '../components/expenses/PaymentMethodSelector';
import CardSelector from '../components/expenses/CardSelector';

const INITIAL_FORM_DATA = {
  description: '',
  amount: '',
  date: new Date().toISOString().split('T')[0],
  category: 'outros',
  paymentMethod: 'debit',
  cardId: '',
  installments: '1',
  notes: '',
};

export default function ExpenseFormScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { expenses, addExpense, updateExpense } = useExpenseStore();
  const { cards } = useCardStore();
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const expenseId = route.params?.id;
  const isEditing = !!expenseId;

  useEffect(() => {
    if (isEditing) {
      const expense = expenses.find(e => e.id === expenseId);
      if (expense) {
        setFormData({
          description: expense.description,
          amount: (expense.amount / 100).toFixed(2).replace('.', ','),
          date: expense.date,
          category: expense.category,
          paymentMethod: expense.paymentMethod,
          cardId: expense.cardId || '',
          installments: expense.installments?.toString() || '1',
          notes: expense.notes || '',
        });
      }
    }
  }, [isEditing, expenseId, expenses]);

  const formatValue = (value: string) => {
    let cleanValue = value.replace(/[^\d,]/g, '');
    const parts = cleanValue.split(',');
    if (parts.length > 2) {
      cleanValue = parts[0] + ',' + parts[1];
    }
    if (parts.length === 2 && parts[1].length > 2) {
      cleanValue = parts[0] + ',' + parts[1].slice(0, 2);
    }
    return cleanValue;
  };

  const handleSubmit = () => {
    if (!formData.description || !formData.amount) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios');
      return;
    }

    if (formData.paymentMethod === 'credit' && !formData.cardId) {
      Alert.alert('Erro', 'Selecione um cartão');
      return;
    }

    const cleanValue = formData.amount.replace(/\./g, '').replace(',', '.');
    const amount = Math.round(parseFloat(cleanValue) * 100);
    
    if (isNaN(amount)) {
      Alert.alert('Erro', 'Valor inválido');
      return;
    }

    const expenseData = {
      description: formData.description,
      amount,
      date: formData.date,
      category: formData.category,
      paymentMethod: formData.paymentMethod,
      cardId: formData.paymentMethod === 'credit' ? formData.cardId : undefined,
      installments: formData.paymentMethod === 'credit' ? parseInt(formData.installments) : undefined,
      notes: formData.notes || undefined,
    };

    try {
      if (isEditing) {
        updateExpense(expenseId, expenseData);
      } else {
        addExpense(expenseData);
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar a despesa');
    }
  };

  return (
    <ScreenContainer>
      <Header
        title={isEditing ? 'Editar Despesa' : 'Nova Despesa'}
        showBackButton
      />
      <ScrollView style={styles.container}>
        <Input
          label="Descrição"
          value={formData.description}
          onChangeText={(text) => setFormData({ ...formData, description: text })}
          placeholder="Ex: Supermercado"
        />

        <Input
          label="Valor"
          value={formData.amount}
          onChangeText={(text) => setFormData({ 
            ...formData, 
            amount: formatValue(text)
          })}
          placeholder="0,00"
          keyboardType="decimal-pad"
        />

        <View style={styles.dateContainer}>
          <Text style={styles.label}>Data</Text>
          <Button
            title={new Date(formData.date).toLocaleDateString('pt-BR')}
            variant="outline"
            onPress={() => setShowDatePicker(true)}
          />
        </View>

        <CategorySelector
          selected={formData.category}
          onSelect={(category) => setFormData({ ...formData, category })}
        />

        <PaymentMethodSelector
          selected={formData.paymentMethod}
          onSelect={(method) => setFormData({ 
            ...formData, 
            paymentMethod: method,
            cardId: '',
            installments: '1'
          })}
        />

        {formData.paymentMethod === 'credit' && (
          <>
            <CardSelector
              cards={cards}
              selectedCardId={formData.cardId}
              onSelect={(cardId) => setFormData({ ...formData, cardId })}
            />

            <View style={styles.installmentsContainer}>
              <Text style={styles.label}>Parcelas</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.installmentsList}
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
                  <Button
                    key={num}
                    title={`${num}x ${num === 1 ? 'à vista' : ''}`}
                    variant={formData.installments === num.toString() ? 'primary' : 'outline'}
                    onPress={() => setFormData({ ...formData, installments: num.toString() })}
                    style={styles.installmentButton}
                  />
                ))}
              </ScrollView>
            </View>
          </>
        )}

        <Input
          label="Observações"
          value={formData.notes}
          onChangeText={(text) => setFormData({ ...formData, notes: text })}
          placeholder="Adicione observações (opcional)"
          multiline
          numberOfLines={3}
          style={styles.notesInput}
        />

        <View style={styles.buttonContainer}>
          <Button
            title="Cancelar"
            variant="outline"
            onPress={() => navigation.goBack()}
            style={styles.button}
          />
          <Button
            title={isEditing ? 'Atualizar' : 'Criar'}
            onPress={handleSubmit}
            style={styles.button}
          />
        </View>

        <DatePicker
          visible={showDatePicker}
          onClose={() => setShowDatePicker(false)}
          onSelect={(date) => {
            setFormData({ ...formData, date });
            setShowDatePicker(false);
          }}
          selectedDate={formData.date}
        />
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
  },
  label: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium as any,
    color: colors.gray[700],
    marginBottom: spacing.sm,
  },
  dateContainer: {
    marginBottom: spacing.lg,
  },
  installmentsContainer: {
    marginBottom: spacing.lg,
  },
  installmentsList: {
    gap: spacing.sm,
  },
  installmentButton: {
    minWidth: 80,
  },
  notesInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.xl,
    marginBottom: spacing.xxl,
  },
  button: {
    flex: 1,
  },
});