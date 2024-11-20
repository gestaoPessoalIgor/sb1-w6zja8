import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useExpenseStore } from '@/store/useExpenseStore';
import { useCardStore } from '@/store/useCardStore';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Card } from '../ui/Card';

interface ExpenseFormData {
  description: string;
  amount: number;
  date: string;
  category: string;
  paymentMethod: 'credit' | 'debit' | 'cash' | 'pix';
  cardId?: string;
  installments?: number;
  notes?: string;
}

const initialFormData: ExpenseFormData = {
  description: '',
  amount: 0,
  date: new Date().toISOString().split('T')[0],
  category: 'alimentacao',
  paymentMethod: 'debit',
  notes: ''
};

export default function ExpenseForm() {
  const navigate = useNavigate();
  const params = useParams();
  const { expenses, addExpense, updateExpense } = useExpenseStore();
  const { cards } = useCardStore();
  const [formData, setFormData] = useState<ExpenseFormData>(initialFormData);
  const [displayAmount, setDisplayAmount] = useState('0,00');

  useEffect(() => {
    if (params.id) {
      const expense = expenses.find(e => e.id === params.id);
      if (expense) {
        setFormData({
          description: expense.description,
          amount: expense.amount,
          date: expense.date,
          category: expense.category,
          paymentMethod: expense.paymentMethod,
          cardId: expense.cardId,
          installments: expense.installments,
          notes: expense.notes || ''
        });
        setDisplayAmount((expense.amount / 100).toFixed(2).replace('.', ','));
      }
    }
  }, [params.id, expenses]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    
    // Remove tudo exceto números e vírgula
    value = value.replace(/[^\d,]/g, '');
    
    // Garante apenas uma vírgula
    const parts = value.split(',');
    if (parts.length > 2) {
      value = parts[0] + ',' + parts[1];
    }
    
    // Limita decimais a 2 dígitos
    if (parts.length === 2 && parts[1].length > 2) {
      value = parts[0] + ',' + parts[1].slice(0, 2);
    }
    
    setDisplayAmount(value);
    
    // Converte para centavos para armazenamento
    const numericValue = parseFloat(value.replace(',', '.')) * 100;
    setFormData(prev => ({ 
      ...prev, 
      amount: numericValue
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (params.id) {
      updateExpense(params.id, formData);
    } else {
      addExpense(formData);
    }
    
    navigate('/dashboard/expenses');
  };

  return (
    <div className="py-6">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate('/dashboard/expenses')}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-semibold">
          {params.id ? 'Editar Despesa' : 'Nova Despesa'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descrição
              </label>
              <Input
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Digite a descrição da despesa"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Valor
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  R$
                </span>
                <Input
                  type="text"
                  inputMode="decimal"
                  value={displayAmount}
                  onChange={handleAmountChange}
                  className="pl-9"
                  placeholder="0,00"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data
              </label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Categoria
              </label>
              <Select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="alimentacao">Alimentação</option>
                <option value="transporte">Transporte</option>
                <option value="lazer">Lazer</option>
                <option value="contas">Contas</option>
                <option value="outros">Outros</option>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Método de Pagamento
              </label>
              <Select
                value={formData.paymentMethod}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  paymentMethod: e.target.value as ExpenseFormData['paymentMethod'],
                  cardId: undefined,
                  installments: undefined
                })}
              >
                <option value="debit">Débito</option>
                <option value="credit">Crédito</option>
                <option value="pix">PIX</option>
                <option value="cash">Dinheiro</option>
              </Select>
            </div>

            {(formData.paymentMethod === 'credit' || formData.paymentMethod === 'debit') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cartão
                </label>
                <Select
                  value={formData.cardId || ''}
                  onChange={(e) => setFormData({ ...formData, cardId: e.target.value })}
                  required
                >
                  <option value="">Selecione um cartão</option>
                  {cards.map((card) => (
                    <option key={card.id} value={card.id}>
                      {card.name} (*{card.lastDigits})
                    </option>
                  ))}
                </Select>
              </div>
            )}

            {formData.paymentMethod === 'credit' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Parcelas
                </label>
                <Select
                  value={formData.installments || 1}
                  onChange={(e) => setFormData({ ...formData, installments: Number(e.target.value) })}
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
                    <option key={num} value={num}>
                      {num}x {num === 1 ? 'à vista' : `de R$ ${((formData.amount / 100) / num).toFixed(2)}`}
                    </option>
                  ))}
                </Select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Observações
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                rows={3}
                placeholder="Adicione observações (opcional)"
              />
            </div>
          </div>
        </Card>

        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={() => navigate('/dashboard/expenses')}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-violet-600 hover:bg-violet-700"
          >
            {params.id ? 'Salvar Alterações' : 'Criar Despesa'}
          </Button>
        </div>
      </form>
    </div>
  );
}