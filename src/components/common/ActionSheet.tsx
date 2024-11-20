import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors, typography, spacing } from '../../theme';
import BottomSheet from './BottomSheet';

interface ActionSheetOption {
  label: string;
  icon?: string;
  onPress: () => void;
  destructive?: boolean;
}

interface ActionSheetProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  options: ActionSheetOption[];
  style?: ViewStyle;
}

export default function ActionSheet({
  visible,
  onClose,
  title,
  options,
  style,
}: ActionSheetProps) {
  return (
    <BottomSheet visible={visible} onClose={onClose}>
      <View style={[styles.container, style]}>
        {title && <Text style={styles.title}>{title}</Text>}
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.option}
            onPress={() => {
              option.onPress();
              onClose();
            }}
          >
            {option.icon && (
              <Icon
                name={option.icon}
                size={20}
                color={option.destructive ? colors.error : colors.gray[600]}
                style={styles.icon}
              />
            )}
            <Text
              style={[
                styles.optionText,
                option.destructive && styles.destructiveText,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
          <Text style={styles.cancelText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing.md,
  },
  title: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold as any,
    color: colors.gray[900],
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  icon: {
    marginRight: spacing.md,
  },
  optionText: {
    fontSize: typography.sizes.md,
    color: colors.gray[900],
  },
  destructiveText: {
    color: colors.error,
  },
  cancelButton: {
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
    paddingVertical: spacing.md,
    marginTop: spacing.md,
  },
  cancelText: {
    fontSize: typography.sizes.md,
    color: colors.gray[600],
    textAlign: 'center',
  },
});