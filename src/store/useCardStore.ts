import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CreditCard {
  id: string;
  name: string;
  lastDigits: string;
  color: string;
  limit: number;
  dueDate: number;
  currentBill: number;
}

interface CardState {
  cards: CreditCard[];
  addCard: (card: Omit<CreditCard, 'id' | 'currentBill'>) => void;
  removeCard: (id: string) => void;
  updateCard: (id: string, card: Partial<CreditCard>) => void;
  updateCardBill: (id: string, amount: number) => void;
  getCard: (id: string) => CreditCard | undefined;
  getAvailableLimit: (id: string) => number;
}

export const useCardStore = create<CardState>()(
  persist(
    (set, get) => ({
      cards: [],
      
      addCard: (card) =>
        set((state) => ({
          cards: [
            ...state.cards,
            { ...card, id: Date.now().toString(), currentBill: 0 }
          ]
        })),
      
      removeCard: (id) =>
        set((state) => ({
          cards: state.cards.filter((card) => card.id !== id)
        })),
      
      updateCard: (id, updatedCard) =>
        set((state) => ({
          cards: state.cards.map((card) =>
            card.id === id ? { ...card, ...updatedCard } : card
          )
        })),
      
      updateCardBill: (id, amount) =>
        set((state) => ({
          cards: state.cards.map((card) =>
            card.id === id
              ? { ...card, currentBill: card.currentBill + amount }
              : card
          )
        })),

      getCard: (id) => get().cards.find((card) => card.id === id),

      getAvailableLimit: (id) => {
        const card = get().cards.find((card) => card.id === id);
        return card ? card.limit - card.currentBill : 0;
      }
    }),
    {
      name: 'card-storage'
    }
  )
);