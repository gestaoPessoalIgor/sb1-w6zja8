import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { colors, spacing } from '../../theme';

interface SalaryInputProps {
  value: string;
  onChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  showCancel?: boolean;
}

export default function SalaryInput({
  value,
  onChange,
  onSave,
  onCancel,
  showCancel = true,
}: SalaryInputProps) {
  const formatValue = (text: string) => {
    let cleanValue = text.replace(/[^\d,]/g, '');
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
        label="Valor do Salário"
        value={value}
        onChangeText={(text) => onChange(formatValue(text))}
        placeholder="0,00"
        keyboardType="decimal-pad"
      />
      
      <View style={styles.buttonContainer}>
        {showCancel && (
          <Button
            title="Cancelar"
            variant="outline"
            onPress={onCancel}
            style={styles.button}
          />
        )}
        <Button
          title={showCancel ? 'Atualizar' : 'Definir'}
          onPress={onSave}
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