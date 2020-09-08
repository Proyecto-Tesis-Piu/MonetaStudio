export class Transaction {
    concept: string = "";
    date?: Date;
    amount: number = 0;
    isExpense?: boolean;
    childrenTransactions?:Transaction[];
    id:string = "";
    icon?:String;
    userId?:String;
    percentage?:number;
    category?:String; //categoryId for transaction
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
    userId?:String;
    percentage?:number;
    category?:String; //categoryId for transaction
  }