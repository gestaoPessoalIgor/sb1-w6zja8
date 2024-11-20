import React from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ViewStyle,
} from 'react-native';
import { colors } from '../../theme';

interface ScreenContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export default function ScreenContainer({ children, style }: ScreenContainerProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.white}
      />
      <View style={[styles.container, style]}>
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});