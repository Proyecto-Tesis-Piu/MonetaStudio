import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../Users/login/login.component';
import { VideoSavioComponent } from '../home/video-savio/video-savio.component';
import { RegistrationComponent } from '../Users/registration/registration.component';

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

  openDialog2(): void {
    const dialogRef = this.dialog.open(VideoSavioComponent, {});
  }

  newUser(): void {
    const dialogRef = this.dialog.open(RegistrationComponent, {});
  }
}
