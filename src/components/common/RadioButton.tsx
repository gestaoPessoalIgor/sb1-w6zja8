import React from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { colors, spacing } from '../../theme';

interface RadioButtonProps {
  selected: boolean;
  onSelect: () => void;
  style?: ViewStyle;
}

export default function RadioButton({
  selected,
  onSelect,
  style,
}: RadioButtonProps) {
  return (
    <TouchableOpacity
      onPress={onSelect}
      style={[styles.container, style]}
    >
      <View style={[
        styles.radio,
        selected && styles.radioSelected,
      ]}>
        {selected && <View style={styles.dot} />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.xs,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.gray[300],
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: colors.violet[600],
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.violet[600],
  },
});