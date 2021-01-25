import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Subscription } from 'rxjs';
import { LoginDialogComponent } from 'src/app/Components/Users/login/login.component';
import { RegistrationComponent } from 'src/app/Components/Users/registration/registration.component';
import { Router } from '@angular/router';
//import { UserSettingsComponent } from '../../settings/settings.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  openSidenav = false;
  token:String;
  tokenSubscription:Subscription;

  constructor(public dialog: MatDialog,
    protected storageMap : StorageMap,
    public router: Router){
    this.tokenSubscription = this.storageMap.watch('token', {type : 'string'}).subscribe((data:String) => {
      this.token = data;
      //console.log("sidebar token update: " + data);
    });    
  }

  logout(): void {
    this.storageMap.delete('token').subscribe(() => {});
    this.storageMap.delete('emailConfirmed').subscribe(() => { });
    localStorage.removeItem('token');
    window.location.reload();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {});
  }

  openDialog2(): void {
    const dialogRef = this.dialog.open(RegistrationComponent, {});
  }

  /*openSettings(): void {
    const dialogRef = this.dialog.open(UserSettingsComponent, {});
  }*/

  menuButtonClick(){
    this.openSidenav = !this.openSidenav;
    //console.log(this.router.url);
  }
}
