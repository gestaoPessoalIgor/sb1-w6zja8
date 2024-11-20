import React from 'react';
import { Calendar } from 'lucide-react';

const mockTasks = [
  { id: 1, date: '15', title: 'Revisar orçamento', time: '10:00' },
  { id: 2, date: '16', title: 'Pagar conta de luz', time: '14:00' },
  { id: 3, date: '17', title: 'Reunião financeira', time: '11:30' }
];

export default function TaskPreview() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Próximas Tarefas</h2>
        <button className="text-blue-500 text-sm font-medium hover:text-blue-600">
          Ver Todas
        </button>
      </div>

      <div className="space-y-3">
        {mockTasks.map((task) => (
          <div key={task.id} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <span className="text-blue-500 font-semibold">{task.date}</span>
            </div>
            <div>
              <p className="text-gray-900 font-medium">{task.title}</p>
              <div className="flex items-center gap-1 text-gray-500 text-sm">
                <Calendar className="w-4 h-4" />
                <span>{task.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}