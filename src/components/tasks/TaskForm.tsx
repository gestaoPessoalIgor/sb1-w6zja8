import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { useTaskStore } from '../../store/useTaskStore';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { DatePicker } from '../common/DatePicker';
import { colors, typography, spacing } from '../../theme';

const TASK_CATEGORIES = {
  work: { 
    label: 'Trabalho',
    color: colors.primary,
    icon: '💼'
  },
  training: { 
    label: 'Treino',
    color: colors.success,
    icon: '🏃‍♂️'
  },
  study: { 
    label: 'Estudos',
    color: colors.warning,
    icon: '📚'
  },
  other: { 
    label: 'Outros',
    color: colors.gray[400],
    icon: '📌'
  }
};

interface Subtask {
  id: string;
  text: string;
  completed: boolean;
}

export default function TaskForm() {
  const navigation = useNavigation();
  const route = useRoute();
  const { tasks, addTask, updateTask } = useTaskStore();

  const taskId = route.params?.id;
  const isEditing = !!taskId;

  const [formData, setFormData] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    time: '',
    category: 'work',
    subtasks: [] as Subtask[],
    notes: '',
  });

  const [newSubtask, setNewSubtask] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isEditing) {
      const task = tasks.find(t => t.id === taskId);
      if (task) {
        setFormData({
          title: task.title,
          date: task.date,
          time: task.time || '',
          category: task.category,
          subtasks: task.subtasks,
          notes: task.notes || '',
        });
      }
    }
  }, [isEditing, taskId, tasks]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Título é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddSubtask = () => {
    if (!newSubtask.trim()) return;

    setFormData(prev => ({
      ...prev,
      subtasks: [
        ...prev.subtasks,
        {
          id: Date.now().toString(),
          text: newSubtask.trim(),
          completed: false,
        },
      ],
    }));
    setNewSubtask('');
  };

  const handleRemoveSubtask = (id: string) => {
    setFormData(prev => ({
      ...prev,
      subtasks: prev.subtasks.filter(subtask => subtask.id !== id),
    }));
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    try {
      if (isEditing) {
        updateTask(taskId, formData);
      } else {
        addTask(formData);
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar a tarefa');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Input
        label="Título"
        value={formData.title}
        onChangeText={(text) => setFormData({ ...formData, title: text })}
        placeholder="Digite o título da tarefa"
        error={errors.title}
      />

      <View style={styles.dateTimeContainer}>
        <View style={styles.dateContainer}>
          <Text style={styles.label}>Data</Text>
          <Button
            title={new Date(formData.date).toLocaleDateString('pt-BR')}
            variant="outline"
            onPress={() => setShowDatePicker(true)}
          />
        </View>

        <View style={styles.timeContainer}>
          <Text style={styles.label}>Hora</Text>
          <Input
            value={formData.time}
            onChangeText={(text) => setFormData({ ...formData, time: text })}
            placeholder="00:00"
            keyboardType="numbers-and-punctuation"
          />
        </View>
      </View>

      <View style={styles.categoryContainer}>
        <Text style={styles.label}>Categoria</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        >
          {Object.entries(TASK_CATEGORIES).map(([key, { label, icon }]) => (
            <Button
              key={key}
              title={`${icon} ${label}`}
              variant={formData.category === key ? 'primary' : 'outline'}
              onPress={() => setFormData({ ...formData, category: key as any })}
              style={styles.categoryButton}
            />
          ))}
        </ScrollView>
      </View>

      <View style={styles.subtasksContainer}>
        <Text style={styles.label}>Subtarefas</Text>
        <View style={styles.subtaskInput}>
          <Input
            value={newSubtask}
            onChangeText={setNewSubtask}
            placeholder="Adicionar subtarefa"
            onSubmitEditing={handleAddSubtask}
            returnKeyType="done"
          />
          <Button
            title="Adicionar"
            onPress={handleAddSubtask}
            size="sm"
          />
        </View>

        <View style={styles.subtaskList}>
          {formData.subtasks.map((subtask) => (
            <View key={subtask.id} style={styles.subtaskItem}>
              <Text style={styles.subtaskText}>{subtask.text}</Text>
              <TouchableOpacity
                onPress={() => handleRemoveSubtask(subtask.id)}
                style={styles.removeButton}
              >
                <Icon name="x" size={20} color={colors.error} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      <Input
        label="Observações"
        value={formData.notes}
        onChangeText={(text) => setFormData({ ...formData, notes: text })}
        placeholder="Adicione observações (opcional)"
        multiline
        numberOfLines={3}
        style={styles.notesInput}
      />

      <View style={styles.buttonContainer}>
        <Button
          title="Cancelar"
          variant="outline"
          onPress={() => navigation.goBack()}
          style={styles.button}
        />
        <Button
          title={isEditing ? 'Atualizar' : 'Criar'}
          onPress={handleSubmit}
          style={styles.button}
        />
      </View>

      <DatePicker
        visible={showDatePicker}
        onClose={() => setShowDatePicker(false)}
        onSelect={(date) => {
          setFormData({ ...formData, date });
          setShowDatePicker(false);
        }}
        selectedDate={formData.date}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
  },
  label: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium as any,
    color: colors.gray[700],
    marginBottom: spacing.sm,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  dateContainer: {
    flex: 1,
  },
  timeContainer: {
    flex: 1,
  },
  categoryContainer: {
    marginBottom: spacing.lg,
  },
  categoryList: {
    gap: spacing.sm,
  },
  categoryButton: {
    minWidth: 120,
  },
  subtasksContainer: {
    marginBottom: spacing.lg,
  },
  subtaskInput: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  subtaskList: {
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
  notesInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.xl,
    marginBottom: spacing.xxl,
  },
  button: {
    flex: 1,
  },
});