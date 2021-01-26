import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../../../Services/user.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { StorageMap } from '@ngx-pwa/local-storage'
import { SnackBarService } from '../../../Services/snack-bar.service';
import { RegistrationComponent } from '../registration/registration.component';

import { SocialAuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

@Component({
  selector: 'app-dialog-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginDialogComponent implements OnInit {
  loginForm: FormGroup;
  user: SocialUser;

  constructor(public dialogRef: MatDialogRef<LoginDialogComponent>,
    public formBuilder: FormBuilder,
    public service: UserService,
    private _snackBar: SnackBarService,
    protected storageMap: StorageMap,
    public dialog: MatDialog,
    private authService: SocialAuthService
  ) {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      if(user){ 
        this.dialogRef.close(); 
        console.log(user);
        this.storageMap.set('token', JSON.stringify(user)).subscribe(() => { });
        localStorage.setItem('token', JSON.stringify(user));
      }
    });
    this.loginForm = new FormGroup({
      userEmail: new FormControl(''),
      password: new FormControl('')
    });
  }

  hide = true;

  ngOnInit() { }

  submit_onClick() {
    if (this.loginForm.valid) {
      this.service.login(this.loginForm.value.userEmail, this.loginForm.value.password)
        .subscribe(
          (res: any) => {
            this.storageMap.set('token', res.token).subscribe(() => { });
            this.storageMap.set('emailConfirmed', res.emailConfirmed).subscribe(() => { });
            localStorage.setItem('token', res.token);

            if (!res.emailConfirmed) {
              this._snackBar.show("Por favor, confirma tu correo.", 'Cerrar');
            }
          },
          err => {
            if (err.status == 400) {
              this._snackBar.show(err.error.reasonPhrase, 'Cerrar');
            }
            console.log(err)
          },
          () => {
            //console.log('Complete');
            this.dialogRef.close();
          });
    }
  }
  
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }

  newUser(): void {
    this.dialogRef.close();
    const dialogRef = this.dialog.open(RegistrationComponent, {});
  }
}


