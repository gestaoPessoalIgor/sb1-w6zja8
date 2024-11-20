import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TaskCategory = 'work' | 'training' | 'study' | 'other';

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
  category: TaskCategory;
  subtasks: Subtask[];
  notes?: string;
}

interface TaskState {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id'>) => void;
  removeTask: (id: string) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  toggleSubtask: (taskId: string, subtaskId: string) => void;
  getUpcomingTasks: () => Task[];
  getTasksByCategory: (category: TaskCategory) => Task[];
  getTasksByDate: (date: string) => Task[];
  getTask: (id: string) => Task | undefined;
  getTasksForMonth: (month: number, year: number) => { [date: string]: Task[] };
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      tasks: [],
      
      addTask: (task) =>
        set((state) => ({
          tasks: [...state.tasks, { ...task, id: Date.now().toString() }]
        })),
      
      removeTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id)
        })),
      
      updateTask: (id, updatedTask) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...updatedTask } : task
          )
        })),
      
      toggleSubtask: (taskId, subtaskId) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  subtasks: task.subtasks.map((subtask) =>
                    subtask.id === subtaskId
                      ? { ...subtask, completed: !subtask.completed }
                      : subtask
                  )
                }
              : task
          )
        })),
      
      getUpcomingTasks: () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        return get().tasks
          .filter((task) => {
            const taskDate = new Date(task.date);
            taskDate.setHours(0, 0, 0, 0);
            return taskDate >= today;
          })
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
          .slice(0, 5);
      },

      getTasksByCategory: (category) => 
        get().tasks.filter((task) => task.category === category),

      getTasksByDate: (date) => 
        get().tasks.filter((task) => task.date === date),

      getTask: (id) =>
        get().tasks.find((task) => task.id === id),

      getTasksForMonth: (month: number, year: number) => {
        const tasks = get().tasks.filter((task) => {
          const taskDate = new Date(task.date);
          return taskDate.getMonth() === month && taskDate.getFullYear() === year;
        });

        return tasks.reduce((acc: { [date: string]: Task[] }, task) => {
          if (!acc[task.date]) {
            acc[task.date] = [];
          }
          acc[task.date].push(task);
          return acc;
        }, {});
      }
    }),
    {
      name: 'task-storage'
    }
  )
);