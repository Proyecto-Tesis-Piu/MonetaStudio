import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IconSelectionDialogComponent } from '../icon-selection-dialog/icon-selection-dialog.component';
import { Transaction } from '../transaction.model';
import { TransactionService } from '../transactions.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  addedCategory: Transaction;
  formModel: FormGroup;

  constructor(public dialogRef: MatDialogRef<CategoriesComponent>,
    private fb: FormBuilder,
    private service: TransactionService,
    public dialog: MatDialog) {
      this.addedCategory = new Transaction();
      this.addedCategory.isExpense = true;
      this.addedCategory.icon = "home";
      this.formModel = this.fb.group({
        concept: [this.addedCategory.concept, Validators.required],
        isExpense: [this.addedCategory.isExpense],
        icon: [this.addedCategory.icon]
      });
  }

  

  ngOnInit(): void {

  }

  updateForm(value: any, field: string) {
    this.addedCategory[field] = value;
    console.log(this.addedCategory);
  }

  openIconSelectionDialog(event){
    //console.log(event);
    const dialogRef = this.dialog.open(IconSelectionDialogComponent, {
      position: { top: event.pageY + "px", left: event.pageX + "px" }, 
      maxWidth: 500,
      height: (event.view.innerHeight - event.pageY) + "px",
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
      if(result)
        this.addedCategory.icon = result;
    });
  }
}
