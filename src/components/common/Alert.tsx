import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import { colors, typography, spacing } from '../../theme';

interface AlertButton {
  text: string;
  onPress: () => void;
  style?: 'default' | 'cancel' | 'destructive';
}

interface AlertProps {
  visible: boolean;
  title: string;
  message?: string;
  buttons?: AlertButton[];
  onClose: () => void;
}

export default function Alert({
  visible,
  title,
  message,
  buttons = [{ text: 'OK', onPress: () => {}, style: 'default' }],
  onClose,
}: AlertProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          {message && <Text style={styles.message}>{message}</Text>}
          <View style={styles.buttonContainer}>
            {buttons.map((button, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.button,
                  index > 0 && styles.buttonBorder,
                  button.style === 'cancel' && styles.cancelButton,
                ]}
                onPress={() => {
                  button.onPress();
                  onClose();
                }}
              >
                <Text
                  style={[
                    styles.buttonText,
                    button.style === 'destructive' && styles.destructiveText,
                    button.style === 'cancel' && styles.cancelText,
                  ]}
                >
                  {button.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: colors.white,
    borderRadius: 14,
    width: '80%',
    maxWidth: 320,
    padding: spacing.lg,
  },
  title: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold as any,
    color: colors.gray[900],
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  message: {
    fontSize: typography.sizes.md,
    color: colors.gray[600],
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: spacing.md,
  },
  button: {
    flex: 1,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  buttonBorder: {
    borderLeftWidth: 1,
    borderLeftColor: colors.gray[200],
  },
  buttonText: {
    fontSize: typography.sizes.md,
    color: colors.primary,
    fontWeight: typography.weights.medium as any,
  },
  destructiveText: {
    color: colors.error,
  },
  cancelButton: {
    backgroundColor: colors.gray[50],
  },
  cancelText: {
    color: colors.gray[600],
  },
});