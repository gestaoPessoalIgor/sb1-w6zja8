import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Plus, X } from 'lucide-react';
import { useTaskStore } from '@/store/useTaskStore';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Card } from '../ui/Card';

interface Subtask {
  id: string;
  text: string;
  completed: boolean;
}

interface TaskFormData {
  title: string;
  date: string;
  time: string;
  category: 'work' | 'training' | 'study' | 'other';
  subtasks: Subtask[];
  notes: string;
}

const initialFormData: TaskFormData = {
  title: '',
  date: new Date().toISOString().split('T')[0],
  time: '',
  category: 'work',
  subtasks: [],
  notes: ''
};

export default function TaskForm() {
  const navigate = useNavigate();
  const params = useParams();
  const { tasks, addTask, updateTask } = useTaskStore();
  const [formData, setFormData] = useState<TaskFormData>(initialFormData);
  const [newSubtask, setNewSubtask] = useState('');

  useEffect(() => {
    if (params.id) {
      const task = tasks.find(t => t.id === params.id);
      if (task) {
        setFormData({
          title: task.title,
          date: task.date,
          time: task.time || '',
          category: task.category,
          subtasks: task.subtasks,
          notes: task.notes || ''
        });
      }
    }
  }, [params.id, tasks]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (params.id) {
      updateTask(params.id, formData);
    } else {
      addTask(formData);
    }
    
    navigate('/dashboard/tasks');
  };

  const handleAddSubtask = () => {
    if (newSubtask.trim()) {
      setFormData(prev => ({
        ...prev,
        subtasks: [
          ...prev.subtasks,
          { id: Date.now().toString(), text: newSubtask, completed: false }
        ]
      }));
      setNewSubtask('');
    }
  };

  const handleRemoveSubtask = (id: string) => {
    setFormData(prev => ({
      ...prev,
      subtasks: prev.subtasks.filter(subtask => subtask.id !== id)
    }));
  };

  return (
    <div className="py-6">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate('/dashboard/tasks')}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-semibold">
          {params.id ? 'Editar Tarefa' : 'Nova Tarefa'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Título
              </label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Digite o título da tarefa"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data
                </label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hora
                </label>
                <Input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Categoria
              </label>
              <Select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as TaskFormData['category'] })}
              >
                <option value="work">Trabalho</option>
                <option value="training">Treino</option>
                <option value="study">Estudos</option>
                <option value="other">Outros</option>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subtarefas
              </label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newSubtask}
                  onChange={(e) => setNewSubtask(e.target.value)}
                  placeholder="Adicionar subtarefa"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSubtask())}
                />
                <Button
                  type="button"
                  onClick={handleAddSubtask}
                  className="bg-violet-600 hover:bg-violet-700"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {formData.subtasks.map((subtask) => (
                  <div
                    key={subtask.id}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                  >
                    <span className="text-sm text-gray-700">{subtask.text}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSubtask(subtask.id)}
                      className="p-1 hover:bg-red-100 rounded-full text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Observações
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                rows={3}
                placeholder="Adicione observações (opcional)"
              />
            </div>
          </div>
        </Card>

        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={() => navigate('/dashboard/tasks')}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-violet-600 hover:bg-violet-700"
          >
            {params.id ? 'Salvar Alterações' : 'Criar Tarefa'}
          </Button>
        </div>
      </form>
    </div>
  );
}