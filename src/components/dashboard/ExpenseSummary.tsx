import React from 'react';
import { DollarSign, CreditCard } from 'lucide-react';

export default function ExpenseSummary() {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3">
        <div className="bg-green-100 p-2 rounded-lg">
          <DollarSign className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <p className="text-gray-500 text-sm">Débito</p>
          <p className="text-lg font-semibold text-gray-900">R$ 1.200,00</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3">
        <div className="bg-purple-100 p-2 rounded-lg">
          <CreditCard className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <p className="text-gray-500 text-sm">Crédito</p>
          <p className="text-lg font-semibold text-gray-900">R$ 800,00</p>
        </div>
      </div>
    </div>
  );
}