import React from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors, spacing } from '../../theme';

interface CheckboxProps {
  checked: boolean;
  onToggle: () => void;
  style?: ViewStyle;
}

export default function Checkbox({
  checked,
  onToggle,
  style,
}: CheckboxProps) {
  return (
    <TouchableOpacity
      onPress={onToggle}
      style={[styles.container, style]}
    >
      <View style={[
        styles.checkbox,
        checked && styles.checked,
      ]}>
        {checked && (
          <Icon name="check" size={12} color={colors.white} />
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.xs,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.gray[300],
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    backgroundColor: colors.violet[600],
    borderColor: colors.violet[600],
  },
});