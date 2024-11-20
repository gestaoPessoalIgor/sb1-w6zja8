import React from 'react';
import {
  SafeAreaView as RNSafeAreaView,
  StyleSheet,
  ViewStyle,
  StatusBar,
} from 'react-native';
import { colors } from '../../theme';

interface SafeAreaViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export default function SafeAreaView({ children, style }: SafeAreaViewProps) {
  return (
    <RNSafeAreaView style={[styles.container, style]}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.white}
      />
      {children}
    </RNSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});