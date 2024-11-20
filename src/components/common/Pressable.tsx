import React from 'react';
import {
  Pressable as RNPressable,
  StyleSheet,
  ViewStyle,
  PressableProps as RNPressableProps,
} from 'react-native';
import { colors } from '../../theme';

interface PressableProps extends RNPressableProps {
  children: React.ReactNode;
  style?: ViewStyle | ((state: { pressed: boolean }) => ViewStyle);
}

export default function Pressable({
  children,
  style,
  ...props
}: PressableProps) {
  return (
    <RNPressable
      style={({ pressed }) => [
        styles.base,
        typeof style === 'function' ? style({ pressed }) : style,
        pressed && styles.pressed,
      ]}
      android_ripple={{ color: colors.gray[200] }}
      {...props}
    >
      {children}
    </RNPressable>
  );
}

const styles = StyleSheet.create({
  base: {
    opacity: 1,
  },
  pressed: {
    opacity: 0.7,
  },
});