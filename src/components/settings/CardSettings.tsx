import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/Dialog';
import { Plus, Pencil, Trash2, CreditCard } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface CreditCard {
  id: string;
  name: string;
  lastDigits: string;
  color: string;
  limit: number;
  dueDate: number;
  currentBill: number;
}

interface CardSettingsProps {
  onClose?: () => void;
}

export default function CardSettings({ onClose }: CardSettingsProps) {
  // Rest of the component code remains exactly the same
  const [cards, setCards] = useState<CreditCard[]>([
    {
      id: '1',
      name: 'Nubank',
      lastDigits: '4567',
      color: '#8B5CF6',
      limit: 500000,
      dueDate: 10,
      currentBill: 125075
    },
    {
      id: '2',
      name: 'Inter',
      lastDigits: '8901',
      color: '#F59E0B',
      limit: 300000,
      dueDate: 15,
      currentBill: 87632
    }
  ]);
  const [showCardModal, setShowCardModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CreditCard | null>(null);
  const [newCard, setNewCard] = useState({
    name: '',
    lastDigits: '',
    color: '#8B5CF6',
    limit: '',
    dueDate: ''
  });

  const handleAddCard = () => {
    if (newCard.name && newCard.lastDigits && newCard.limit && newCard.dueDate) {
      const card = {
        id: Date.now().toString(),
        name: newCard.name,
        lastDigits: newCard.lastDigits,
        color: newCard.color,
        limit: Number(newCard.limit.replace(/\D/g, '')),
        dueDate: Number(newCard.dueDate),
        currentBill: 0
      };

      setCards([...cards, card]);
      setShowCardModal(false);
      setNewCard({ name: '', lastDigits: '', color: '#8B5CF6', limit: '', dueDate: '' });
    }
  };

  const handleEditCard = (card: CreditCard) => {
    setSelectedCard(card);
    setNewCard({
      name: card.name,
      lastDigits: card.lastDigits,
      color: card.color,
      limit: (card.limit / 100).toFixed(2).replace('.', ','),
      dueDate: card.dueDate.toString()
    });
    setShowCardModal(true);
  };

  const handleUpdateCard = () => {
    if (!selectedCard) return;

    const updatedCards = cards.map(card =>
      card.id === selectedCard.id
        ? {
            ...card,
            name: newCard.name,
            lastDigits: newCard.lastDigits,
            color: newCard.color,
            limit: Number(newCard.limit.replace(/\D/g, '')),
            dueDate: Number(newCard.dueDate)
          }
        : card
    );

    setCards(updatedCards);
    setShowCardModal(false);
    setSelectedCard(null);
    setNewCard({ name: '', lastDigits: '', color: '#8B5CF6', limit: '', dueDate: '' });
  };

  const handleDeleteCard = (card: CreditCard) => {
    setSelectedCard(card);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (!selectedCard) return;
    
    setCards(cards.filter(card => card.id !== selectedCard.id));
    setShowDeleteModal(false);
    setSelectedCard(null);
  };

  const formatValue = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return (Number(numbers) / 100).toFixed(2).replace('.', ',');
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button
          onClick={() => setShowCardModal(true)}
          className="bg-violet-600 hover:bg-violet-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Cartão
        </Button>
      </div>

      {cards.length === 0 ? (
        <div className="text-center py-8">
          <CreditCard className="w-12 h-12 mx-auto text-gray-400 mb-3" />
          <p className="text-gray-500">Nenhum cartão cadastrado</p>
          <Button
            onClick={() => setShowCardModal(true)}
            variant="outline"
            className="mt-4"
          >
            Adicionar Cartão
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {cards.map((card) => (
            <div
              key={card.id}
              className="w-full rounded-xl p-4"
              style={{ backgroundColor: card.color }}
            >
              <div className="text-white">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-medium text-lg">{card.name}</h3>
                    <p className="text-sm opacity-80">**** **** **** {card.lastDigits}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditCard(card)}
                      className="p-2 hover:bg-white/10 rounded-full"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteCard(card)}
                      className="p-2 hover:bg-white/10 rounded-full"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-sm opacity-80 mb-4">Vencimento dia {card.dueDate}</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="opacity-80">Fatura Atual:</span>
                    <span className="font-semibold">{formatCurrency(card.currentBill)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-80">Limite Disponível:</span>
                    <span className="font-semibold">
                      {formatCurrency(card.limit - card.currentBill)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de Adicionar/Editar Cartão */}
      <Dialog open={showCardModal} onOpenChange={setShowCardModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedCard ? 'Editar Cartão' : 'Novo Cartão'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome do Cartão
              </label>
              <Input
                value={newCard.name}
                onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
                placeholder="Ex: Nubank"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Últimos 4 dígitos
              </label>
              <Input
                value={newCard.lastDigits}
                onChange={(e) => setNewCard({ ...newCard, lastDigits: e.target.value })}
                maxLength={4}
                placeholder="0000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Limite
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  R$
                </span>
                <Input
                  type="text"
                  value={newCard.limit}
                  onChange={(e) => setNewCard({ 
                    ...newCard, 
                    limit: formatValue(e.target.value)
                  })}
                  className="pl-9"
                  placeholder="0,00"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dia do Vencimento
              </label>
              <Input
                type="number"
                min="1"
                max="31"
                value={newCard.dueDate}
                onChange={(e) => setNewCard({ ...newCard, dueDate: e.target.value })}
                placeholder="DD"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cor do Cartão
              </label>
              <input
                type="color"
                value={newCard.color}
                onChange={(e) => setNewCard({ ...newCard, color: e.target.value })}
                className="w-full h-10 rounded-lg cursor-pointer"
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setShowCardModal(false);
                  setSelectedCard(null);
                  setNewCard({ name: '', lastDigits: '', color: '#8B5CF6', limit: '', dueDate: '' });
                }}
              >
                Cancelar
              </Button>
              <Button
                className="flex-1 bg-violet-600 hover:bg-violet-700"
                onClick={selectedCard ? handleUpdateCard : handleAddCard}
              >
                {selectedCard ? 'Atualizar' : 'Adicionar'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Confirmação de Exclusão */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
          </DialogHeader>
          <p className="text-gray-600">
            Tem certeza que deseja excluir este cartão? Esta ação não pode ser desfeita.
          </p>
          <div className="flex gap-2 pt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                setShowDeleteModal(false);
                setSelectedCard(null);
              }}
            >
              Cancelar
            </Button>
            <Button
              className="flex-1 bg-red-600 hover:bg-red-700"
              onClick={confirmDelete}
            >
              Excluir
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}