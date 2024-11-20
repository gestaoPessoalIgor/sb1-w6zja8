import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors, typography, spacing } from '../../theme';

interface Subtask {
  id: string;
  text: string;
  completed: boolean;
}

interface SubtaskListProps {
  subtasks: Subtask[];
  onRemove: (id: string) => void;
}

export default function SubtaskList({ subtasks, onRemove }: SubtaskListProps) {
  if (subtasks.length === 0) return null;

  return (
    <View style={styles.container}>
      {subtasks.map((subtask) => (
        <View key={subtask.id} style={styles.subtaskItem}>
          <Text style={styles.subtaskText}>{subtask.text}</Text>
          <TouchableOpacity
            onPress={() => onRemove(subtask.id)}
            style={styles.removeButton}
          >
            <Icon name="x" size={20} color={colors.error} />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  subtaskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray[50],
    padding: spacing.sm,
    borderRadius: spacing.md,
  },
  subtaskText: {
    flex: 1,
    fontSize: typography.sizes.sm,
    color: colors.gray[700],
  },
  removeButton: {
    padding: spacing.xs,
  },
});