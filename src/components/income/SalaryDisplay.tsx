import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors, typography, spacing } from '../../theme';
import { formatCurrency } from '../../utils/formatters';

interface SalaryDisplayProps {
  salary: number;
  onEdit: () => void;
}

export default function SalaryDisplay({ salary, onEdit }: SalaryDisplayProps) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>Salário Atual</Text>
        <Text style={styles.value}>{formatCurrency(salary)}</Text>
      </View>
      <TouchableOpacity
        onPress={onEdit}
        style={styles.editButton}
      >
        <Icon name="edit-2" size={20} color={colors.gray[600]} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.gray[50],
    padding: spacing.md,
    borderRadius: spacing.md,
  },
  label: {
    fontSize: typography.sizes.sm,
    color: colors.gray[600],
    marginBottom: spacing.xs,
  },
  value: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.semibold as any,
    color: colors.gray[900],
  },
  editButton: {
    padding: spacing.sm,
    backgroundColor: colors.gray[100],
    borderRadius: spacing.md,
  },
});