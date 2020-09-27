import { Component, OnInit } from '@angular/core';
import { Transaction, TransactionFlatNode } from "./transaction.model";
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { MatDialog } from '@angular/material/dialog';
import { NewTransactionComponent } from './new-transaction/new-transaction.component';
import { TransactionService } from './transactions.service'
import { DeleteTransactionComponentDialog } from './delete-transaction/delete-transaction.component';

const transactionTree: Transaction[] = [
  {
    concept: "Vivienda",
    icon: "home",
    childrenTransactions: [
      {
        concept: "Luz",
        date: new Date('8/03/2020'),
        amount: 400,
        id: "123"
      },
      {
        concept: "Agua",
        date: new Date('8/03/2020'),
        amount: 112,
        id: "123"
      }
    ],
    amount: 800,
    isExpense: true,
    id: "123",
    percentage: 100,
  },
  {
    concept: "Transporte",
    icon: "directions_car",
    childrenTransactions: [
      {
        concept: "uber",
        date: new Date('8/03/2020'),
        amount: 148.32,
        id: "123",
      }
    ],
    amount: 148.32,
    isExpense: true,
    id: "123",
    percentage: 40,
  },
  {
    concept: "Despensa",
    icon: "local_grocery_store",
    childrenTransactions: [
      {
        concept: "Despensa",
        date: new Date('8/03/2020'),
        amount: 756,
        id: "123"
      }
    ],
    amount: 756,
    isExpense: true,
    id: "123",
    percentage: 20,
  },
  {
    concept: "Entretenimiento",
    icon: "live_tv",
    childrenTransactions: [
      {
        concept: "Cine",
        date: new Date('8/03/2020'),
        amount: 86,
        id: "123"
      }
    ],
    amount: 86,
    isExpense: false,
    id: "123",
    percentage: 100,
  },
];

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  private _transformer = (node: Transaction, level: number) => {
    return {
      expandable: !!node.childrenTransactions && node.childrenTransactions.length > 0,
      concept: node.concept,
      date: node.date,
      amount: node.amount,
      isExpense: node.isExpense,
      id: node.id,
      icon: node.icon,
      level: level,
      userId: node.userId,
      cumulativePercentage: node.cumulativePercentage,
      relativePercentage: node.relativePercentage,
      percentage: node.percentage,
      category: node.category
    };
  }

  treeControl = new FlatTreeControl<TransactionFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.childrenTransactions);

  transactions: Transaction[];
  expenses: Transaction[];
  incomes: Transaction[];
  public selectedVal: string;
  fromDate: Date;
  toDate: Date;

  constructor(public dialog: MatDialog,
    private service: TransactionService) {

    var date = new Date();

    this.fromDate = new Date(date.getFullYear(), date.getMonth(), 1);

    this.toDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    this.getTransactions();

    this.selectedVal = 'expenses';
  }

  ngOnInit() { }

  public onValChange(val: string) {
    this.selectedVal = val;
  }

  dataSourceExpenses = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  dataSourceIncomes = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  hasChild = (_: number, node: TransactionFlatNode) => node.expandable;

  createTransactionDialog(): void {
    const dialogRef = this.dialog.open(NewTransactionComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.service.createTransaction(result, this.fromDate, this.toDate).subscribe(
          (res: Transaction[]) => {
            this.transactions = res;
            this.handleTransactionsResponse();
          },
          err => {
            console.log(err);
            //default data for when the API is not on local host
            //comment when on production
            this.transactions = transactionTree;
            this.expenses = this.transactions.filter(t => t.isExpense);
            this.incomes = this.transactions.filter(t => !t.isExpense);
            this.assignDataSources();
          },
          () => {
            console.log('Complete');
          });
    });
  }

  getTransactions() {
    this.service.getTransactions(this.fromDate, this.toDate).subscribe(
      (res: Transaction[]) => {
        this.transactions = res;
        this.handleTransactionsResponse();
      },
      err => {
        console.log(err);
        //default data for when the API is not on local host
        //comment when on production
        this.transactions = transactionTree;
        this.expenses = this.transactions.filter(t => t.isExpense);
        this.incomes = this.transactions.filter(t => !t.isExpense);
        this.assignDataSources();
      },
      () => {
        console.log('Complete');
      });
  }

  assignDataSources() {
    this.dataSourceExpenses.data = this.expenses;
    this.dataSourceIncomes.data = this.incomes;
  }

  deleteTransaction(trans: Transaction) {
    trans.icon = this.transactions.find(t => t.id == trans.category).icon;
    const dialogRef = this.dialog.open(DeleteTransactionComponentDialog, { data: trans });

    dialogRef.afterClosed().subscribe((result: Boolean) => {
      console.log('The dialog was closed');
      if (result) {
        this.service.deleteTransaction(trans.id, this.fromDate, this.toDate).subscribe(
          (res: Transaction[]) => {
            this.transactions = res;
            this.handleTransactionsResponse();
          },
          err => {
            console.log(err);
            this.transactions = transactionTree;
            this.expenses = this.transactions.filter(t => t.isExpense);
            this.incomes = this.transactions.filter(t => !t.isExpense);
            this.assignDataSources();
          },
          () => {
            console.log('Complete');
          });
      }
    });

  }

  editTransaction(trans: Transaction) {
    var temp = new Transaction();
    temp.amount = trans.amount;
    temp.category = trans.category;
    temp.concept = trans.concept;
    temp.date = trans.date;
    temp.id = trans.id;

    const dialogRef = this.dialog.open(NewTransactionComponent, {
      data: temp
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.service.modifyTransaction(result, this.fromDate, this.toDate).subscribe(
          (res: Transaction[]) => {
            this.transactions = res;
            this.handleTransactionsResponse();
          },
          err => {
            console.log(err);
            //default data for when the API is not on local host
            //comment when on production
            this.transactions = transactionTree;
            this.expenses = this.transactions.filter(t => t.isExpense);
            this.incomes = this.transactions.filter(t => !t.isExpense);
            this.assignDataSources();
          },
          () => {
            console.log('Complete');
          });
    });
  }

  handleTransaction(event, trans: Transaction) {
    console.log(event.target.tagName);
    switch (event.target.tagName) {
      case "BUTTON":
      case "MAT-ICON":
        //for delete transaction
        this.deleteTransaction(trans);
        break;
      default:
        //for edit transaction
        this.editTransaction(trans);
        break;
    }
  }

  handleTransactionsResponse() {
    this.expenses = this.transactions.filter(t => t.isExpense).sort(function (a, b) {
      if (a.cumulativePercentage > b.cumulativePercentage) {
        return -1;
      }
      if (a.cumulativePercentage < b.cumulativePercentage) {
        return 1;
      }
      return 0;
    });

    this.incomes = this.transactions.filter(t => !t.isExpense).sort(function (a, b) {
      if (a.cumulativePercentage > b.cumulativePercentage) {
        return -1;
      }
      if (a.cumulativePercentage < b.cumulativePercentage) {
        return 1;
      }
      return 0;
    });
    this.assignDataSources();
  }
}


