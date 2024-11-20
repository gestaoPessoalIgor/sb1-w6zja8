import React, { useEffect } from 'react';
import {
  Animated,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors, typography, spacing } from '../../theme';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'warning';
  duration?: number;
  onClose: () => void;
}

export default function Toast({
  message,
  type = 'success',
  duration = 3000,
  onClose,
}: ToastProps) {
  const translateY = new Animated.Value(-100);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(duration),
      Animated.timing(translateY, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => onClose());
  }, []);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return 'check-circle';
      case 'error':
        return 'x-circle';
      case 'warning':
        return 'alert-circle';
      default:
        return 'info';
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        styles[type],
        { transform: [{ translateY }] },
      ]}
    >
      <Icon name={getIcon()} size={20} color={colors.white} />
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity onPress={onClose}>
        <Icon name="x" size={20} color={colors.white} />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    margin: spacing.md,
    borderRadius: spacing.md,
    zIndex: 1000,
  },
  success: {
    backgroundColor: colors.success,
  },
  error: {
    backgroundColor: colors.error,
  },
  warning: {
    backgroundColor: colors.warning,
  },
  message: {
    flex: 1,
    marginHorizontal: spacing.md,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium as any,
    color: colors.white,
  },
});