import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Subscription } from 'rxjs';
import { LoginDialogComponent } from '../../Users/login/login.component';
import { RegistrationComponent } from '../../Users/registration/registration.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  token:String;
  tokenSubscription:Subscription;
  showFiller = false;

  constructor(public dialog: MatDialog,
    protected storageMap: StorageMap) { }
  
  ngOnInit() {
    this.tokenSubscription = this.storageMap.watch('token', {type: 'string'})
      .subscribe((result) => {
        this.token = result;
      });
  }

  ngOnDestroy() {
    this.tokenSubscription.unsubscribe();
  }

  logout() {
    this.storageMap.delete('token').subscribe(() => {});
    localStorage.removeItem('token');
  }

  openDialog() {
    const dialogRef = this.dialog.open(LoginDialogComponent, {});
  }

  newUser(): void {
    const dialogRef = this.dialog.open(RegistrationComponent, {});
  }

  scrollToElement(selector){
    const element = document.getElementById(selector)
    element ? element.scrollIntoView({behavior: "smooth", block: "center"}): null;
  }
}
