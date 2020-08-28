export class Transaction {
    concept: string = "";
    date?: Date;
    amount: number = 0;
    isExpense?: boolean;
    childrenTransactions?:Transaction[];
    id:string = "";
    icon?:String;
}

export class TransactionFlatNode {
    expandable: boolean;
    concept: string;
    date?: Date;
    amount: number;
    isExpense?: boolean;
    id:string;
    icon?:String;
    level: number;
  }