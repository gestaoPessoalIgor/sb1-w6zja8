import React, { useState } from 'react';
import { Plus, DollarSign, CreditCard, Calendar, Trash2, ChevronLeft, ChevronRight, Edit2 } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useExpenseStore } from '@/store/useExpenseStore';
import { formatCurrency } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/Dialog';

interface CreditCard {
  id: string;
  name: string;
  lastDigits: string;
  color: string;
  limit: number;
  dueDate: number;
  currentBill: number;
}

export default function Expenses() {
  const navigate = useNavigate();
  const { expenses, removeExpense } = useExpenseStore();
  const [showNewCardForm, setShowNewCardForm] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [selectedCard, setSelectedCard] = useState<CreditCard | null>(null);
  const [newCard, setNewCard] = useState({
    name: '',
    lastDigits: '',
    color: '#8B5CF6',
    limit: '',
    dueDate: ''
  });

  // Mock de cartões cadastrados
  const [cards, setCards] = useState<CreditCard[]>([
    {
      id: '1',
      name: 'Nubank',
      lastDigits: '4567',
      color: '#8B5CF6',
      limit: 5000,
      dueDate: 10,
      currentBill: 1250.75
    },
    {
      id: '2',
      name: 'Inter',
      lastDigits: '8901',
      color: '#F59E0B',
      limit: 3000,
      dueDate: 15,
      currentBill: 876.32
    }
  ]);

  const handleAddCard = () => {
    if (newCard.name && newCard.lastDigits && newCard.limit && newCard.dueDate) {
      setCards([...cards, {
        id: Date.now().toString(),
        name: newCard.name,
        lastDigits: newCard.lastDigits,
        color: newCard.color,
        limit: Number(newCard.limit),
        dueDate: Number(newCard.dueDate),
        currentBill: 0
      }]);
      setNewCard({ name: '', lastDigits: '', color: '#8B5CF6', limit: '', dueDate: '' });
      setShowNewCardForm(false);
    }
  };

  const handleDeleteCard = (id: string) => {
    setCards(cards.filter(card => card.id !== id));
    setSelectedCard(null);
  };

  const handleCardClick = (card: CreditCard) => {
    setSelectedCard(card);
  };

  const nextCard = () => {
    setCurrentCardIndex((prev) => (prev + 1) % cards.length);
  };

  const prevCard = () => {
    setCurrentCardIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handleEditExpense = (id: string) => {
    navigate(`/dashboard/expenses/edit/${id}`);
  };

  return (
    <div className="py-6 pb-24">
      {/* Cartões de Crédito */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Meus Cartões</h2>
          <Button
            onClick={() => setShowNewCardForm(true)}
            size="sm"
            className="bg-violet-600 hover:bg-violet-700"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        <Dialog open={showNewCardForm} onOpenChange={setShowNewCardForm}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Novo Cartão</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <Input
                placeholder="Nome do cartão"
                value={newCard.name}
                onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
              />
              <Input
                placeholder="Últimos 4 dígitos"
                maxLength={4}
                value={newCard.lastDigits}
                onChange={(e) => setNewCard({ ...newCard, lastDigits: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Limite"
                value={newCard.limit}
                onChange={(e) => setNewCard({ ...newCard, limit: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Dia do vencimento"
                min="1"
                max="31"
                value={newCard.dueDate}
                onChange={(e) => setNewCard({ ...newCard, dueDate: e.target.value })}
              />
              <input
                type="color"
                value={newCard.color}
                onChange={(e) => setNewCard({ ...newCard, color: e.target.value })}
                className="w-full h-10 rounded-lg cursor-pointer"
              />
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowNewCardForm(false)}
                >
                  Cancelar
                </Button>
                <Button
                  className="flex-1 bg-violet-600 hover:bg-violet-700"
                  onClick={handleAddCard}
                >
                  Adicionar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {cards.length > 0 && (
          <div className="relative">
            <Card key={cards[currentCardIndex].id} className="p-4">
              <div
                className="w-full h-48 rounded-xl p-4 text-white flex flex-col justify-between cursor-pointer"
                style={{ backgroundColor: cards[currentCardIndex].color }}
                onClick={() => handleCardClick(cards[currentCardIndex])}
              >
                <div className="flex justify-between items-start">
                  <span className="font-medium text-lg">{cards[currentCardIndex].name}</span>
                  <CreditCard className="w-6 h-6 opacity-80" />
                </div>
                <div>
                  <p className="text-sm opacity-80">**** **** **** {cards[currentCardIndex].lastDigits}</p>
                  <p className="text-xs opacity-80 mt-2">
                    Vencimento dia {cards[currentCardIndex].dueDate}
                  </p>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="opacity-80">Fatura Atual:</span>
                      <span className="font-semibold">
                        {formatCurrency(cards[currentCardIndex].currentBill)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-80">Limite Disponível:</span>
                      <span className="font-semibold">
                        {formatCurrency(cards[currentCardIndex].limit - cards[currentCardIndex].currentBill)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {cards.length > 1 && (
              <>
                <button
                  onClick={prevCard}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={nextCard}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </>
            )}

            <div className="flex justify-center mt-4 gap-1">
              {cards.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentCardIndex ? 'bg-violet-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lista de Despesas */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Últimas Despesas</h2>
          <Button
            onClick={() => navigate('/dashboard/expenses/new')}
            size="sm"
            className="bg-violet-600 hover:bg-violet-700"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-4">
          {expenses.map((expense) => (
            <Card key={expense.id} className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium text-gray-900">
                    {expense.description}
                  </h3>
                  <p className="text-lg font-semibold text-gray-900">
                    {formatCurrency(expense.amount)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditExpense(expense.id)}
                    className="p-1 hover:bg-gray-100 rounded-full text-gray-500"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => removeExpense(expense.id)}
                    className="p-1 hover:bg-red-100 rounded-full text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4 text-gray-600 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{expense.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  {expense.paymentMethod === 'credit' ? (
                    <CreditCard className="w-4 h-4" />
                  ) : (
                    <DollarSign className="w-4 h-4" />
                  )}
                  <span>
                    {expense.paymentMethod === 'credit' ? 'Crédito' : 'Débito'}
                    {expense.cardName && ` - ${expense.cardName}`}
                    {expense.installments && expense.installments > 1 && 
                      ` (${expense.installments}x)`}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}