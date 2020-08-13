import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { User } from '../shared/user.model';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  response:any;
  loginForm:FormGroup;
  currentUser: User;
  private loggedInStatus = JSON.parse(localStorage.getItem('loggedIn') || 'false');

  constructor(public formBuilder: FormBuilder, 
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
            window.location.reload();
          }, 
          err => {
            if(err.status == 400){
              this._snackBar.open(err.error.reasonPhrase, 'Cerrar');
            }
            console.log(err)
          }, 
          () => console.log('Complete'));
    }
  }
}
