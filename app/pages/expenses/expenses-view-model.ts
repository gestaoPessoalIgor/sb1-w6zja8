import { Observable } from '@nativescript/core';

export class ExpensesViewModel extends Observable {
    private _expenses: any[] = [
        {
            id: '1',
            description: 'Supermercado',
            amount: 250.50,
            date: '15/02/2024',
            category: 'Alimentação',
            categoryClass: 'food',
            paymentMethod: 'Crédito - Nubank',
        },
        {
            id: '2',
            description: 'Uber',
            amount: 35.90,
            date: '14/02/2024',
            category: 'Transporte',
            categoryClass: 'transport',
            paymentMethod: 'Débito',
        }
    ];

    private _categories = ['Todas', 'Alimentação', 'Transporte', 'Lazer', 'Contas', 'Outros'];
    private _months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    private _selectedCategoryIndex = 0;
    private _selectedMonthIndex = 1; // Fevereiro

    constructor() {
        super();
    }

    get expenses(): any[] {
        return this._expenses;
    }

    get categories(): string[] {
        return this._categories;
    }

    get months(): string[] {
        return this._months;
    }

    get selectedCategoryIndex(): number {
        return this._selectedCategoryIndex;
    }

    set selectedCategoryIndex(value: number) {
        if (this._selectedCategoryIndex !== value) {
            this._selectedCategoryIndex = value;
            this.notifyPropertyChange('selectedCategoryIndex', value);
            this.filterExpenses();
        }
    }

    get selectedMonthIndex(): number {
        return this._selectedMonthIndex;
    }

    set selectedMonthIndex(value: number) {
        if (this._selectedMonthIndex !== value) {
            this._selectedMonthIndex = value;
            this.notifyPropertyChange('selectedMonthIndex', value);
            this.filterExpenses();
        }
    }

    onAddExpense() {
        // Navegar para a página de adicionar despesa
    }

    private filterExpenses() {
        // Implementar filtro de despesas baseado na categoria e mês selecionados
    }
}