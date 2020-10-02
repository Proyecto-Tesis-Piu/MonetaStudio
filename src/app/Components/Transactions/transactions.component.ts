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

  //for piechart
  public expenseDatasets: Array<any>;
  public expenseLabels: Array<any>;
  public incomeDatasets: Array<any>;
  public incomeLabels: Array<any>;

  public chartType: string = 'doughnut';
  public chartColors: Array<any> = [
    {
      backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
      hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774'],
      borderWidth: 2,
    }
  ];
  public chartOptions: any = {
    responsive: true,
    tooltips: {
      // Disable the on-canvas tooltip
      enabled: false,

      custom: function (tooltipModel: any) {
        // Tooltip Element
        let tooltipEl = document.getElementById('chartjs-tooltip');

        // Create element on first render
        if (!tooltipEl) {
          tooltipEl = document.createElement('div');
          tooltipEl.id = 'chartjs-tooltip';
          tooltipEl.innerHTML = '<table></table>';
          document.body.appendChild(tooltipEl);
        }

        // Hide if no tooltip
        if (tooltipModel.opacity === 0) {
          tooltipEl.style.opacity = '0';
          return;
        }

        // Set caret Position
        tooltipEl.classList.remove('above', 'below', 'no-transform');
        if (tooltipModel.yAlign) {
          tooltipEl.classList.add(tooltipModel.yAlign);
        } else {
          tooltipEl.classList.add('no-transform');
        }

        function getBody(bodyItem: { lines: any }) {
          return bodyItem.lines;
        }

        // Set Text
        if (tooltipModel.body) {
          const titleLines = tooltipModel.title || [];
          const bodyLines = tooltipModel.body.map(getBody);

          let innerHtml = '<thead>';

          titleLines.forEach(function (title: string) {
            innerHtml += '<tr><th>' + title + '</th></tr>';
          });
          innerHtml += '</thead><tbody>';

          bodyLines.forEach(function (body: string, i: string | number) {
            var text = body[0].split(':');
            const colors = tooltipModel.labelColors[i];
            let style = 'background-color:' + colors.backgroundColor;
            style += '; display: inline-block; width: 10px; height: 10px; margin-right: 10px;';
            const span = '<span class="chartjs-tooltip-key" style="' + style + '"></span>';
            innerHtml += '<tr><td>' + span + text[0] + ' - ' + text[1] + '%</td></tr>';
          });
          innerHtml += '</tbody>';

          const tableRoot = tooltipEl.querySelector('table');
          if (tableRoot) {
            tableRoot.innerHTML = innerHtml;
          }
        }

        // `this` will be the overall tooltip
        var position = this._chart.canvas.getBoundingClientRect();

        // Display, position, and set styles for font
        tooltipEl.style.opacity = '1';
        tooltipEl.style.position = 'absolute';
        tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
        tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
        tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
        //tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
        tooltipEl.style.fontSize = '12px';
        tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
        tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
        tooltipEl.style.pointerEvents = 'none';
      },
    },
  };

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
    this.expenseDatasets = [ { data: this.expenses.map(e => e.percentage) } ];
    this.expenseLabels = this.expenses.map(e => e.concept);
    this.incomeDatasets = [ { data: this.incomes.map(e => e.percentage) } ];
    this.incomeLabels = this.incomes.map(e => e.concept);
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

  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
}


