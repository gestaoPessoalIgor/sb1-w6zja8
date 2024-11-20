import React from 'react';
import { Monitor, Moon, Sun } from 'lucide-react';
import { useSettingsStore } from '@/store/useSettingsStore';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/Dialog';
import type { ThemeType } from '@/store/useSettingsStore';

interface ThemeSettingsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const themes: { value: ThemeType; label: string; icon: typeof Sun; description: string }[] = [
  { 
    value: 'light', 
    label: 'Claro', 
    icon: Sun,
    description: 'Aparência clara para melhor visibilidade durante o dia'
  },
  { 
    value: 'dark', 
    label: 'Escuro', 
    icon: Moon,
    description: 'Reduz o cansaço visual em ambientes com pouca luz'
  },
  { 
    value: 'system', 
    label: 'Padrão do Sistema', 
    icon: Monitor,
    description: 'Adapta-se automaticamente às configurações do seu dispositivo'
  }
];

export default function ThemeSettings({ open, onOpenChange }: ThemeSettingsProps) {
  const { theme, setTheme } = useSettingsStore();

  const handleThemeChange = (value: ThemeType) => {
    setTheme(value);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tema</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          {themes.map(({ value, label, icon: Icon, description }) => (
            <button
              key={value}
              onClick={() => handleThemeChange(value)}
              className={`w-full p-4 rounded-xl flex items-center gap-4 transition-colors
                ${theme === value 
                  ? 'bg-violet-100 text-violet-900' 
                  : 'hover:bg-gray-50'
                }`}
            >
              <div className={`p-2 rounded-lg ${
                theme === value ? 'bg-violet-200' : 'bg-gray-100'
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 text-left">
                <span className="block font-medium">{label}</span>
                <span className={`block text-sm mt-0.5 ${
                  theme === value ? 'text-violet-600' : 'text-gray-500'
                }`}>
                  {description}
                </span>
              </div>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}