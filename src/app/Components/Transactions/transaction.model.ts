export class Transaction {
    concept: string = "";
    date?: Date;
    amount: number = 0;
    isExpense?: boolean;
    childrenTransactions?:Transaction[];
    id?:string;
    icon?:String;
    userId?:String;
    cumulativePercentage?:number;
    percentage?:number;
    relativePercentage?:number;
    category?:String; //categoryId for transaction
    color?:String;
}

export class TransactionFlatNode {
    expandable: boolean;
    concept: string = "";
    date?: Date;
    amount: number = 0;
    isExpense?: boolean;
    id?:string;
    icon?:String;
    level: number;
    userId?:String;
    cumulativePercentage?:number;
    percentage?:number;
    relativePercentage?:number;
    category?:String; //categoryId for transaction
    color?:String;
  }