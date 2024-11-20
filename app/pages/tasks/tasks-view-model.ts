import { Observable } from '@nativescript/core';

interface Subtask {
    id: string;
    text: string;
    completed: boolean;
}

interface Task {
    id: string;
    title: string;
    date: string;
    time?: string;
    category: 'work' | 'training' | 'study' | 'other';
    categoryClass: string;
    subtasks: Subtask[];
    notes?: string;
}

export class TasksViewModel extends Observable {
    private _tasks: Task[] = [
        {
            id: '1',
            title: 'Revisar Orçamento Mensal',
            date: '15/02/2024',
            time: '10:00',
            category: 'work',
            categoryClass: 'work',
            subtasks: [
                { id: 's1', text: 'Verificar despesas', completed: true },
                { id: 's2', text: 'Atualizar planilha', completed: false }
            ],
            notes: 'Focar na redução de gastos desnecessários'
        }
    ];

    constructor() {
        super();
    }

    get tasks(): Task[] {
        return this._tasks;
    }

    onAddTask() {
        // Implementar navegação para o formulário de adicionar tarefa
    }

    onToggleSubtask(args: any) {
        const subtask = args.object.bindingContext;
        const taskId = subtask.taskId;
        const subtaskId = subtask.id;

        this._tasks = this._tasks.map(task => {
            if (task.id === taskId) {
                return {
                    ...task,
                    subtasks: task.subtasks.map(st => 
                        st.id === subtaskId 
                            ? { ...st, completed: !st.completed }
                            : st
                    )
                };
            }
            return task;
        });

        this.notifyPropertyChange('tasks', this._tasks);
    }
}