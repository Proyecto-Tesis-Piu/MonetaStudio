import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Transaction } from '../../../Models/transaction.model';

@Component({
  selector: 'app-delete-transaction',
  templateUrl: './delete-transaction.component.html',
  styleUrls: ['./delete-transaction.component.css']
})
export class DeleteTransactionComponentDialog {

  constructor(public dialogRef: MatDialogRef<DeleteTransactionComponentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Transaction) { }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
