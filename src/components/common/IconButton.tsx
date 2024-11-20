import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors, spacing } from '../../theme';

interface IconButtonProps {
  icon: string;
  size?: number;
  color?: string;
  variant?: 'default' | 'primary' | 'error';
  onPress: () => void;
  style?: ViewStyle;
}

export default function IconButton({
  icon,
  size = 24,
  color,
  variant = 'default',
  onPress,
  style,
}: IconButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        styles[variant],
        style,
      ]}
    >
      <Icon
        name={icon}
        size={size}
        color={color || styles[`${variant}Icon`].color}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  default: {
    backgroundColor: colors.gray[100],
  },
  primary: {
    backgroundColor: colors.primary + '20',
  },
  error: {
    backgroundColor: colors.error + '20',
  },
  defaultIcon: {
    color: colors.gray[600],
  },
  primaryIcon: {
    color: colors.primary,
  },
  errorIcon: {
    color: colors.error,
  },
});