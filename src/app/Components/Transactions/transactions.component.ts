import { Component, OnDestroy, OnInit } from '@angular/core';
import { Transaction, TransactionFlatNode } from "../../Models/transaction.model";
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { MatDialog } from '@angular/material/dialog';
import { NewTransactionComponent } from './new-transaction/new-transaction.component';
import { TransactionService } from '../../Services/transactions.service'
import { DeleteTransactionComponentDialog } from './delete-transaction/delete-transaction.component';
import { IAngularMyDpOptions, IMyDateModel, IMyMarkedDates, IMyRangeDateSelection, IMyDate } from 'angular-mydatepicker';
import { CalendarDate, GeneralData } from '../../Models/calendarDate.model';
import { CategoriesComponent } from './categories/categories.component';
import { Subscription } from 'rxjs';
import { StorageMap } from '@ngx-pwa/local-storage';
import { SnackBarService } from '../../Services/snack-bar.service';

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
export class TransactionsComponent implements OnInit, OnDestroy {
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
      category: node.category,
      color: node.color,
    };
  }

  treeControl = new FlatTreeControl<TransactionFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.childrenTransactions);

  expenses: Transaction[];
  incomes: Transaction[];
  expenseDates: IMyMarkedDates;
  incomeDates: IMyMarkedDates;
  expenseIncomeDates: IMyMarkedDates;
  public selectedVal: string;
  public selectedGraph: string;
  fromDate: Date;
  toDate: Date;

  //for piechart
  public expenseDatasets: Array<any>;
  public expenseLabels: Array<any>;
  public expenseChartColors: Array<any>;
  public incomeDatasets: Array<any>;
  public incomeLabels: Array<any>;
  public incomeChartColors: Array<any>;
  public incomeChartColors2: Array<any>;

  //public chartType: string = 'doughnut';

  //for Horizontal Bar chart

  public expenseDatasetsAmount: Array<any>;
  public incomeDatasetsAmount: Array<any>;

  //for General Graph
  public generalLabels: Array<any>;
  public generalChartColors: Array<any>;
  public generalGraphDataSet: Array<any>;

  //for Detail Graph
  public detailDatasets: Array<any>;
  public detailChartColors: Array<any>;


  /* public chartColors: Array<any> = [
    {
      backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
      hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774'],
      borderWidth: 2,
    }
  ]; */
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
            innerHtml += '<tr><td>' + span + text[0] + ': ' + text[1] + '%</td></tr>';
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

  public chartOptionsHorizontalBar: any = {
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
            innerHtml += '<tr><td>$ ' + text[0] + '</td></tr>';
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
    scales: {
      xAxes: [{
        ticks: {
          beginAtZero: true
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }

  };

  /* public chartOptionsStackedBar: any = {
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
            innerHtml += '<tr><td>' + text[0] + ': $' + text[1].trim() + '</td></tr>';
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
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        },
        stacked: true
      }],
      xAxes: [{
        stacked: true
      }],
    } 

  }; */

  //for datePicker
  myDpOptions: IAngularMyDpOptions = {
    inline: true,
    dateRange: true,
    dateFormat: 'dd.mm.yyyy',
    sunHighlight: false,
    dayLabels: { su: 'Dom', mo: 'Lun', tu: 'Mar', we: 'Mie', th: 'Jue', fr: 'Vie', sa: 'Sab' },
    monthLabels: { 1: 'Ene', 2: 'Feb', 3: 'Mar', 4: 'Abr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Ago', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dic' },
    // other options are here...
  };

  generalData: GeneralData;

  myDateInit: boolean = true;
  model: IMyDateModel = null;


  token: String;
  tokenSubscription: Subscription;

  constructor(public dialog: MatDialog,
    private service: TransactionService,
    private _snackBar: SnackBarService,
    protected storageMap: StorageMap) {

    var date = new Date();
    //Production, uncomment when pushing to repo, comment when testing
    this.fromDate = new Date(date.getFullYear(), date.getMonth(), 1);
    this.toDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    
    //Testing, uncomment when testing, comment when pushing to repo
    //this.fromDate = new Date(2020, 10, 1);
    //this.toDate = new Date(2020, 10, 30);

    this.generalData = new GeneralData();

    this.selectedVal = 'expenses';
    this.selectedGraph = 'general';

    this.tokenSubscription = this.storageMap.watch('token', { type: 'string' }).subscribe((data: String) => {
      this.token = data;
      if (this.token) {
        this.getTransactions();
        this.getCalendarDates();
      }
      //console.log("sidebar token update: " + data);
    });
  }

  ngOnInit() {
    if (this.myDateInit) {
      // Initialize to specific date range with IMyDate object. 

      this.model = {
        isRange: true,
        singleDate: null,
        dateRange: {
          beginDate: {
            year: this.fromDate.getFullYear(), month: this.fromDate.getMonth() + 1, day: this.fromDate.getDate()
          },
          endDate: {
            year: this.toDate.getFullYear(), month: this.toDate.getMonth() + 1, day: this.toDate.getDate()
          }
        }
      };
    }
    else {
      this.model = {
        isRange: true,
        singleDate: null,
        dateRange: {
          beginJsDate: this.fromDate,
          endJsDate: this.toDate
        }
      };
    }
  }

  public onValChange(val: string) {
    this.selectedVal = val;
  }

  public onGraphChange(val: string) {
    this.selectedGraph = val;
  }

  dataSourceExpenses = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  dataSourceIncomes = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  hasChild = (_: number, node: TransactionFlatNode) => node.expandable;

  createTransactionDialog(): void {
    const dialogRef = this.dialog.open(NewTransactionComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.createTransaction(result, this.fromDate, this.toDate, this.token).subscribe(
          (res: GeneralData) => {
            this.generalData = res;
            this.handleTransactionsResponse();
          },
          err => {
            console.log(err);
            //default data for when the API is not on local host
            //comment when on production
            this.generalData.transactions = transactionTree;
            this.expenses = this.generalData.transactions.filter(t => t.isExpense);
            this.incomes = this.generalData.transactions.filter(t => !t.isExpense);
            this.assignDataSources();
          },
          () => {
            //console.log('Complete');
            this.getCalendarDates();
          });
      }
    });
  }

  createCategoriesDialog(): void {
    const dialogRef = this.dialog.open(CategoriesComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.getTransactions();
      this.getCalendarDates();
    });
  }

  getTransactions() {
    this.service.getTransactions(this.fromDate, this.toDate, this.token).subscribe(
      (res: GeneralData) => {
        this.generalData = res;
        if (this.generalData.transactions.length > 0) {
          if (this._snackBar.getMessage() === "No hay transacciones para el rango de fechas seleccionado.")
            this._snackBar.dismiss();
        } else {
          this._snackBar.show("No hay transacciones para el rango de fechas seleccionado.", 'Cerrar', { duration: 10000 });
        }
        this.handleTransactionsResponse();
      },
      err => {
        console.log(err);
        //default data for when the API is not on local host
        //comment when on production
        this.generalData.transactions = transactionTree;
        this.expenses = this.generalData.transactions.filter(t => t.isExpense);
        this.incomes = this.generalData.transactions.filter(t => !t.isExpense);
        this.assignDataSources();
      },
      () => {
        //console.log('Complete GetTransactions');
      });
  }

  assignDataSources() {
    this.dataSourceExpenses.data = this.expenses;
    this.dataSourceIncomes.data = this.incomes;
    this.expenseDatasets = [{ data: this.expenses.map(e => e.percentage) }];
    this.expenseDatasetsAmount = [{ data: this.expenses.map(e => e.amount) }];
    this.expenseLabels = this.expenses.map(e => e.concept + ": " + e.percentage + "%");
    this.expenseChartColors = [{
      backgroundColor: this.expenses.map(e => e.color),
      hoverBackgroundColor: this.expenses.map(e => this.getHoverColor(e.color)),
      borderWidth: 0
    }];
    this.incomeDatasets = [{ data: this.incomes.map(e => e.percentage) }];
    this.incomeDatasetsAmount = [{ data: this.incomes.map(e => e.amount) }];
    this.incomeLabels = this.incomes.map(e => e.concept);
    this.incomeChartColors = [{
      backgroundColor: this.incomes.map(e => e.color),
      hoverBackgroundColor: this.incomes.map(e => this.getHoverColor(e.color)),
      borderWidth: 0
    }];

    this.incomeChartColors2 = [{
      backgroundColor: this.incomes.map(e => this.hexToRgbA(e.color)),
      hoverBackgroundColor: this.incomes.map(e => this.getHoverColor(e.color)),
      borderWidth: 0
    }];

    this.generalGraphDataSet = [{ data: [this.generalData.expenseTotal, this.generalData.incomeTotal] }];
    this.generalLabels = ["Gastos: " + this.generalData.expensePercentage + "%", "Ingresos: " + this.generalData.incomePercentage + "%"];

    if (this.generalData.transactions.length > 0) {
      this.detailDatasets = this.generalData.transactions.map(category => {
        var dataset;
        if (category.isExpense) {
          dataset = { data: [0, category.amount], label: category.concept };
        } else {
          dataset = { data: [category.amount, 0], label: category.concept };
        }
        console.log(dataset);
        return dataset;

      });
    } else {
      this.detailDatasets = [];
    }
    this.detailChartColors = this.generalData.transactions.map(c => {
      return {
        backgroundColor: ['rgba(255,0,0,.5)', 'rgba(124,252,0,.5)'],
        borderColor: ['rgba(255,0,0,1)', 'rgba(124,252,0,1)'],
        borderWidth: 2
      };
    });
    this.generalChartColors = this.detailChartColors[0];
    this.refreshGraphs();
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  refreshGraphs() {
    (async () => {
      this.selectedGraph = this.selectedGraph === "general" ? "details" : "general";
      this.selectedVal = this.selectedVal === "expenses" ? "incomes" : "expenses";

      await this.delay(100);

      this.selectedGraph = this.selectedGraph === "general" ? "details" : "general";
      this.selectedVal = this.selectedVal === "expenses" ? "incomes" : "expenses";
    })();
  }

  hexToRgbA(hex) {
    var c;
    c = hex.substring(1).split('');
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');
    return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',.7)';
  }

  deleteTransaction(trans: Transaction) {
    trans.icon = this.generalData.transactions.find(t => t.id == trans.category).icon;
    const dialogRef = this.dialog.open(DeleteTransactionComponentDialog, { data: trans });

    dialogRef.afterClosed().subscribe((result: Boolean) => {
      //console.log('The dialog was closed');
      if (result) {
        this.service.deleteTransaction(trans.id, this.fromDate, this.toDate, this.token).subscribe(
          (res: GeneralData) => {
            this.generalData = res;
            this.handleTransactionsResponse();
          },
          err => {
            console.log(err);
            this.generalData.transactions = transactionTree;
            this.expenses = this.generalData.transactions.filter(t => t.isExpense);
            this.incomes = this.generalData.transactions.filter(t => !t.isExpense);
            this.assignDataSources();
          },
          () => {
            this.getCalendarDates();
            //console.log('Complete');
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
      if (result) {
        this.service.modifyTransaction(result, this.fromDate, this.toDate, this.token).subscribe(
          (res: GeneralData) => {
            this.generalData = res
            this.handleTransactionsResponse();
          },
          err => {
            console.log(err);
            //default data for when the API is not on local host
            //comment when on production
            this.generalData.transactions = transactionTree;
            this.expenses = this.generalData.transactions.filter(t => t.isExpense);
            this.incomes = this.generalData.transactions.filter(t => !t.isExpense);
            this.assignDataSources();
          },
          () => {
            //console.log('Complete');
            this.getCalendarDates();
          });
      }
    });
  }

  handleTransaction(event, trans: Transaction) {
    //console.log(event.target.tagName);
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
    this.getCalendarDates();
  }

  handleTransactionsResponse() {
    this.expenses = this.generalData.transactions.filter(t => t.isExpense).sort(function (a, b) {
      if (a.cumulativePercentage > b.cumulativePercentage) {
        return -1;
      }
      if (a.cumulativePercentage < b.cumulativePercentage) {
        return 1;
      }
      return 0;
    });

    this.incomes = this.generalData.transactions.filter(t => !t.isExpense).sort(function (a, b) {
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

  onRangeDateSelection(event: IMyRangeDateSelection): void {
    if (event.isBegin) {
      this.fromDate = event.jsDate;
    } else {
      this.toDate = event.jsDate;
      this.getTransactions();
    }

    // console.log('onRangeDateSelection(): event: ', event);
    // console.log('begin', this.fromDate);
    // console.log('end', this.toDate);
  }

  getCalendarDates() {
    let copyOfOptions: IAngularMyDpOptions = this.getCopyOfOptions();
    this.service.getCalendarDates(this.token).subscribe(
      (res: CalendarDate[]) => {
        this.expenseDates = {
          color: "red", dates: res.filter(item => item.hasExpense && !item.hasIncome)
            .map(
              date => {
                var dateValue = new Date(date.date);
                var dateModel = { day: dateValue.getDate(), month: dateValue.getMonth() + 1, year: dateValue.getFullYear() } as IMyDate;
                return dateModel;
              })
        };

        this.incomeDates = {
          color: "green", dates: res.filter(item => !item.hasExpense && item.hasIncome)
            .map(
              date => {
                var dateValue = new Date(date.date);
                var dateModel = { day: dateValue.getDate(), month: dateValue.getMonth() + 1, year: dateValue.getFullYear() } as IMyDate;
                return dateModel;
              })
        };

        this.expenseIncomeDates = {
          color: "black", dates: res.filter(item => item.hasExpense && item.hasIncome)
            .map(
              date => {
                var dateValue = new Date(date.date);
                var dateModel = { day: dateValue.getDate(), month: dateValue.getMonth() + 1, year: dateValue.getFullYear() } as IMyDate;
                return dateModel;
              })
        };

        //this.myDpOptions.markDates = [this.expenseDates, this.incomeDates, this.expenseIncomeDates];
        copyOfOptions.markDates = [this.expenseDates, this.incomeDates, this.expenseIncomeDates];
        this.myDpOptions = copyOfOptions;
      },
      err => {

      },
      () => {
        //console.log('Complete');
      });
  }

  getCopyOfOptions(): IAngularMyDpOptions {
    return JSON.parse(JSON.stringify(this.myDpOptions));
  }

  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

  ngOnDestroy() {
    this.tokenSubscription.unsubscribe();
  }

  getHoverColor(color: string) {
    switch (color) {
      case '#fbd4c4':
        return '#e5c2b5';
      case '#808080':
        return '#a3a3a3';
      case '#3e6158':
        return '#4E7A6E';
      case '#3f7a89':
        return '#498fa0';
      case '#96c582':
        return '#7AC45A';
      case '#b7d5c4':
        return '#a0d3b6';
      case '#bcd6e7':
        return '#a5cce5';
      case '#7c90c1':
        return '#8ca3d8';
      case '#9d8594':
        return '#b599ab';
      case '#dad0d8':
        return '#d8bad2';
      case '#4b4fce':
        return '#5459e5';
      case '#4e0a77':
        return '#6d0fa8';
      case '#a367b5':
        return '#9c53b2';
      case '#ee3e6d':
        return '#ff4c7f';
      case '#d63d62':
        return '#ed446e';
      case '#c6a670':
        return '#c49c5c';
      case '#f46600':
        return '#ff710c';
      case '#cf0500':
        return '#e80300';
      case '#efabbd':
        return '#ed95ac';
      case '#8e0622':
        return '#a5082a';
      case '#f0b89a':
        return '#efa783';
      case '#f0ca68':
        return '#efc251';
      case '#62382f':
        return '#7a453a';
      case '#c97545':
        return '#e0814e';
    }

  }
}


