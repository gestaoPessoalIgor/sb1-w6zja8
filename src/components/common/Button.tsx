import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors, typography, spacing } from '../../theme';

interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function Button({
  onPress,
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  style,
  textStyle,
}: ButtonProps) {
  const buttonStyles = [
    styles.base,
    styles[variant],
    styles[`size${size.toUpperCase()}`],
    disabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`text${variant.charAt(0).toUpperCase() + variant.slice(1)}`],
    styles[`textSize${size.toUpperCase()}`],
    disabled && styles.textDisabled,
    textStyle,
  ];

  return (
    <TouchableOpacity
      onPress={onPress}
      style={buttonStyles}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? colors.primary : colors.white} />
      ) : (
        <Text style={textStyles}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.gray[100],
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.gray[300],
  },
  sizeSM: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  sizeMD: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  sizeLG: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontWeight: typography.weights.medium as any,
  },
  textPrimary: {
    color: colors.white,
  },
  textSecondary: {
    color: colors.gray[900],
  },
  textOutline: {
    color: colors.gray[700],
  },
  textSizeSM: {
    fontSize: typography.sizes.sm,
  },
  textSizeMD: {
    fontSize: typography.sizes.md,
  },
  textSizeLG: {
    fontSize: typography.sizes.lg,
  },
  textDisabled: {
    color: colors.gray[500],
  },
});