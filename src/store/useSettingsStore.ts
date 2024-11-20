import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeType = 'light' | 'dark' | 'system';
export type DateFormat = 'dd/MM/yyyy' | 'MM/dd/yyyy' | 'yyyy-MM-dd';
export type TimeFormat = '12h' | '24h';
export type Language = 'pt-BR' | 'en-US' | 'es-ES';
export type CalendarView = 'month' | 'week' | 'agenda';

interface SettingsState {
  theme: ThemeType;
  dateFormat: DateFormat;
  timeFormat: TimeFormat;
  language: Language;
  calendarView: CalendarView;
  timezone: string;
  reminderTime: number; // minutos antes do evento
  currency: string;
  
  // Ações
  setTheme: (theme: ThemeType) => void;
  setDateFormat: (format: DateFormat) => void;
  setTimeFormat: (format: TimeFormat) => void;
  setLanguage: (lang: Language) => void;
  setCalendarView: (view: CalendarView) => void;
  setTimezone: (timezone: string) => void;
  setReminderTime: (minutes: number) => void;
  setCurrency: (currency: string) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'light',
      dateFormat: 'dd/MM/yyyy',
      timeFormat: '24h',
      language: 'pt-BR',
      calendarView: 'month',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      reminderTime: 30,
      currency: 'BRL',

      setTheme: (theme) => set({ theme }),
      setDateFormat: (dateFormat) => set({ dateFormat }),
      setTimeFormat: (timeFormat) => set({ timeFormat }),
      setLanguage: (language) => set({ language }),
      setCalendarView: (calendarView) => set({ calendarView }),
      setTimezone: (timezone) => set({ timezone }),
      setReminderTime: (reminderTime) => set({ reminderTime }),
      setCurrency: (currency) => set({ currency })
    }),
    {
      name: 'settings-storage'
    }
  )
);