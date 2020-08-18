import { Component, OnInit } from '@angular/core';
import { temp } from './temp.model'
import { MatProgressSpinner } from '@angular/material/progress-spinner'

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  transactions:temp[] = [];
  constructor() {
    var aux:temp = new temp();
    aux.color = "#fff";
    aux.value = 100;
    this.transactions.push(aux);
    var aux:temp = new temp();
    aux.color = "accent";
    aux.value = 80;
    this.transactions.push(aux);
    var aux:temp = new temp();
    aux.color = "warn";
    aux.value = 60;
    this.transactions.push(aux);
    var aux:temp = new temp();
    aux.color = "#999999";
    aux.value = 40;
    this.transactions.push(aux);
    var aux:temp = new temp();
    aux.color = "#777777";
    aux.value = 20;
    this.transactions.push(aux);
   }
   public selectedVal: string;

   ngOnInit(){
    this.selectedVal ='option1';
  } 
  
  public onValChange(val: string) {
    this.selectedVal = val;
  }

}
