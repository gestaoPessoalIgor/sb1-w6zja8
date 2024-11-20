import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Alert,
} from 'react-native';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { colors, spacing } from '../../theme';

interface SalaryFormProps {
  initialValue: string;
  onSubmit: (value: string) => void;
  onCancel: () => void;
}

export function SalaryForm({ initialValue, onSubmit, onCancel }: SalaryFormProps) {
  const [value, setValue] = useState(initialValue);

  const handleSubmit = () => {
    if (!value.trim()) {
      Alert.alert('Erro', 'Digite um valor válido');
      return;
    }

    onSubmit(value);
  };

  return (
    <View style={styles.container}>
      <Input
        label="Valor do Salário"
        value={value}
        onChangeText={(text) => {
          const formatted = text.replace(/[^\d,]/g, '');
          setValue(formatted);
        }}
        placeholder="0,00"
        keyboardType="decimal-pad"
      />

      <View style={styles.buttonContainer}>
        <Button
          title="Cancelar"
          variant="outline"
          onPress={onCancel}
          style={styles.button}
        />
        <Button
          title="Salvar"
          onPress={handleSubmit}
          style={styles.button}
        />
      </View>
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
  buttonContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  button: {
    flex: 1,
  },
});