import React from 'react';
import {
  Switch as RNSwitch,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { colors } from '../../theme';

interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  style?: ViewStyle;
}

export default function Switch({
  value,
  onValueChange,
  style,
}: SwitchProps) {
  return (
    <RNSwitch
      value={value}
      onValueChange={onValueChange}
      style={[styles.switch, style]}
      trackColor={{
        false: colors.gray[200],
        true: colors.violet[200],
      }}
      thumbColor={value ? colors.violet[600] : colors.white}
    />
  );
}

const styles = StyleSheet.create({
  switch: {
    transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
  },
});