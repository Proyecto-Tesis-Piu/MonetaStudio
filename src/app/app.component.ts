import { Component } from '@angular/core';
import { LoginDialogComponent } from './Components/Users/login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Subscription } from 'rxjs';
import { RegistrationComponent } from './Components/Users/registration/registration.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Moneta Studio';
  openSidenav = false;
  token: String;
  tokenSubscription: Subscription;


  constructor(public dialog: MatDialog,
    protected storageMap: StorageMap) {
    this.tokenSubscription = this.storageMap.watch('token', { type: 'string' }).subscribe((data: String) => {
      this.token = data;
    });
  }

  logout(): void {
    this.storageMap.delete('token').subscribe(() => { });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {});
  }

  openDialog2(): void {
    const dialogRef = this.dialog.open(RegistrationComponent, {});
  }

  ngOnDestroy() {
    this.tokenSubscription.unsubscribe();
  }

}
