import React from 'react';
import { Activity, Droplet, Timer } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricsGridProps {
  className?: string;
}

export default function MetricsGrid({ className }: MetricsGridProps) {
  return (
    <div className={cn('grid grid-cols-2 gap-4', className)}>
      <div className="bg-violet-500 rounded-2xl p-4 text-white">
        <div className="flex justify-between items-start mb-2">
          <span className="text-sm opacity-80">Calories</span>
          <Activity className="w-4 h-4 opacity-80" />
        </div>
        <p className="text-2xl font-bold">500</p>
        <p className="text-sm opacity-80">kcal</p>
      </div>

      <div className="bg-violet-100 rounded-2xl p-4">
        <div className="flex justify-between items-start mb-2">
          <span className="text-sm text-violet-600">Steps</span>
          <Timer className="w-4 h-4 text-violet-600" />
        </div>
        <p className="text-2xl font-bold text-violet-900">9,890</p>
        <p className="text-sm text-violet-600">steps</p>
      </div>

      <div className="bg-blue-500 rounded-2xl p-4 text-white">
        <div className="flex justify-between items-start mb-2">
          <span className="text-sm opacity-80">Water</span>
          <Droplet className="w-4 h-4 opacity-80" />
        </div>
        <p className="text-2xl font-bold">750</p>
        <p className="text-sm opacity-80">ml</p>
      </div>

      <div className="bg-violet-600 rounded-2xl p-4 text-white">
        <div className="flex justify-between items-start mb-2">
          <span className="text-sm opacity-80">Distance</span>
          <Activity className="w-4 h-4 opacity-80" />
        </div>
        <p className="text-2xl font-bold">4.2</p>
        <p className="text-sm opacity-80">km</p>
      </div>
    </div>
  );
}