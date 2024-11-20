import React from 'react';
import {
  ScrollView as RNScrollView,
  RefreshControl,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { colors } from '../../theme';

interface ScrollViewProps {
  children: React.ReactNode;
  refreshing?: boolean;
  onRefresh?: () => void;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
}

export default function ScrollView({
  children,
  refreshing = false,
  onRefresh,
  style,
  contentContainerStyle,
}: ScrollViewProps) {
  return (
    <RNScrollView
      style={[styles.container, style]}
      contentContainerStyle={contentContainerStyle}
      showsVerticalScrollIndicator={false}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        ) : undefined
      }
    >
      {children}
    </RNScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});