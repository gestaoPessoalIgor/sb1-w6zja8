import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Calendar, DollarSign, PieChart } from 'lucide-react';

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Home' },
    { path: '/dashboard/tasks', icon: Calendar, label: 'Tasks' },
    { path: '/dashboard/expenses', icon: DollarSign, label: 'Expenses' },
    { path: '/dashboard/reports', icon: PieChart, label: 'Reports' },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2">
      <nav className="bg-white rounded-full shadow-lg px-8 py-4">
        <div className="flex items-center gap-12">
          {navItems.map(({ path, icon: Icon, label }) => {
            const isActive = location.pathname === path;
            
            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                className={`flex flex-col items-center transition-colors
                  ${isActive ? 'text-violet-600' : 'text-gray-400 hover:text-violet-600'}`}
              >
                <Icon className="w-6 h-6" strokeWidth={1.5} />
                <span className="text-xs mt-1 font-medium">{label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}