import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors, typography, spacing } from '../../theme';

interface BadgeProps {
  label: string;
  variant?: 'default' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function Badge({
  label,
  variant = 'default',
  size = 'md',
  style,
  textStyle,
}: BadgeProps) {
  return (
    <View style={[
      styles.badge,
      styles[variant],
      styles[`size${size.toUpperCase()}`],
      style,
    ]}>
      <Text style={[
        styles.text,
        styles[`text${variant.charAt(0).toUpperCase() + variant.slice(1)}`],
        styles[`textSize${size.toUpperCase()}`],
        textStyle,
      ]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 999,
    alignSelf: 'flex-start',
  },
  default: {
    backgroundColor: colors.gray[100],
  },
  success: {
    backgroundColor: colors.green[100],
  },
  warning: {
    backgroundColor: colors.warning + '20',
  },
  error: {
    backgroundColor: colors.error + '20',
  },
  sizeSM: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
  },
  sizeMD: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  text: {
    fontWeight: typography.weights.medium as any,
  },
  textDefault: {
    color: colors.gray[800],
  },
  textSuccess: {
    color: colors.green[800],
  },
  textWarning: {
    color: colors.warning,
  },
  textError: {
    color: colors.error,
  },
  textSizeSM: {
    fontSize: typography.sizes.xs,
  },
  textSizeMD: {
    fontSize: typography.sizes.sm,
  },
});