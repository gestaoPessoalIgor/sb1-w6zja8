import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors, typography, spacing } from '../../theme';

interface AddIncomeButtonProps {
  onPress: () => void;
}

export default function AddIncomeButton({ onPress }: AddIncomeButtonProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
    >
      <Icon name="plus" size={20} color={colors.white} />
      <Text style={styles.text}>Nova Renda</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: spacing.lg,
    gap: spacing.sm,
  },
  text: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium as any,
    color: colors.white,
  },
});