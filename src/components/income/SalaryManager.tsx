import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import { Card } from '../common/Card';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { colors, typography, spacing } from '../../theme';
import { formatCurrency } from '../../utils/formatters';

interface SalaryManagerProps {
  salary: number;
  onSave: (value: number) => void;
}

export default function SalaryManager({ salary, onSave }: SalaryManagerProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [salaryInput, setSalaryInput] = useState(
    salary ? (salary / 100).toFixed(2).replace('.', ',') : ''
  );

  const handleSave = () => {
    if (!salaryInput.trim()) {
      Alert.alert('Erro', 'Digite um valor válido');
      return;
    }

    const cleanValue = salaryInput.replace(/\./g, '').replace(',', '.');
    const salaryInCents = Math.round(parseFloat(cleanValue) * 100);

    if (isNaN(salaryInCents)) {
      Alert.alert('Erro', 'Valor inválido');
      return;
    }

    onSave(salaryInCents);
    setIsEditing(false);
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
      <Text style={styles.title}>Salário Principal</Text>
      
      {isEditing ? (
        <View style={styles.form}>
          <Input
            label="Valor do Salário"
            value={salaryInput}
            onChangeText={(text) => setSalaryInput(formatValue(text))}
            placeholder="0,00"
            keyboardType="decimal-pad"
          />
          
          <View style={styles.buttonContainer}>
            {salary > 0 && (
              <Button
                title="Cancelar"
                variant="outline"
                onPress={() => {
                  setIsEditing(false);
                  setSalaryInput((salary / 100).toFixed(2).replace('.', ','));
                }}
                style={styles.button}
              />
            )}
            <Button
              title={salary > 0 ? 'Atualizar' : 'Definir'}
              onPress={handleSave}
              style={styles.button}
            />
          </View>
        </View>
      ) : (
        <View style={styles.display}>
          <View>
            <Text style={styles.label}>Salário Atual</Text>
            <Text style={styles.value}>{formatCurrency(salary)}</Text>
          </View>
          <Button
            title="Editar"
            variant="outline"
            onPress={() => setIsEditing(true)}
          />
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold as any,
    color: colors.gray[900],
    marginBottom: spacing.md,
  },
  form: {
    backgroundColor: colors.gray[50],
    padding: spacing.md,
    borderRadius: spacing.md,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  button: {
    flex: 1,
  },
  display: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: typography.sizes.sm,
    color: colors.gray[600],
  },
  value: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.semibold as any,
    color: colors.gray[900],
    marginTop: spacing.xs,
  },
});