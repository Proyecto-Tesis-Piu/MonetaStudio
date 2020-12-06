import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { StorageMap } from '@ngx-pwa/local-storage'
import { SnackBarService } from '../../Shared/Snackbar/snack-bar.service';
import { RegistrationComponent } from '../registration/registration.component';

@Component({
  selector: 'app-dialog-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginDialogComponent implements OnInit {
  loginForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<LoginDialogComponent>,
    public formBuilder: FormBuilder,
    public service: UserService,
    private _snackBar: SnackBarService,
    protected storageMap: StorageMap,
    public dialog: MatDialog
  ) {
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
  
  newUser(): void {
    const dialogRef = this.dialog.open(RegistrationComponent, {});
  }
}


