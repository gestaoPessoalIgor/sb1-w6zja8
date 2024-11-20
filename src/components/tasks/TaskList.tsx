import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { useTaskStore } from '../../store/useTaskStore';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
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

export default function TaskList() {
  const navigation = useNavigation();
  const { tasks, removeTask, toggleSubtask } = useTaskStore();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredTasks = selectedCategory
    ? tasks.filter(task => task.category === selectedCategory)
    : tasks;

  const sortedTasks = [...filteredTasks].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const handleEditTask = (id: string) => {
    navigation.navigate('TaskForm' as never, { id } as never);
  };

  const handleDeleteTask = (id: string) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir esta tarefa?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => removeTask(id),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryList}
        contentContainerStyle={styles.categoryContent}
      >
        {Object.entries(TASK_CATEGORIES).map(([key, { label, icon }]) => (
          <TouchableOpacity
            key={key}
            style={[
              styles.categoryButton,
              selectedCategory === key && styles.categoryButtonActive
            ]}
            onPress={() => setSelectedCategory(
              selectedCategory === key ? null : key
            )}
          >
            <Text style={styles.categoryIcon}>{icon}</Text>
            <Text style={[
              styles.categoryButtonText,
              selectedCategory === key && styles.categoryButtonTextActive
            ]}>
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {sortedTasks.map((task) => (
        <Card key={task.id} style={styles.taskCard}>
          <View style={styles.taskHeader}>
            <View>
              <Text style={styles.taskTitle}>{task.title}</Text>
              <View style={styles.taskMeta}>
                <View style={styles.metaItem}>
                  <Icon name="calendar" size={14} color={colors.gray[500]} />
                  <Text style={styles.metaText}>
                    {new Date(task.date).toLocaleDateString('pt-BR')}
                  </Text>
                </View>
                {task.time && (
                  <View style={styles.metaItem}>
                    <Icon name="clock" size={14} color={colors.gray[500]} />
                    <Text style={styles.metaText}>{task.time}</Text>
                  </View>
                )}
              </View>
            </View>
            <View style={styles.taskActions}>
              <TouchableOpacity
                onPress={() => handleEditTask(task.id)}
                style={styles.actionButton}
              >
                <Icon name="edit-2" size={16} color={colors.gray[600]} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDeleteTask(task.id)}
                style={[styles.actionButton, styles.deleteButton]}
              >
                <Icon name="trash-2" size={16} color={colors.error} />
              </TouchableOpacity>
            </View>
          </View>

          {task.subtasks.length > 0 && (
            <View style={styles.subtaskList}>
              {task.subtasks.map((subtask) => (
                <TouchableOpacity
                  key={subtask.id}
                  onPress={() => toggleSubtask(task.id, subtask.id)}
                  style={styles.subtaskItem}
                >
                  <View style={[
                    styles.checkbox,
                    subtask.completed && styles.checkboxChecked
                  ]}>
                    {subtask.completed && (
                      <Icon name="check" size={12} color={colors.white} />
                    )}
                  </View>
                  <Text style={[
                    styles.subtaskText,
                    subtask.completed && styles.subtaskTextCompleted
                  ]}>
                    {subtask.text}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {task.notes && (
            <View style={styles.notes}>
              <Icon name="message-square" size={14} color={colors.gray[500]} />
              <Text style={styles.notesText}>{task.notes}</Text>
            </View>
          )}
        </Card>
      ))}

      {sortedTasks.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>
            Nenhuma tarefa encontrada
          </Text>
          <Button
            title="Criar Nova Tarefa"
            onPress={() => navigation.navigate('TaskForm' as never)}
            style={styles.emptyStateButton}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categoryList: {
    marginBottom: spacing.lg,
  },
  categoryContent: {
    paddingHorizontal: spacing.lg,
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
  taskCard: {
    marginBottom: spacing.md,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  taskTitle: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium as any,
    color: colors.gray[900],
    marginBottom: spacing.xs,
  },
  taskMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  metaText: {
    fontSize: typography.sizes.sm,
    color: colors.gray[500],
  },
  taskActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionButton: {
    padding: spacing.sm,
    borderRadius: spacing.md,
    backgroundColor: colors.gray[100],
  },
  deleteButton: {
    backgroundColor: colors.error + '10',
  },
  subtaskList: {
    marginBottom: spacing.md,
  },
  subtaskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.gray[300],
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.violet[600],
    borderColor: colors.violet[600],
  },
  subtaskText: {
    flex: 1,
    fontSize: typography.sizes.sm,
    color: colors.gray[700],
  },
  subtaskTextCompleted: {
    textDecorationLine: 'line-through',
    color: colors.gray[400],
  },
  notes: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    backgroundColor: colors.gray[50],
    padding: spacing.md,
    borderRadius: spacing.md,
  },
  notesText: {
    flex: 1,
    fontSize: typography.sizes.sm,
    color: colors.gray[600],
  },
  emptyState: {
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyStateText: {
    fontSize: typography.sizes.md,
    color: colors.gray[500],
    marginBottom: spacing.md,
  },
  emptyStateButton: {
    marginTop: spacing.md,
  },
});