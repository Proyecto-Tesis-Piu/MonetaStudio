import { Component, OnInit } from '@angular/core';
import { temp } from './temp.model'
import { Transaction, TransactionFlatNode } from "./transaction.model";
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

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

  constructor() {

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
}


