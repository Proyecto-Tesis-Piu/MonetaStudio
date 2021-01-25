export class Transaction {
    concept: string = "";
    date?: Date = new Date();
    amount: number = 0;
    isExpense?: boolean;
    childrenTransactions?:Transaction[];
    id?:string;
    icon?:string;
    userId?:string;
    cumulativePercentage?:number;
    percentage?:number;
    relativePercentage?:number;
    category?:string; //categoryId for transaction
    color?:string;
}

export class TransactionFlatNode {
    expandable: boolean;
    concept: string = "";
    date?: Date = new Date();
    amount: number = 0;
    isExpense?: boolean;
    id?:string;
    icon?:string;
    level: number;
    userId?:string;
    cumulativePercentage?:number;
    percentage?:number;
    relativePercentage?:number;
    category?:string; //categoryId for transaction
    color?:string;
  }