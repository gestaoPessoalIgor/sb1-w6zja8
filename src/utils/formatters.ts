import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value / 100);
}

export function formatDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, "d 'de' MMMM", { locale: ptBR });
}

export function formatMonth(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, "MMMM 'de' yyyy", { locale: ptBR });
}

export function formatTime(time: string): string {
  return time.slice(0, 5);
}