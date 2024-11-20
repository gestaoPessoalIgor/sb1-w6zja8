import { Observable } from '@nativescript/core';

interface CategoryExpense {
    category: string;
    icon: string;
    amount: number;
    percentage: number;
}

export class ReportsViewModel extends Observable {
    private _months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
                      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    private _years = ['2024', '2023', '2022'];
    private _selectedMonthIndex = new Date().getMonth();
    private _selectedYearIndex = 0;
    private _totalExpenses = 2450.75;
    private _creditTotal = 1200.00;
    private _debitTotal = 850.75;
    private _cashTotal = 400.00;

    private _categoryExpenses: CategoryExpense[] = [
        { category: 'Alimentação', icon: '🍽️', amount: 800.50, percentage: 32.66 },
        { category: 'Transporte', icon: '🚗', amount: 450.25, percentage: 18.37 },
        { category: 'Lazer', icon: '🎮', amount: 350.00, percentage: 14.28 },
        { category: 'Contas', icon: '📝', amount: 600.00, percentage: 24.48 },
        { category: 'Outros', icon: '📦', amount: 250.00, percentage: 10.21 }
    ];

    constructor() {
        super();
    }

    get months(): string[] {
        return this._months;
    }

    get years(): string[] {
        return this._years;
    }

    get selectedMonthIndex(): number {
        return this._selectedMonthIndex;
    }

    set selectedMonthIndex(value: number) {
        if (this._selectedMonthIndex !== value) {
            this._selectedMonthIndex = value;
            this.notifyPropertyChange('selectedMonthIndex', value);
            this.updateReports();
        }
    }

    get selectedYearIndex(): number {
        return this._selectedYearIndex;
    }

    set selectedYearIndex(value: number) {
        if (this._selectedYearIndex !== value) {
            this._selectedYearIndex = value;
            this.notifyPropertyChange('selectedYearIndex', value);
            this.updateReports();
        }
    }

    get totalExpenses(): number {
        return this._totalExpenses;
    }

    get creditTotal(): number {
        return this._creditTotal;
    }

    get debitTotal(): number {
        return this._debitTotal;
    }

    get cashTotal(): number {
        return this._cashTotal;
    }

    get categoryExpenses(): CategoryExpense[] {
        return this._categoryExpenses;
    }

    private updateReports() {
        // Aqui será implementada a lógica para atualizar os relatórios
        // baseado no mês e ano selecionados
    }
}