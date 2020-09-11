import { Component, OnInit } from '@angular/core';
import { Transaction, TransactionFlatNode } from "./transaction.model";
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { MatDialog } from '@angular/material/dialog';
import { NewTransactionComponent } from './new-transaction/new-transaction.component';

const transactionTree: Transaction[] = [
  {
    concept: "Vivienda",
    icon: "home",
    childrenTransactions: [
      {
        concept: "Luz",
        date: new Date('8/03/2020'),
        amount: 400,
        isExpense: true,
        id: "123"
      },
      {
        concept: "Agua",
        date: new Date('8/03/2020'),
        amount: 112,
        isExpense: true,
        id: "123"
      }
    ],
    amount: 800,
    isExpense: true,
    id: "123"

  },
  {
    concept: "Transporte",
    icon: "directions_car",
    childrenTransactions: [
      {
        concept: "uber",
        date: new Date('8/03/2020'),
        amount: 148.32,
        isExpense: true,
        id: "123",
      }
    ],
    amount: 148.32,
    isExpense: true,
    id: "123"
  },
  {
    concept: "Despensa",
    icon: "local_grocery_store",
    childrenTransactions: [
      {
        concept: "Despensa",
        date: new Date('8/03/2020'),
        amount: 756,
        isExpense: true,
        id: "123"
      }
    ],
    amount: 756,
    isExpense: true,
    id: "123"
  },
  {
    concept: "Entretenimiento",
    icon: "live_tv",
    childrenTransactions: [
      {
        concept: "Cine",
        date: new Date('8/03/2020'),
        amount: 86,
        isExpense: true,
        id: "123"
      }
    ],
    amount: 86,
    isExpense: true,
    id: "123"
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

  transactions: Transaction[];
  expenses: Transaction[];
  incomes: Transaction[];

  treeControl = new FlatTreeControl<TransactionFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.childrenTransactions);

  constructor(public dialog: MatDialog) {

    this.expenses = this.transactions.filter(t => t.isExpense);
    this.incomes = this.transactions.filter(t => !t.isExpense);
    this.dataSourceExpenses.data = this.expenses;
    this.dataSourceIncomes.data = this.incomes;
  }
  public selectedVal: string;

  ngOnInit() {
    this.selectedVal = 'option1';
  }

  public onValChange(val: string) {
    this.selectedVal = val;
  }
  dataSourceExpenses = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  dataSourceIncomes = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  hasChild = (_: number, node: TransactionFlatNode) => node.expandable;

  TransactionDialog(): void {
    const dialogRef = this.dialog.open(NewTransactionComponent);
  }
}


