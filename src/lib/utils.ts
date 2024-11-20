import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, isToday, isThisMonth } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value / 100);
}

export function formatDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isToday(dateObj)) {
    return 'Hoje';
  }

  if (isThisMonth(dateObj)) {
    return format(dateObj, "d 'de' MMMM", { locale: ptBR });
  }

  return format(dateObj, "d 'de' MMMM 'de' yyyy", { locale: ptBR });
}

export function formatTime(time: string): string {
  return time.slice(0, 5);
}

export const TASK_CATEGORIES = {
  work: { 
    label: 'Trabalho',
    color: 'blue-100',
    textColor: 'blue-800',
    icon: '💼'
  },
  training: { 
    label: 'Treino',
    color: 'green-100',
    textColor: 'green-800',
    icon: '🏃‍♂️'
  },
  study: { 
    label: 'Estudos',
    color: 'purple-100',
    textColor: 'purple-800',
    icon: '📚'
  },
  other: { 
    label: 'Outros',
    color: 'gray-100',
    textColor: 'gray-800',
    icon: '📌'
  }
} as const;

export const EXPENSE_CATEGORIES = {
  alimentacao: { 
    label: 'Alimentação',
    color: '#8B5CF6',
    icon: '🍽️'
  },
  transporte: { 
    label: 'Transporte',
    color: '#60A5FA',
    icon: '🚗'
  },
  lazer: { 
    label: 'Lazer',
    color: '#34D399',
    icon: '🎮'
  },
  contas: { 
    label: 'Contas',
    color: '#F87171',
    icon: '📝'
  },
  outros: { 
    label: 'Outros',
    color: '#9CA3AF',
    icon: '📦'
  }
} as const;