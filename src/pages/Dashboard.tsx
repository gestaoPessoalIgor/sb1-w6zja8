import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardHome from '../components/dashboard/DashboardHome';
import Tasks from '../components/dashboard/Tasks';
import Expenses from '../components/dashboard/Expenses';
import Reports from '../components/dashboard/Reports';
import Navigation from '../components/dashboard/Navigation';
import ExpenseForm from '../components/forms/ExpenseForm';
import TaskForm from '../components/forms/TaskForm';
import IncomeSettings from '../components/settings/IncomeSettings';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#F5F3FF] pb-32">
      <div className="max-w-md mx-auto px-4 sm:px-6">
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/tasks/new" element={<TaskForm />} />
          <Route path="/tasks/edit/:id" element={<TaskForm />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/expenses/new" element={<ExpenseForm />} />
          <Route path="/expenses/edit/:id" element={<ExpenseForm />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/income" element={<IncomeSettings />} />
        </Routes>
      </div>
      <Navigation />
    </div>
  );
}