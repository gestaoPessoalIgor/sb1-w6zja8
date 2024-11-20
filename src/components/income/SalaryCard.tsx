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

interface SalaryCardProps {
  salary: number;
  onEdit: () => void;
}

export function SalaryCard({ salary, onEdit }: SalaryCardProps) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>Salário Atual</Text>
        <Text style={styles.amount}>{formatCurrency(salary)}</Text>
      </View>
      <TouchableOpacity onPress={onEdit} style={styles.editButton}>
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
  },
  amount: {
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