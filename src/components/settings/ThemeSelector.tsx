import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors, typography, spacing } from '../../theme';
import { useSettingsStore } from '../../store/useSettingsStore';
import Modal from '../common/Modal';

const themes = [
  { 
    value: 'light', 
    label: 'Claro', 
    icon: 'sun',
    description: 'Aparência clara para melhor visibilidade durante o dia'
  },
  { 
    value: 'dark', 
    label: 'Escuro', 
    icon: 'moon',
    description: 'Reduz o cansaço visual em ambientes com pouca luz'
  },
  { 
    value: 'system', 
    label: 'Padrão do Sistema', 
    icon: 'monitor',
    description: 'Adapta-se automaticamente às configurações do seu dispositivo'
  }
];

interface ThemeSelectorProps {
  visible: boolean;
  onClose: () => void;
}

export default function ThemeSelector({ visible, onClose }: ThemeSelectorProps) {
  const { theme, setTheme } = useSettingsStore();

  const handleThemeChange = (value: string) => {
    setTheme(value as 'light' | 'dark' | 'system');
    onClose();
  };

  return (
    <Modal visible={visible} onClose={onClose}>
      <Text style={styles.title}>Tema</Text>
      <View style={styles.options}>
        {themes.map(({ value, label, icon, description }) => (
          <TouchableOpacity
            key={value}
            style={[
              styles.option,
              theme === value && styles.optionSelected
            ]}
            onPress={() => handleThemeChange(value)}
          >
            <View style={[
              styles.iconContainer,
              theme === value && styles.iconContainerSelected
            ]}>
              <Icon name={icon} size={20} color={
                theme === value ? colors.violet[600] : colors.gray[600]
              } />
            </View>
            <View style={styles.optionContent}>
              <Text style={[
                styles.optionLabel,
                theme === value && styles.optionLabelSelected
              ]}>
                {label}
              </Text>
              <Text style={[
                styles.optionDescription,
                theme === value && styles.optionDescriptionSelected
              ]}>
                {description}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.semibold as any,
    color: colors.gray[900],
    marginBottom: spacing.lg,
  },
  options: {
    gap: spacing.sm,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    borderRadius: spacing.lg,
    backgroundColor: colors.white,
  },
  optionSelected: {
    backgroundColor: colors.violet[100],
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.gray[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  iconContainerSelected: {
    backgroundColor: colors.violet[200],
  },
  optionContent: {
    flex: 1,
  },
  optionLabel: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium as any,
    color: colors.gray[900],
    marginBottom: spacing.xs,
  },
  optionLabelSelected: {
    color: colors.violet[900],
  },
  optionDescription: {
    fontSize: typography.sizes.sm,
    color: colors.gray[500],
  },
  optionDescriptionSelected: {
    color: colors.violet[600],
  },
});