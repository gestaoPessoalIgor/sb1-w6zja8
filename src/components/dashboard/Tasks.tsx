import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Calendar, Clock, MessageSquare, ChevronRight } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useTaskStore } from '@/store/useTaskStore';
import { Badge } from '../ui/Badge';
import { formatDate, formatTime, TASK_CATEGORIES } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/Dialog';

export default function Tasks() {
  const navigate = useNavigate();
  const { tasks, removeTask, toggleSubtask } = useTaskStore();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<string | null>(null);

  const filteredTasks = selectedCategory
    ? tasks.filter(task => task.category === selectedCategory)
    : tasks;

  const sortedTasks = [...filteredTasks].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const handleDeleteTask = () => {
    if (taskToDelete) {
      removeTask(taskToDelete);
      setTaskToDelete(null);
    }
  };

  const handleEditTask = (taskId: string) => {
    navigate(`/dashboard/tasks/edit/${taskId}`);
  };

  return (
    <div className="py-6 pb-24">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Tarefas</h1>
        <Button
          onClick={() => navigate('/dashboard/tasks/new')}
          className="bg-violet-600 hover:bg-violet-700"
        >
          <Plus className="w-5 h-5" />
        </Button>
      </div>

      {/* Filtros de Categoria */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-4 scrollbar-hide">
        {Object.entries(TASK_CATEGORIES).map(([key, { label, icon }]) => (
          <button
            key={key}
            onClick={() => setSelectedCategory(selectedCategory === key ? null : key)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2
              ${selectedCategory === key 
                ? 'bg-violet-100 text-violet-800'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            <span>{icon}</span>
            <span>{label}</span>
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {sortedTasks.map((task) => (
          <Card 
            key={task.id} 
            className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => setSelectedTask(task.id)}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                <div className="flex items-center gap-4 text-gray-600 text-sm mt-1">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(task.date)}</span>
                  </div>
                  {task.time && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{formatTime(task.time)}</span>
                    </div>
                  )}
                </div>
              </div>
              <Badge className={`bg-${TASK_CATEGORIES[task.category].color} text-${TASK_CATEGORIES[task.category].textColor}`}>
                {TASK_CATEGORIES[task.category].label}
              </Badge>
            </div>

            {task.subtasks.length > 0 && (
              <div className="mt-4 space-y-2">
                {task.subtasks.map((subtask) => (
                  <div
                    key={subtask.id}
                    className="flex items-center gap-2 p-2 bg-white rounded-lg"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => toggleSubtask(task.id, subtask.id)}
                      className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors
                        ${subtask.completed
                          ? 'bg-violet-600 border-violet-600 text-white'
                          : 'border-gray-300 hover:border-violet-600'
                        }`}
                    >
                      {subtask.completed && '✓'}
                    </button>
                    <span className={`flex-1 ${subtask.completed ? 'line-through text-gray-500' : ''}`}>
                      {subtask.text}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {task.notes && (
              <div className="mt-4 flex items-start gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                <MessageSquare className="w-4 h-4 mt-0.5" />
                <p>{task.notes}</p>
              </div>
            )}
          </Card>
        ))}

        {sortedTasks.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">Nenhuma tarefa encontrada</p>
            <Button
              onClick={() => navigate('/dashboard/tasks/new')}
              className="mt-4 bg-violet-600 hover:bg-violet-700"
            >
              Criar Nova Tarefa
            </Button>
          </div>
        )}
      </div>

      {/* Modal de Detalhes da Tarefa */}
      <Dialog open={!!selectedTask} onOpenChange={() => setSelectedTask(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalhes da Tarefa</DialogTitle>
          </DialogHeader>
          {selectedTask && (
            <div className="space-y-4">
              {/* Conteúdo do modal */}
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => handleEditTask(selectedTask)}
                >
                  Editar
                </Button>
                <Button
                  className="bg-red-500 hover:bg-red-600 text-white"
                  onClick={() => {
                    setTaskToDelete(selectedTask);
                    setSelectedTask(null);
                  }}
                >
                  Excluir
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal de Confirmação de Exclusão */}
      <Dialog open={!!taskToDelete} onOpenChange={() => setTaskToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
          </DialogHeader>
          <p className="text-gray-600">
            Tem certeza que deseja excluir esta tarefa? Esta ação não pode ser desfeita.
          </p>
          <div className="flex gap-2 justify-end mt-4">
            <Button
              variant="outline"
              onClick={() => setTaskToDelete(null)}
            >
              Cancelar
            </Button>
            <Button
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={handleDeleteTask}
            >
              Excluir
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}