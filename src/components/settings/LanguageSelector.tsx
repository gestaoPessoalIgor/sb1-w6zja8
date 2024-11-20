import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { colors, typography, spacing } from '../../theme';
import { useSettingsStore } from '../../store/useSettingsStore';
import Modal from '../common/Modal';

const languages = [
  { value: 'pt-BR', label: 'Português (Brasil)', flag: '🇧🇷' },
  { value: 'en-US', label: 'English (US)', flag: '🇺🇸' },
  { value: 'es-ES', label: 'Español', flag: '🇪🇸' },
];

interface LanguageSelectorProps {
  visible: boolean;
  onClose: () => void;
}

export default function LanguageSelector({ visible, onClose }: LanguageSelectorProps) {
  const { language, setLanguage } = useSettingsStore();

  const handleLanguageChange = (value: string) => {
    setLanguage(value as 'pt-BR' | 'en-US' | 'es-ES');
    onClose();
  };

  return (
    <Modal visible={visible} onClose={onClose}>
      <Text style={styles.title}>Idioma</Text>
      <View style={styles.options}>
        {languages.map(({ value, label, flag }) => (
          <TouchableOpacity
            key={value}
            style={[
              styles.option,
              language === value && styles.optionSelected
            ]}
            onPress={() => handleLanguageChange(value)}
          >
            <Text style={styles.flag}>{flag}</Text>
            <View style={styles.optionContent}>
              <Text style={[
                styles.optionLabel,
                language === value && styles.optionLabelSelected
              ]}>
                {label}
              </Text>
              {language === value && (
                <Text style={styles.selectedText}>Selecionado</Text>
              )}
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
  flag: {
    fontSize: typography.sizes.xl,
    marginRight: spacing.md,
  },
  optionContent: {
    flex: 1,
  },
  optionLabel: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium as any,
    color: colors.gray[900],
  },
  optionLabelSelected: {
    color: colors.violet[900],
  },
  selectedText: {
    fontSize: typography.sizes.sm,
    color: colors.violet[600],
    marginTop: spacing.xs,
  },
});