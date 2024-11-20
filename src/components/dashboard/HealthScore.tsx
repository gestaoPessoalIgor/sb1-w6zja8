import React from 'react';
import { cn } from '@/lib/utils';

interface HealthScoreProps {
  score: number;
  className?: string;
}

export default function HealthScore({ score, className }: HealthScoreProps) {
  return (
    <div className={cn('bg-white rounded-2xl p-6', className)}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Health Score</h3>
          <p className="text-sm text-gray-500">Based on your overall health</p>
        </div>
        <span className="text-2xl font-bold text-violet-600">{score}</span>
      </div>
      
      <div className="w-full bg-violet-100 rounded-full h-2">
        <div 
          className="bg-violet-600 h-2 rounded-full transition-all duration-500"
          style={{ width: `${score}%` }}
        />
      </div>
      
      <button className="mt-4 text-sm text-violet-600 font-medium">
        Read more
      </button>
    </div>
  );
}