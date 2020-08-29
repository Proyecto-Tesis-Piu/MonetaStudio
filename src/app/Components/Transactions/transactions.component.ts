import { Component, OnInit } from '@angular/core';
import { temp } from './temp.model'
import { Transaction, TransactionFlatNode } from "./transaction.model";
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';


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
        id:"123"
      },
      {
        concept: "Agua",
        date: new Date('8/03/2020'),
        amount: 112,
        isExpense: true,
        id:"123"
      }
    ],
    amount:800,
    isExpense: true,
    id:"123"

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
        id:"123",
      }
    ],
    amount:148.32,
    isExpense: true,
    id:"123"
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
        id:"123"
      }
    ],
    amount:756,
    isExpense: true,
    id:"123"
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
        id:"123"
      }
    ],
    amount:86,
    isExpense: true,
    id:"123"
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
    };
  }
  
  transactions: temp[] = [{
    color : "#fff",
    value : 100
  },
  {
    color : "#fff",
    value : 80
  },
  {
    color : "#fff",
    value : 60
  },
  {
    color : "#fff",
    value : 40
  },
  {
    color : "#fff",
    value : 20
  }];

  treeControl = new FlatTreeControl<TransactionFlatNode>(
    node => node.level, node => node.expandable);

treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.childrenTransactions);

  constructor() {

    this.dataSource.data = transactionTree;
  }
  public selectedVal: string;

  ngOnInit() {
    this.selectedVal = 'option1';
  }

  public onValChange(val: string) {
    this.selectedVal = val;
  }
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  hasChild = (_: number, node: TransactionFlatNode) => node.expandable;
  /* transactionsARR: Transaction[] = [
    {
      concept: 'Luz',
      date: new Date('8/03/2020'),
      amount: 400,
      categoryIcon: "home",
      categoryName: "vivienda",
      userId: "",
      isExpense: true
    },
    {
      concept: 'uber',
      date: new Date('8/03/2020'),
      amount: 148.32,
      categoryIcon: "directions_car",
      categoryName: "Transporte",
      userId: "",
      isExpense: true
    },
    {
      concept: 'Cine',
      date: new Date('8/03/2020'),
      amount: 86,
      categoryIcon: "live_tv",
      categoryName: "Entretenimiento",
      userId: "",
      isExpense: true
    },
    {
      concept: 'Despensa',
      date: new Date('8/03/2020'),
      amount: 756,
      categoryIcon: "local_grocery_store",
      categoryName: "Despensa",
      userId: "",
      isExpense: true
    },
    {
      concept: 'Salud',
      date: new Date('8/03/2020'),
      amount: 1547,
      categoryIcon: "local_hospital",
      categoryName: "Salud",
      userId: "",
      isExpense: true
    },
    {
      concept: 'Tenis lacoste',
      date: new Date('8/03/2020'),
      amount: 1500,
      categoryIcon: "watch",
      categoryName: "Ropa y Accesorios",
      userId: "",
      isExpense: true
    },
  ] */
}


