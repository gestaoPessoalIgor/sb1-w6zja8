import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors, typography, spacing } from '../../theme';

interface SettingsOption {
  icon: string;
  label: string;
  onPress: () => void;
  value?: string;
  destructive?: boolean;
}

interface SettingsSectionProps {
  title: string;
  options: SettingsOption[];
}

export default function SettingsSection({ title, options }: SettingsSectionProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.optionsContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.option,
              index === options.length - 1 && styles.lastOption,
            ]}
            onPress={option.onPress}
          >
            <View style={styles.optionContent}>
              <View style={[
                styles.iconContainer,
                option.destructive && styles.destructiveIconContainer
              ]}>
                <Icon 
                  name={option.icon} 
                  size={20} 
                  color={option.destructive ? colors.error : colors.gray[600]} 
                />
              </View>
              <Text style={[
                styles.optionLabel,
                option.destructive && styles.destructiveLabel
              ]}>
                {option.label}
              </Text>
            </View>
            {option.value ? (
              <Text style={styles.optionValue}>{option.value}</Text>
            ) : (
              <Icon name="chevron-right" size={20} color={colors.gray[400]} />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium as any,
    color: colors.gray[500],
    marginLeft: spacing.lg,
    marginBottom: spacing.sm,
  },
  optionsContainer: {
    backgroundColor: colors.white,
    borderRadius: spacing.lg,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  lastOption: {
    borderBottomWidth: 0,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.gray[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  destructiveIconContainer: {
    backgroundColor: colors.error + '10',
  },
  optionLabel: {
    fontSize: typography.sizes.md,
    color: colors.gray[900],
  },
  destructiveLabel: {
    color: colors.error,
  },
  optionValue: {
    fontSize: typography.sizes.md,
    color: colors.gray[500],
  },
});