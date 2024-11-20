import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { colors, typography, spacing } from '../../theme';
import MonthPicker from './MonthPicker';

interface AdditionalIncomeFormProps {
  income: {
    name: string;
    amount: string;
    month: string;
  };
  onCancel: () => void;
  onSubmit: () => void;
  onChange: (field: string, value: string) => void;
}

export default function AdditionalIncomeForm({
  income,
  onCancel,
  onSubmit,
  onChange,
}: AdditionalIncomeFormProps) {
  const [showMonthPicker, setShowMonthPicker] = useState(false);

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

  return (
    <View style={styles.container}>
      <Input
        label="Nome da Renda"
        value={income.name}
        onChangeText={(text) => onChange('name', text)}
        placeholder="Ex: Freelance"
      />

      <Input
        label="Valor"
        value={income.amount}
        onChangeText={(text) => onChange('amount', formatValue(text))}
        placeholder="0,00"
        keyboardType="decimal-pad"
      />

      <View style={styles.monthField}>
        <Text style={styles.label}>Mês de Referência</Text>
        <TouchableOpacity
          style={styles.monthSelector}
          onPress={() => setShowMonthPicker(true)}
        >
          <Text style={styles.monthText}>
            {new Date(income.month + '-01').toLocaleDateString('pt-BR', {
              month: 'long',
              year: 'numeric'
            })}
          </Text>
          <Icon name="calendar" size={20} color={colors.gray[500]} />
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Cancelar"
          variant="outline"
          onPress={onCancel}
          style={styles.button}
        />
        <Button
          title="Adicionar"
          onPress={onSubmit}
          style={styles.button}
        />
      </View>

      <MonthPicker
        visible={showMonthPicker}
        onClose={() => setShowMonthPicker(false)}
        onSelect={(month) => {
          onChange('month', month);
          setShowMonthPicker(false);
        }}
        selectedMonth={income.month}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray[50],
    padding: spacing.md,
    borderRadius: spacing.md,
    marginBottom: spacing.lg,
  },
  monthField: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium as any,
    color: colors.gray[700],
    marginBottom: spacing.xs,
  },
  monthSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  monthText: {
    fontSize: typography.sizes.md,
    color: colors.gray[900],
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  button: {
    flex: 1,
  },
});