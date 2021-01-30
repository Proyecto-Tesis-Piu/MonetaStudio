import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StorageMap } from '@ngx-pwa/local-storage';
import { from, Subscription } from 'rxjs';
import { LoginDialogComponent } from '../../Users/login/login.component';
import { RegistrationComponent } from '../../Users/registration/registration.component';
import { AuthService } from '@auth0/auth0-angular';
//import { UserSettingsComponent } from '../../settings/settings.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  token: String;
  emailConfirmed: boolean;
  tokenSubscription: Subscription;
  emailConfirmedSubscription: Subscription;
  showFiller = false;

  constructor(public dialog: MatDialog,
    protected storageMap: StorageMap,
    public auth: AuthService) { }

  ngOnInit() {
    this.tokenSubscription = this.storageMap.watch('token', { type: 'string' })
      .subscribe((result) => {
        this.token = result;
      });

    this.emailConfirmedSubscription = this.storageMap.watch('emailConfirmed', { type: 'boolean' })
      .subscribe((result) => {
        this.emailConfirmed = result;
      });

    this.auth.user$.subscribe(user => {
      console.log(user);
    });

    this.auth.idTokenClaims$.subscribe(user => {
      console.log(user);
    });
  }

  ngOnDestroy() {
    this.tokenSubscription.unsubscribe();
  }

  logout() {
    this.storageMap.delete('token').subscribe(() => { });
    this.storageMap.delete('emailConfirmed').subscribe(() => { });
    localStorage.removeItem('token');
  }

  openDialog() {
    const dialogRef = this.dialog.open(LoginDialogComponent, {});
  }

  newUser(): void {
    const dialogRef = this.dialog.open(RegistrationComponent, {});
  }

  /*openSettings(): void {
    const dialogRef = this.dialog.open(UserSettingsComponent, {});
  }*/

  auth0Logout() {
    this.auth.logout({ returnTo: window.location.origin })
  }

  auth0Login() {
    this.auth.loginWithRedirect();
  }

  scrollToElement(selector) {
    const element = document.getElementById(selector)
    element ? element.scrollIntoView({ behavior: "smooth", block: "center" }) : null;
  }
}
