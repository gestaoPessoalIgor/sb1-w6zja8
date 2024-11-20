import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Card } from '../common/Card';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { colors, typography, spacing } from '../../theme';
import MonthPicker from './MonthPicker';

interface IncomeFormData {
  name: string;
  amount: string;
  month: string;
}

interface IncomeFormProps {
  onSubmit: (data: IncomeFormData) => void;
  onCancel: () => void;
}

export default function IncomeForm({
  onSubmit,
  onCancel,
}: IncomeFormProps) {
  const [formData, setFormData] = useState<IncomeFormData>({
    name: '',
    amount: '',
    month: new Date().toISOString().slice(0, 7),
  });
  const [showMonthPicker, setShowMonthPicker] = useState(false);

  const handleSubmit = () => {
    if (!formData.name.trim() || !formData.amount.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios');
      return;
    }

    onSubmit(formData);
  };

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
    <Card style={styles.container}>
      <Input
        label="Nome da Renda"
        value={formData.name}
        onChangeText={(text) => setFormData({ ...formData, name: text })}
        placeholder="Ex: Freelance"
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

      <View style={styles.monthField}>
        <Text style={styles.label}>Mês de Referência</Text>
        <TouchableOpacity
          style={styles.monthSelector}
          onPress={() => setShowMonthPicker(true)}
        >
          <Text style={styles.monthText}>
            {new Date(formData.month + '-01').toLocaleDateString('pt-BR', {
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
          onPress={handleSubmit}
          style={styles.button}
        />
      </View>

      <MonthPicker
        visible={showMonthPicker}
        onClose={() => setShowMonthPicker(false)}
        onSelect={(month) => {
          setFormData({ ...formData, month });
          setShowMonthPicker(false);
        }}
        selectedMonth={formData.month}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
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
    marginTop: spacing.lg,
  },
  button: {
    flex: 1,
  },
});