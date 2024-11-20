import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { colors, typography, spacing } from '../../theme';

const TASK_CATEGORIES = {
  work: { 
    label: 'Trabalho',
    color: colors.blue[100],
    textColor: colors.blue[800],
    icon: '💼'
  },
  training: { 
    label: 'Treino',
    color: colors.green[100],
    textColor: colors.green[800],
    icon: '🏃‍♂️'
  },
  study: { 
    label: 'Estudos',
    color: colors.purple[100],
    textColor: colors.purple[800],
    icon: '📚'
  },
  other: { 
    label: 'Outros',
    color: colors.gray[100],
    textColor: colors.gray[800],
    icon: '📌'
  }
};

interface CategorySelectorProps {
  selected: string;
  onSelect: (category: string) => void;
}

export default function CategorySelector({ selected, onSelect }: CategorySelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Categoria</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
      >
        {Object.entries(TASK_CATEGORIES).map(([key, { label, icon }]) => (
          <TouchableOpacity
            key={key}
            style={[
              styles.categoryButton,
              selected === key && styles.categoryButtonActive
            ]}
            onPress={() => onSelect(key)}
          >
            <Text style={styles.categoryIcon}>{icon}</Text>
            <Text style={[
              styles.categoryButtonText,
              selected === key && styles.categoryButtonTextActive
            ]}>
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium as any,
    color: colors.gray[700],
    marginBottom: spacing.sm,
  },
  categoryList: {
    gap: spacing.sm,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: spacing.xl,
    backgroundColor: colors.gray[100],
    gap: spacing.xs,
  },
  categoryButtonActive: {
    backgroundColor: colors.violet[100],
  },
  categoryIcon: {
    fontSize: typography.sizes.lg,
  },
  categoryButtonText: {
    fontSize: typography.sizes.sm,
    color: colors.gray[600],
  },
  categoryButtonTextActive: {
    color: colors.violet[600],
    fontWeight: typography.weights.medium as any,
  },
});