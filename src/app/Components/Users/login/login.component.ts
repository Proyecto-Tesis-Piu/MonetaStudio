import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar'
import { UserService } from '../shared/user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { StorageMap } from '@ngx-pwa/local-storage'

@Component({
  selector: 'app-dialog-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginDialogComponent implements OnInit {
  loginForm:FormGroup;

  constructor(public dialogRef: MatDialogRef<LoginDialogComponent>,
    public formBuilder: FormBuilder, 
    public service: UserService,
    private _snackBar: MatSnackBar,
    protected storageMap: StorageMap
    ) { 
    this.loginForm = new FormGroup({
      userEmail: new FormControl(''),
      password: new FormControl('')
    });
  }

  hide = true;

  ngOnInit() { }

  submit_onClick(){
    if(this.loginForm.valid){
      this.service.login(this.loginForm.value.userEmail, this.loginForm.value.password)
        .subscribe(
          (res: any) => {
            this.storageMap.set('token', res.token).subscribe(() => {});
          }, 
          err => {
            if(err.status == 400){
              this._snackBar.open(err.error.reasonPhrase, 'Cerrar');
            }
            console.log(err)
          }, 
          () => {
            console.log('Complete');
            this.dialogRef.close();
        });
    }
  }
}


