import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StorageMap } from '@ngx-pwa/local-storage';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { Subscription } from 'rxjs';
import { Transaction, TransactionFlatNode } from '../transaction.model';
import { TransactionService } from '../transactions.service';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.component.html',
  styleUrls: ['./new-transaction.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-MX' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class NewTransactionComponent implements OnInit {
  transaction: TransactionFlatNode;
  date = new FormControl(moment());
  formModel: FormGroup;
  categories: Transaction[];

  tokenSubscription: Subscription;
  token: String;


  constructor(public dialogRef: MatDialogRef<NewTransactionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TransactionFlatNode,
    private fb: FormBuilder,
    private service: TransactionService,
    protected storageMap : StorageMap) {
      this.tokenSubscription = this.storageMap.watch('token', {type : 'string'}).subscribe((data:String) => {
        this.token = data;
        //console.log("sidebar token update: " + data);
      });

    this.service.getCategories(this.token).subscribe((res: Transaction[]) => {
      this.categories = res.sort(function (a, b) {
        if (a.isExpense && !b.isExpense) {
          return -1;
        }
        if (!a.isExpense && b.isExpense) {
          return 1;
        }
        if (a.concept > b.concept) {
          return -1;
        }
        if (a.concept < b.concept) {
          return 1;
        }
        return 0;
      });
    },
      err => {
        console.log(err);
      },
      () => {
        //console.log('Complete');
      });

    if (data) {
      this.transaction = data;
      //this.transaction.category = this.transaction.category.toUpperCase();
    } else {
      this.transaction = new TransactionFlatNode();
    }

    this.formModel = this.fb.group({
      category: [this.transaction.category, Validators.required],
      concept: [this.transaction.concept, Validators.required],
      amount: [this.transaction.amount, [Validators.required, Validators.pattern("^([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9]{1,2})?$")]],
      transDate: [this.transaction.date, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  updateForm(value: any, property: string) {
    if (property === "amount") {
      this.transaction[property] = Number.parseFloat(value);
    } else {
      this.transaction[property] = value;
    }
    //console.log(this.transaction);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
