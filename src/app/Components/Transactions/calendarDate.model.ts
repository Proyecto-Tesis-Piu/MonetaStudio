import { Transaction } from './transaction.model';

export class CalendarDate {
    date: Date;
    hasExpense: boolean;
    hasIncome: boolean;
}

export class GeneralData {
    transactions: Transaction[];
    incomeTotal: number;
    incomePercentage: number;
    expenseTotal: number;
    expensePercentage: number;
}