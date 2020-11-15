import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Subscription } from 'rxjs';
import { IconSelectionDialogComponent } from '../icon-selection-dialog/icon-selection-dialog.component';
import { Transaction } from '../transaction.model';
import { TransactionService } from '../transactions.service';
import { ColorSelectionComponent } from '../color-selection/color-selection.component';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, OnDestroy {

  categories: Transaction[];
  replacementCategories: Transaction[];
  addedCategory: Transaction;
  editCategory: Transaction;
  dirty: boolean;
  deletedCategory: String;
  replacementCategory: String;
  categoryHasTransactions: boolean;
  tokenSubscription: Subscription;
  token: String;

  constructor(public dialogRef: MatDialogRef<CategoriesComponent>,
    private service: TransactionService,
    public dialog: MatDialog,
    public _snackBar: MatSnackBar,
    protected storageMap : StorageMap){
      
    this.tokenSubscription = this.storageMap.watch('token', {type : 'string'}).subscribe((data:String) => {
      this.token = data;
      //console.log("sidebar token update: " + data);
    });

    this.addedCategory = new Transaction();
    this.addedCategory.isExpense = true;
    this.addedCategory.icon = "home";
    this.addedCategory.color = "#b0bec5";


    this.dirty = false;
    this.editCategory = new Transaction();
    this.replacementCategory = null;

    this.service.getCategories(this.token).subscribe((res: Transaction[]) => {
      this.categories = res.filter(category => category.userId).sort(function (a, b) {
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

      this.replacementCategories = res.sort(function (a, b) {
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
  }

  ngOnInit(): void { }

  updateForm(value: any, field: string, mode: string) {
    if (mode === "edit") {
      this.editCategory[field] = value;
      this.dirty = true;
      //console.log(this.editCategory);
    } else { //add
      this.addedCategory[field] = value;
      //console.log(this.addedCategory);
    }
  }

  onSelectChanged(categoryId: string, mode: string) {
    //console.log(categoryId);

    switch (mode) {
      case "edit":
        var temp = this.categories.find(category => category.id === categoryId);
        this.editCategory = new Transaction();
        if (temp) {
          this.editCategory.id = temp.id;
          this.editCategory.icon = temp.icon;
          this.editCategory.concept = temp.concept;
          this.editCategory.isExpense = temp.isExpense;
          this.editCategory.userId = temp.userId;
          this.editCategory.color = temp.color;
        }
        this.dirty = false;
        //console.log(this.editCategory);
        break;
      case "delete":
        if (categoryId) {
          this.deletedCategory = categoryId;
          this.service.categoryHasTransactions(this.deletedCategory, this.token).subscribe((res: boolean) => {
            this.categoryHasTransactions = res;
          },
            err => {
              console.log(err);
            },
            () => {
              //console.log('Complete');
            });
        }
        break;
      case "replace":
        if (categoryId) {
          this.replacementCategory = categoryId;
        }
        break;
    }
  }

  addCategory_onClick() {
    this.service.createCategory(this.addedCategory, this.token).subscribe((res: Transaction[]) => {
      this.categories = res.filter(category => category.userId).sort(function (a, b) {
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
      this._snackBar.open("Categoría agregada", "Cerrar");
    },
      err => {
        console.log(err);
      },
      () => {
        //console.log('Complete');
      });
      this.dialogRef.close();
  }

  editCategory_onClick() {
    this.service.updateCategory(this.editCategory, this.token).subscribe((res: Transaction[]) => {
      this.categories = res.filter(category => category.userId).sort(function (a, b) {
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
      this._snackBar.open("Categoría guardada", "Cerrar");
    },
      err => {
        console.log(err);
      },
      () => {
        //console.log('Complete');
      });
      this.dialogRef.close();
  }

  deleteCategory_onClick() {
    this.service.deleteCategory(this.deletedCategory, this.replacementCategory, this.token).subscribe((res: Transaction[]) => {
      this.categories = res.filter(category => category.userId).sort(function (a, b) {
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
      this._snackBar.open("Categoría eliminada", "Cerrar");
    },
      err => {
        console.log(err);
      },
      () => {
        //console.log('Complete');
      });
      this.dialogRef.close();
  }

  openIconSelectionDialog(event, mode: string) {
    //console.log(event);
    const dialogRef = this.dialog.open(IconSelectionDialogComponent, {
      position: { top: event.pageY + "px", left: event.pageX + "px" },
      maxWidth: 470,
      height: (event.view.innerHeight - event.pageY) + "px",
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (mode === "edit" && this.editCategory.icon !== result) {
          this.editCategory.icon = result;
          this.dirty = true;
        }
        else {
          this.addedCategory.icon = result;
        }
      }
      //console.log(this.addedCategory);
    });
  }

  openColorSelectionDialog(event, mode: string) {
    //console.log(event);
    const dialogRef = this.dialog.open(ColorSelectionComponent, {
      position: { top: event.pageY + "px", left: event.pageX + "px" },
      maxWidth: 470,
      height: (event.view.innerHeight - event.pageY) + "px",
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (mode === "edit" && this.editCategory.color !== result) {
          this.editCategory.color = result;
          this.dirty = true;
        }
        else {
          this.addedCategory.color = result;
        }
      }
      //console.log(this.addedCategory);
    });
  }

  ngOnDestroy() {
    this.tokenSubscription.unsubscribe();
  }
}
