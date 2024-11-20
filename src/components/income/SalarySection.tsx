import React from 'react';
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
import { formatCurrency } from '../../utils/formatters';

interface SalarySectionProps {
  salary: number;
  isEditing: boolean;
  salaryInput: string;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
  onInputChange: (value: string) => void;
}

export default function SalarySection({
  salary,
  isEditing,
  salaryInput,
  onEdit,
  onCancel,
  onSave,
  onInputChange,
}: SalarySectionProps) {
  return (
    <Card style={styles.card}>
      <Text style={styles.cardTitle}>Salário Principal</Text>
      {isEditing ? (
        <View style={styles.formContainer}>
          <Input
            label="Valor do Salário"
            value={salaryInput}
            onChangeText={onInputChange}
            placeholder="0,00"
            keyboardType="decimal-pad"
          />
          <View style={styles.buttonContainer}>
            {salary > 0 && (
              <Button
                title="Cancelar"
                variant="outline"
                onPress={onCancel}
                style={styles.button}
              />
            )}
            <Button
              title={salary > 0 ? 'Atualizar Salário' : 'Definir Salário'}
              onPress={onSave}
              style={styles.button}
            />
          </View>
        </View>
      ) : (
        <View style={styles.salaryContainer}>
          <View>
            <Text style={styles.salaryLabel}>Salário Atual</Text>
            <Text style={styles.salaryValue}>
              {formatCurrency(salary)}
            </Text>
          </View>
          <TouchableOpacity
            onPress={onEdit}
            style={styles.editButton}
          >
            <Icon name="edit-2" size={20} color={colors.gray[600]} />
          </TouchableOpacity>
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.lg,
  },
  cardTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold as any,
    color: colors.gray[900],
    marginBottom: spacing.md,
  },
  formContainer: {
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
  salaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  salaryLabel: {
    fontSize: typography.sizes.sm,
    color: colors.gray[600],
  },
  salaryValue: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.semibold as any,
    color: colors.gray[900],
    marginTop: spacing.xs,
  },
  editButton: {
    padding: spacing.sm,
    borderRadius: spacing.sm,
    backgroundColor: colors.gray[100],
  },
});