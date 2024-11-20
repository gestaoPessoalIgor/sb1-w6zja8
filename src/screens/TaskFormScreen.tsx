import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTaskStore } from '../store/useTaskStore';
import ScreenContainer from '../components/common/ScreenContainer';
import Header from '../components/common/Header';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { colors, typography, spacing } from '../theme';
import DatePicker from '../components/common/DatePicker';
import TimePicker from '../components/common/TimePicker';
import CategorySelector from '../components/tasks/CategorySelector';
import SubtaskList from '../components/tasks/SubtaskList';

const INITIAL_FORM_DATA = {
  title: '',
  date: new Date().toISOString().split('T')[0],
  time: '',
  category: 'work',
  subtasks: [],
  notes: '',
};

export default function TaskFormScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { tasks, addTask, updateTask } = useTaskStore();
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [newSubtask, setNewSubtask] = useState('');

  const taskId = route.params?.id;
  const isEditing = !!taskId;

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
    if (!formData.title.trim()) {
      Alert.alert('Erro', 'O título é obrigatório');
      return;
    }

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
    <ScreenContainer>
      <Header
        title={isEditing ? 'Editar Tarefa' : 'Nova Tarefa'}
        showBackButton
      />
      <ScrollView style={styles.container}>
        <Input
          label="Título"
          value={formData.title}
          onChangeText={(text) => setFormData({ ...formData, title: text })}
          placeholder="Digite o título da tarefa"
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
            <Button
              title={formData.time || 'Definir hora'}
              variant="outline"
              onPress={() => setShowTimePicker(true)}
            />
          </View>
        </View>

        <CategorySelector
          selected={formData.category}
          onSelect={(category) => setFormData({ ...formData, category })}
        />

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

          <SubtaskList
            subtasks={formData.subtasks}
            onRemove={handleRemoveSubtask}
          />
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

        <TimePicker
          visible={showTimePicker}
          onClose={() => setShowTimePicker(false)}
          onSelect={(time) => {
            setFormData({ ...formData, time });
            setShowTimePicker(false);
          }}
          selectedTime={formData.time}
        />
      </ScrollView>
    </ScreenContainer>
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
  subtasksContainer: {
    marginBottom: spacing.lg,
  },
  subtaskInput: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
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