import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/Dialog';
import { Pencil, Plus, Trash2, ArrowLeft } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface AdditionalIncome {
  id: string;
  name: string;
  amount: number;
  month: string;
}

export default function IncomeSettings() {
  const navigate = useNavigate();
  const { user, updateUserIncome } = useAuthStore();
  const [isEditingSalary, setIsEditingSalary] = useState(false);
  const [salaryInput, setSalaryInput] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedIncome, setSelectedIncome] = useState<AdditionalIncome | null>(null);
  const [additionalIncomes, setAdditionalIncomes] = useState<AdditionalIncome[]>([]);
  const [isAddingIncome, setIsAddingIncome] = useState(false);
  const [newIncome, setNewIncome] = useState({
    name: '',
    amount: '',
    month: new Date().toISOString().split('T')[0].slice(0, 7)
  });

  // Inicializar dados quando o componente montar ou quando user mudar
  useEffect(() => {
    if (user) {
      if (typeof user.salary === 'number') {
        setSalaryInput((user.salary / 100).toFixed(2).replace('.', ','));
        setIsEditingSalary(false);
      } else {
        setIsEditingSalary(true);
        setSalaryInput('');
      }
      setAdditionalIncomes(user.additionalIncomes || []);
    }
  }, [user]);

  const handleSaveSalary = () => {
    if (!salaryInput) return;
    
    // Converter o valor para centavos
    const cleanValue = salaryInput.replace(/\./g, '').replace(',', '.');
    const salaryInCents = Math.round(parseFloat(cleanValue) * 100);
    
    if (isNaN(salaryInCents)) return;

    updateUserIncome(salaryInCents, additionalIncomes);
    setIsEditingSalary(false);
  };

  const handleAddIncome = () => {
    if (!newIncome.name || !newIncome.amount || !newIncome.month) return;

    // Converter o valor para centavos
    const cleanValue = newIncome.amount.replace(/\./g, '').replace(',', '.');
    const amount = Math.round(parseFloat(cleanValue) * 100);
    
    if (isNaN(amount)) return;

    const income = {
      id: Date.now().toString(),
      name: newIncome.name,
      amount,
      month: newIncome.month
    };

    const updatedIncomes = [...additionalIncomes, income];
    setAdditionalIncomes(updatedIncomes);
    updateUserIncome(user?.salary || 0, updatedIncomes);
    
    setIsAddingIncome(false);
    setNewIncome({
      name: '',
      amount: '',
      month: new Date().toISOString().split('T')[0].slice(0, 7)
    });
  };

  const handleDeleteIncome = (income: AdditionalIncome) => {
    setSelectedIncome(income);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (!selectedIncome) return;
    
    const updatedIncomes = additionalIncomes.filter(income => income.id !== selectedIncome.id);
    setAdditionalIncomes(updatedIncomes);
    updateUserIncome(user?.salary || 0, updatedIncomes);
    
    setShowDeleteModal(false);
    setSelectedIncome(null);
  };

  const formatValue = (value: string) => {
    // Remove tudo exceto números e vírgula
    let cleanValue = value.replace(/[^\d,]/g, '');
    
    // Garante apenas uma vírgula
    const parts = cleanValue.split(',');
    if (parts.length > 2) {
      cleanValue = parts[0] + ',' + parts[1];
    }
    
    // Limita decimais a 2 dígitos
    if (parts.length === 2 && parts[1].length > 2) {
      cleanValue = parts[0] + ',' + parts[1].slice(0, 2);
    }

    // Formata o número com pontos de milhar
    if (parts[0].length > 3) {
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    return parts.length === 2 ? `${parts[0]},${parts[1]}` : cleanValue;
  };

  return (
    <div className="py-6 pb-24">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate('/dashboard')}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-semibold">Gerenciar Salário e Rendas</h1>
      </div>

      <div className="space-y-6">
        {/* Salário Principal */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Salário Principal</h2>
          {isEditingSalary ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Valor do Salário
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    R$
                  </span>
                  <Input
                    type="text"
                    value={salaryInput}
                    onChange={(e) => setSalaryInput(formatValue(e.target.value))}
                    className="pl-9"
                    placeholder="0,00"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                {user?.salary && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsEditingSalary(false);
                      setSalaryInput(((user?.salary || 0) / 100).toFixed(2).replace('.', ','));
                    }}
                  >
                    Cancelar
                  </Button>
                )}
                <Button
                  className="bg-violet-600 hover:bg-violet-700"
                  onClick={handleSaveSalary}
                >
                  {user?.salary ? 'Atualizar Salário' : 'Definir Salário'}
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">Salário Atual</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {formatCurrency(user?.salary || 0)}
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => setIsEditingSalary(true)}
              >
                <Pencil className="w-4 h-4 mr-2" />
                Editar
              </Button>
            </div>
          )}
        </Card>

        {/* Rendas Adicionais */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Rendas Adicionais</h2>
            <Button
              onClick={() => setIsAddingIncome(true)}
              className="bg-violet-600 hover:bg-violet-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nova Renda
            </Button>
          </div>

          {isAddingIncome && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome da Renda
                </label>
                <Input
                  value={newIncome.name}
                  onChange={(e) => setNewIncome({ ...newIncome, name: e.target.value })}
                  placeholder="Ex: Freelance"
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
                    value={newIncome.amount}
                    onChange={(e) => setNewIncome({ 
                      ...newIncome, 
                      amount: formatValue(e.target.value)
                    })}
                    className="pl-9"
                    placeholder="0,00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mês de Referência
                </label>
                <Input
                  type="month"
                  value={newIncome.month}
                  onChange={(e) => setNewIncome({ ...newIncome, month: e.target.value })}
                />
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setIsAddingIncome(false);
                    setNewIncome({
                      name: '',
                      amount: '',
                      month: new Date().toISOString().split('T')[0].slice(0, 7)
                    });
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  className="flex-1 bg-violet-600 hover:bg-violet-700"
                  onClick={handleAddIncome}
                >
                  Adicionar
                </Button>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {additionalIncomes.length === 0 && !isAddingIncome ? (
              <div className="text-center py-8 text-gray-500">
                <p>Nenhuma renda adicional cadastrada</p>
                <Button
                  variant="outline"
                  onClick={() => setIsAddingIncome(true)}
                  className="mt-4"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Renda
                </Button>
              </div>
            ) : (
              additionalIncomes.map((income) => (
                <div
                  key={income.id}
                  className="p-4 bg-gray-50 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-medium text-gray-900">{income.name}</h3>
                    <p className="text-sm text-gray-600">
                      {new Date(income.month + '-01').toLocaleDateString('pt-BR', {
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                    <p className="text-lg font-semibold text-violet-600 mt-1">
                      {formatCurrency(income.amount)}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteIncome(income)}
                    className="p-2 hover:bg-red-100 rounded-full"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

      {/* Modal de Confirmação de Exclusão */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
          </DialogHeader>
          <p className="text-gray-600">
            Tem certeza que deseja excluir esta renda? Esta ação não pode ser desfeita.
          </p>
          <div className="flex gap-2 pt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                setShowDeleteModal(false);
                setSelectedIncome(null);
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