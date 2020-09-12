import { Component, OnInit } from '@angular/core';
import { Transaction, TransactionFlatNode } from "./transaction.model";
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { MatDialog } from '@angular/material/dialog';
import { NewTransactionComponent } from './new-transaction/new-transaction.component';
import { TransactionService } from './transactions.service'

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
    percentage: 20,
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
    percentage: 100,
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
  styleUrls: ['./transactions.component.css']
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

  constructor(public dialog: MatDialog,
    private service: TransactionService) {

    var date = new Date();

    var firstDay =
      new Date(date.getFullYear(), date.getMonth(), 1);

    var lastDay =
      new Date(date.getFullYear(), date.getMonth() + 1, 0);

    this.getTransactions(firstDay, lastDay);

    this.selectedVal = 'option1';
  }

  ngOnInit() { }

  public onValChange(val: string) {
    this.selectedVal = val;
  }

  dataSourceExpenses = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  dataSourceIncomes = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  hasChild = (_: number, node: TransactionFlatNode) => node.expandable;

  TransactionDialog(): void {
    const dialogRef = this.dialog.open(NewTransactionComponent);
  }

  getTransactions(fromDate:Date, toDate:Date) {
    this.service.getTransactions(fromDate, toDate).subscribe(
      (res: Transaction[]) => {
        this.expenses = res.filter(t => t.isExpense).sort(function (a, b) {
          if (a.percentage > b.percentage) {
            return -1;
          }
          if (a.percentage < b.percentage) {
            return 1;
          }
          return 0;
        });

        this.incomes = res.filter(t => !t.isExpense).sort(function (a, b) {
          if (a.percentage > b.percentage) {
            return -1;
          }
          if (a.percentage < b.percentage) {
            return 1;
          }
          return 0;
        });
        this.assignDataSources();
      }, 
      err => {
        console.log(err);
        //default data for when the service is not on local host
        //comment when on production
        this.expenses = transactionTree.filter(t => t.isExpense);
        this.incomes = transactionTree.filter(t => !t.isExpense);
        this.assignDataSources();
      }, 
      () => {
        console.log('Complete');
    });
  }

  assignDataSources(){
    this.dataSourceExpenses.data = this.expenses;
    this.dataSourceIncomes.data = this.incomes;
  }

  deleteTransaction(transactionId:String){

  }
}


