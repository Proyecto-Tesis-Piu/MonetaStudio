import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { User } from '../shared/user.model';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginDialogComponent implements OnInit {
  //response:any;
  loginForm:FormGroup;
  //currentUser: User;
  //private loggedInStatus = JSON.parse(localStorage.getItem('loggedIn') || 'false');

  constructor(public dialogRef: MatDialogRef<LoginDialogComponent>,
    public formBuilder: FormBuilder, 
    public service: UserService,
    private router: Router,
    private _snackBar: MatSnackBar
    ) { 
    this.loginForm = new FormGroup({
      userEmail: new FormControl(''),
      password: new FormControl('')
    });
  }

  ngOnInit(): void {
    if(localStorage.getItem('token'))
      this.router.navigate(['transactions']);
  }

  submit_onClick(){
    if(this.loginForm.valid){
      this.service.login(this.loginForm.value.userEmail, this.loginForm.value.password)
        .subscribe(
          (res: any) => {
            localStorage.setItem('token', res.token);
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
            window.location.reload();
        });
    }
  }
}
