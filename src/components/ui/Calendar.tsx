import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CalendarProps extends React.HTMLAttributes<HTMLDivElement> {
  onDateSelect?: (date: Date) => void;
  selectedDate?: Date;
}

export function Calendar({
  className,
  onDateSelect,
  selectedDate = new Date(),
  ...props
}: CalendarProps) {
  const [currentDate, setCurrentDate] = React.useState(selectedDate);
  const [viewDate, setViewDate] = React.useState(selectedDate);

  const daysInMonth = new Date(
    viewDate.getFullYear(),
    viewDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    viewDate.getFullYear(),
    viewDate.getMonth(),
    1
  ).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const weeks = Math.ceil((daysInMonth + firstDayOfMonth) / 7);

  const handlePrevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1));
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    setCurrentDate(newDate);
    onDateSelect?.(newDate);
  };

  return (
    <div className={cn('p-4', className)} {...props}>
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePrevMonth}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-semibold">
          {viewDate.toLocaleDateString('pt-BR', {
            month: 'long',
            year: 'numeric',
          })}
        </h2>
        <button
          onClick={handleNextMonth}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-500 py-2"
          >
            {day}
          </div>
        ))}

        {Array.from({ length: weeks * 7 }, (_, i) => {
          const day = i - firstDayOfMonth + 1;
          const isCurrentMonth = day > 0 && day <= daysInMonth;
          const isSelected =
            isCurrentMonth &&
            day === currentDate.getDate() &&
            viewDate.getMonth() === currentDate.getMonth() &&
            viewDate.getFullYear() === currentDate.getFullYear();

          return (
            <button
              key={i}
              onClick={() => isCurrentMonth && handleDateClick(day)}
              disabled={!isCurrentMonth}
              className={cn(
                'h-10 w-10 rounded-lg flex items-center justify-center text-sm',
                {
                  'text-gray-900 hover:bg-gray-100': isCurrentMonth && !isSelected,
                  'bg-blue-500 text-white': isSelected,
                  'text-gray-300': !isCurrentMonth,
                }
              )}
            >
              {isCurrentMonth ? day : ''}
            </button>
          );
        })}
      </div>
    </div>
  );
}