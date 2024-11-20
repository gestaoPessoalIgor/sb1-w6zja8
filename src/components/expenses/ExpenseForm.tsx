import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { useExpenseStore } from '../../store/useExpenseStore';
import { useCardStore } from '../../store/useCardStore';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { DatePicker } from '../common/DatePicker';
import { colors, typography, spacing } from '../../theme';

const CATEGORIES = [
  { value: 'alimentacao', label: 'Alimentação', icon: '🍽️' },
  { value: 'transporte', label: 'Transporte', icon: '🚗' },
  { value: 'lazer', label: 'Lazer', icon: '🎮' },
  { value: 'contas', label: 'Contas', icon: '📝' },
  { value: 'outros', label: 'Outros', icon: '📦' },
];

const PAYMENT_METHODS = [
  { value: 'debit', label: 'Débito' },
  { value: 'credit', label: 'Crédito' },
  { value: 'cash', label: 'Dinheiro' },
  { value: 'pix', label: 'PIX' },
];

export default function ExpenseForm() {
  const navigation = useNavigation();
  const route = useRoute();
  const { addExpense, updateExpense, expenses } = useExpenseStore();
  const { cards } = useCardStore();

  const expenseId = route.params?.id;
  const isEditing = !!expenseId;

  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    category: 'outros',
    paymentMethod: 'debit',
    cardId: '',
    installments: '1',
    notes: '',
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isEditing) {
      const expense = expenses.find(e => e.id === expenseId);
      if (expense) {
        setFormData({
          description: expense.description,
          amount: (expense.amount / 100).toFixed(2),
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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.description.trim()) {
      newErrors.description = 'Descrição é obrigatória';
    }

    if (!formData.amount || isNaN(parseFloat(formData.amount))) {
      newErrors.amount = 'Valor inválido';
    }

    if (formData.paymentMethod === 'credit' && !formData.cardId) {
      newErrors.cardId = 'Selecione um cartão';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const amount = Math.round(parseFloat(formData.amount.replace(',', '.')) * 100);
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
    <ScrollView style={styles.container}>
      <Input
        label="Descrição"
        value={formData.description}
        onChangeText={(text) => setFormData({ ...formData, description: text })}
        placeholder="Ex: Supermercado"
        error={errors.description}
      />

      <Input
        label="Valor"
        value={formData.amount}
        onChangeText={(text) => {
          const formatted = text.replace(/[^\d,]/g, '');
          setFormData({ ...formData, amount: formatted });
        }}
        placeholder="0,00"
        keyboardType="decimal-pad"
        error={errors.amount}
      />

      <View style={styles.dateContainer}>
        <Text style={styles.label}>Data</Text>
        <Button
          title={new Date(formData.date).toLocaleDateString('pt-BR')}
          variant="outline"
          onPress={() => setShowDatePicker(true)}
        />
      </View>

      <View style={styles.categoryContainer}>
        <Text style={styles.label}>Categoria</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        >
          {CATEGORIES.map(({ value, label, icon }) => (
            <Button
              key={value}
              title={`${icon} ${label}`}
              variant={formData.category === value ? 'primary' : 'outline'}
              onPress={() => setFormData({ ...formData, category: value })}
              style={styles.categoryButton}
            />
          ))}
        </ScrollView>
      </View>

      <View style={styles.paymentContainer}>
        <Text style={styles.label}>Forma de Pagamento</Text>
        <View style={styles.paymentMethods}>
          {PAYMENT_METHODS.map(({ value, label }) => (
            <Button
              key={value}
              title={label}
              variant={formData.paymentMethod === value ? 'primary' : 'outline'}
              onPress={() => setFormData({ ...formData, paymentMethod: value })}
              style={styles.paymentButton}
            />
          ))}
        </View>
      </View>

      {formData.paymentMethod === 'credit' && (
        <>
          <View style={styles.cardContainer}>
            <Text style={styles.label}>Cartão</Text>
            <View style={styles.cardList}>
              {cards.map((card) => (
                <Button
                  key={card.id}
                  title={`${card.name} (*${card.lastDigits})`}
                  variant={formData.cardId === card.id ? 'primary' : 'outline'}
                  onPress={() => setFormData({ ...formData, cardId: card.id })}
                  style={styles.cardButton}
                />
              ))}
            </View>
            {errors.cardId && (
              <Text style={styles.errorText}>{errors.cardId}</Text>
            )}
          </View>

          <Input
            label="Parcelas"
            value={formData.installments}
            onChangeText={(text) => setFormData({ ...formData, installments: text })}
            keyboardType="number-pad"
            placeholder="1"
          />
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
          title={isEditing ? 'Atualizar' : 'Adicionar'}
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
  categoryContainer: {
    marginBottom: spacing.lg,
  },
  categoryList: {
    gap: spacing.sm,
  },
  categoryButton: {
    minWidth: 120,
  },
  paymentContainer: {
    marginBottom: spacing.lg,
  },
  paymentMethods: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  paymentButton: {
    flex: 1,
    minWidth: '45%',
  },
  cardContainer: {
    marginBottom: spacing.lg,
  },
  cardList: {
    gap: spacing.sm,
  },
  cardButton: {
    width: '100%',
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
  errorText: {
    fontSize: typography.sizes.sm,
    color: colors.error,
    marginTop: spacing.xs,
  },
});