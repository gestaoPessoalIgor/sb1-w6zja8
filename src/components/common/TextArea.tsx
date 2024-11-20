import React from 'react';
import {
  TextInput,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors, typography, spacing } from '../../theme';

interface TextAreaProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  numberOfLines?: number;
  maxLength?: number;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function TextArea({
  value,
  onChangeText,
  placeholder,
  numberOfLines = 4,
  maxLength,
  style,
  textStyle,
}: TextAreaProps) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={colors.gray[400]}
      multiline
      numberOfLines={numberOfLines}
      maxLength={maxLength}
      style={[styles.input, style, textStyle]}
      textAlignVertical="top"
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: spacing.md,
    padding: spacing.md,
    fontSize: typography.sizes.md,
    color: colors.gray[900],
    minHeight: 100,
  },
});