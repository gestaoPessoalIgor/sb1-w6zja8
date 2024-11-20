import React from 'react';
import { useSettingsStore } from '@/store/useSettingsStore';
import { Card } from '../ui/Card';
import { Select } from '../ui/Select';

export default function DateTimeSettings() {
  const { 
    dateFormat, 
    timeFormat, 
    timezone,
    setDateFormat, 
    setTimeFormat,
    setTimezone 
  } = useSettingsStore();

  const timezones = Intl.supportedValuesOf('timeZone');

  return (
    <Card className="p-4 space-y-4">
      <h2 className="text-lg font-semibold">Data e Hora</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Formato de Data
        </label>
        <Select
          value={dateFormat}
          onChange={(e) => setDateFormat(e.target.value as any)}
        >
          <option value="dd/MM/yyyy">31/12/2024</option>
          <option value="MM/dd/yyyy">12/31/2024</option>
          <option value="yyyy-MM-dd">2024-12-31</option>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Formato de Hora
        </label>
        <Select
          value={timeFormat}
          onChange={(e) => setTimeFormat(e.target.value as any)}
        >
          <option value="12h">12 horas (AM/PM)</option>
          <option value="24h">24 horas</option>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Fuso Horário
        </label>
        <Select
          value={timezone}
          onChange={(e) => setTimezone(e.target.value)}
        >
          {timezones.map((tz) => (
            <option key={tz} value={tz}>
              {tz.replace(/_/g, ' ')}
            </option>
          ))}
        </Select>
      </div>
    </Card>
  );
}