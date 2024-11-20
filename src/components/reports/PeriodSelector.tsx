import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors, typography, spacing } from '../../theme';

interface PeriodSelectorProps {
  selectedMonth: string;
  onMonthSelect: () => void;
}

export default function PeriodSelector({
  selectedMonth,
  onMonthSelect,
}: PeriodSelectorProps) {
  return (
    <TouchableOpacity
      onPress={onMonthSelect}
      style={styles.container}
    >
      <Text style={styles.text}>
        {new Date(selectedMonth + '-01').toLocaleDateString('pt-BR', {
          month: 'long',
          year: 'numeric'
        })}
      </Text>
      <Icon name="chevron-down" size={20} color={colors.gray[500]} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: spacing.xl,
    marginBottom: spacing.lg,
  },
  text: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium as any,
    color: colors.gray[900],
    marginRight: spacing.sm,
  },
});