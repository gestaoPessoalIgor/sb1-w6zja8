import React from 'react';
import { useSettingsStore } from '@/store/useSettingsStore';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/Dialog';
import type { Language } from '@/store/useSettingsStore';

interface LanguageSettingsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const languages: { value: Language; label: string; flag: string }[] = [
  { value: 'pt-BR', label: 'Português (Brasil)', flag: '🇧🇷' },
  { value: 'en-US', label: 'English (US)', flag: '🇺🇸' },
];

export default function LanguageSettings({ open, onOpenChange }: LanguageSettingsProps) {
  const { language, setLanguage } = useSettingsStore();

  const handleLanguageChange = (value: Language) => {
    setLanguage(value);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Idioma</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          {languages.map(({ value, label, flag }) => (
            <button
              key={value}
              onClick={() => handleLanguageChange(value)}
              className={`w-full p-4 rounded-xl flex items-center gap-3 transition-colors
                ${language === value 
                  ? 'bg-violet-100 text-violet-900' 
                  : 'hover:bg-gray-50'
                }`}
            >
              <span className="text-2xl">{flag}</span>
              <div className="flex-1 text-left">
                <span className="font-medium">{label}</span>
                {language === value && (
                  <span className="block text-sm text-violet-600 mt-0.5">
                    Selecionado
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}