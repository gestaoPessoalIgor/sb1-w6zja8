import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors, typography, spacing } from '../../theme';

const PAYMENT_METHODS = [
  { value: 'debit', label: 'Débito', icon: 'dollar-sign' },
  { value: 'credit', label: 'Crédito', icon: 'credit-card' },
  { value: 'cash', label: 'Dinheiro', icon: 'dollar-sign' },
  { value: 'pix', label: 'PIX', icon: 'smartphone' },
];

interface PaymentMethodSelectorProps {
  selected: string;
  onSelect: (method: string) => void;
}

export default function PaymentMethodSelector({ selected, onSelect }: PaymentMethodSelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Forma de Pagamento</Text>
      <View style={styles.methodsGrid}>
        {PAYMENT_METHODS.map(({ value, label, icon }) => (
          <TouchableOpacity
            key={value}
            style={[
              styles.methodButton,
              selected === value && styles.methodButtonActive
            ]}
            onPress={() => onSelect(value)}
          >
            <Icon 
              name={icon} 
              size={20} 
              color={selected === value ? colors.violet[600] : colors.gray[600]} 
            />
            <Text style={[
              styles.methodButtonText,
              selected === value && styles.methodButtonTextActive
            ]}>
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium as any,
    color: colors.gray[700],
    marginBottom: spacing.sm,
  },
  methodsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  methodButton: {
    flex: 1,
    minWidth: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
    backgroundColor: colors.gray[100],
    borderRadius: spacing.lg,
  },
  methodButtonActive: {
    backgroundColor: colors.violet[100],
  },
  methodButtonText: {
    fontSize: typography.sizes.sm,
    color: colors.gray[600],
  },
  methodButtonTextActive: {
    color: colors.violet[600],
    fontWeight: typography.weights.medium as any,
  },
});