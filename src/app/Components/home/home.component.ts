import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../Users/login/login.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  token:any;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
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
