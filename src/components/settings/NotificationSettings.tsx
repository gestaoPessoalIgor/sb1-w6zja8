import React from 'react';
import { useSettingsStore } from '@/store/useSettingsStore';
import { Card } from '../ui/Card';
import { Select } from '../ui/Select';

export default function NotificationSettings() {
  const { reminderTime, setReminderTime } = useSettingsStore();

  const reminderOptions = [
    { value: 5, label: '5 minutos antes' },
    { value: 10, label: '10 minutos antes' },
    { value: 15, label: '15 minutos antes' },
    { value: 30, label: '30 minutos antes' },
    { value: 60, label: '1 hora antes' },
  ];

  return (
    <Card className="p-4">
      <h2 className="text-lg font-semibold mb-4">Notificações</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Lembrete Padrão
        </label>
        <Select
          value={reminderTime}
          onChange={(e) => setReminderTime(Number(e.target.value))}
        >
          {reminderOptions.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
      </div>
    </Card>
  );
}