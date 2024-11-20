import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  photoURL?: string;
  salary?: number;
  extraIncome?: number;
  additionalIncomes: Array<{
    id: string;
    name: string;
    amount: number;
    month: string;
  }>;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
  updateUserIncome: (salary: number, additionalIncomes: User['additionalIncomes']) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      
      login: async (email: string, password: string) => {
        set({ 
          isAuthenticated: true,
          user: {
            id: '1',
            name: 'Usuário Teste',
            email: email,
            phone: '(11) 99999-9999',
            salary: 0,
            extraIncome: 0,
            additionalIncomes: []
          }
        });
      },
      
      loginWithGoogle: async () => {
        set({ 
          isAuthenticated: true,
          user: {
            id: '1',
            name: 'Usuário Google',
            email: 'usuario@gmail.com',
            photoURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
            phone: '(11) 99999-9999',
            salary: 0,
            extraIncome: 0,
            additionalIncomes: []
          }
        });
      },
      
      logout: async () => {
        set({ user: null, isAuthenticated: false });
      },

      updateUser: (userData) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null
        }));
      },

      updateUserIncome: (salary: number, additionalIncomes) => {
        set((state) => {
          if (!state.user) return state;

          const extraIncome = additionalIncomes.reduce((sum, income) => sum + income.amount, 0);

          return {
            user: {
              ...state.user,
              salary,
              extraIncome,
              additionalIncomes: [...additionalIncomes]
            }
          };
        });
      }
    }),
    {
      name: 'auth-storage',
      version: 1,
      storage: {
        getItem: (name) => {
          try {
            const str = localStorage.getItem(name);
            if (!str) return null;
            
            const data = JSON.parse(str);
            
            // Garantir que os valores numéricos estão corretos
            if (data?.state?.user) {
              const user = data.state.user;
              
              // Converter salary e extraIncome para número
              if (typeof user.salary !== 'undefined') {
                user.salary = Number(user.salary);
              }
              if (typeof user.extraIncome !== 'undefined') {
                user.extraIncome = Number(user.extraIncome);
              }
              
              // Converter valores das rendas adicionais
              if (Array.isArray(user.additionalIncomes)) {
                user.additionalIncomes = user.additionalIncomes.map(income => ({
                  ...income,
                  amount: Number(income.amount)
                }));
              } else {
                user.additionalIncomes = [];
              }
            }
            
            return str;
          } catch (error) {
            console.error('Error parsing auth storage:', error);
            return null;
          }
        },
        setItem: (name, value) => {
          try {
            localStorage.setItem(name, value);
          } catch (error) {
            console.error('Error saving to auth storage:', error);
          }
        },
        removeItem: (name) => {
          try {
            localStorage.removeItem(name);
          } catch (error) {
            console.error('Error removing from auth storage:', error);
          }
        }
      }
    }
  )
);