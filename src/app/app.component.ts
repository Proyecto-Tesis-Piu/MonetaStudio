import { Component, ViewChild } from '@angular/core';
import { LoginDialogComponent } from './Components/Users/login/login.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Savio';
  openSidenav = false;
  token:any;

  constructor(public dialog: MatDialog){
    this.token = localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    window.location.reload();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {});
  }
}
