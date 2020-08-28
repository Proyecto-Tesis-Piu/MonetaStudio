import { Component, OnInit } from '@angular/core';
import { temp } from './temp.model'
import { Transaction } from "./transaction.model";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  transactions: temp[] = [];
  constructor() {
    var aux: temp = new temp();
    aux.color = "#fff";
    aux.value = 100;
    this.transactions.push(aux);
    var aux: temp = new temp();
    aux.color = "accent";
    aux.value = 80;
    this.transactions.push(aux);
    var aux: temp = new temp();
    aux.color = "warn";
    aux.value = 60;
    this.transactions.push(aux);
    var aux: temp = new temp();
    aux.color = "#999999";
    aux.value = 40;
    this.transactions.push(aux);
    var aux: temp = new temp();
    aux.color = "#777777";
    aux.value = 20;
    this.transactions.push(aux);
  }
  public selectedVal: string;

  ngOnInit() {
    this.selectedVal = 'option1';
  }

  public onValChange(val: string) {
    this.selectedVal = val;
  }

  transactionsARR: Transaction[] = [
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
  ]
}


