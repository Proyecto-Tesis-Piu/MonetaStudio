import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../Users/login/login.component';
import { VideoTutorialComponent } from '../home/video-tutorial/video-tutorial.component';
import { RegistrationComponent } from '../Users/registration/registration.component';
import { ContactusComponent } from '../contactus/contactus.component';
import { StorageMap } from '@ngx-pwa/local-storage'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  token:String;
  tokenSubscription:Subscription;

  constructor(public dialog: MatDialog,
    protected storageMap: StorageMap) {
      this.tokenSubscription = this.storageMap.watch('token', {type : 'string'}).subscribe((data:String) => {
        this.token = data;
        //console.log("navbar token update: " + data);
      });
     }

  ngOnInit() { }

  logout(): void {
    this.storageMap.delete('token').subscribe(() => {});
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {});
  }

  openDialog2(): void {
    const dialogRef = this.dialog.open(VideoTutorialComponent, {});
  }

  newUser(): void {
    const dialogRef = this.dialog.open(RegistrationComponent, {});
  }

  contactUsDialog(): void{
    const dialogRef = this.dialog.open(ContactusComponent, {});
  }
}
