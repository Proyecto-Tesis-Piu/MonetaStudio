import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'Moneta Studio';
<<<<<<< HEAD
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
    this.storageMap.delete('token').subscribe(() => {});
    localStorage.removeItem('token');
    window.location.reload();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {});
  }

  openDialog2(): void {
    const dialogRef = this.dialog.open(RegistrationComponent, {});
  }
=======

  constructor() { }

>>>>>>> abf854106cd465fc729f56133cb86e21bb7eefa6
}
