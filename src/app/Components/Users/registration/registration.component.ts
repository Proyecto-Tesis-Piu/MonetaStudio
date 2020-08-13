import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, Validators, FormGroup, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { User } from '../shared/user.model';
import { Country } from '../../Shared/Countries/countries.model';
import { State } from '../../Shared/Countries/states.model';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  response: any;
  countryArray: Country[] = [];
  stateArray: State[] = [];
  user: User;
  formModel:FormGroup;
  ErrorMessage:any;

  constructor(private http: HttpClient, 
              public service: UserService, 
              private router: Router,
              private _snackBar: MatSnackBar) {
    

    this.user = new User();

    this.http.get('http://localhost:49755/api/Country')
      .subscribe((countries: Country[]) => {
        this.countryArray = countries;
      });
  }

  ngOnInit(): void {


  }

  updateForm(value: any, property: string) {
    this.user[property] = value;
    //console.log(this.user);
  }

  fillStates(countryCode: string) {
    this.http.get('http://localhost:49755/api/Country/' + countryCode + '/States')
      .subscribe((states: State[]) => {
        this.stateArray = states;
      });
  }

  guardar() {
    this.service.register().subscribe(
      (res:any) => {
        if(res.succeeded){
          //TODO: login
          this._snackBar.open('Registro exitoso', 'Cerrar');
          this.router.navigate(['transactions']);
        }else{
          res.errors.forEach(element => {
            switch(element.code) {
              case 'DuplicateUserName':
                this.ErrorMessage += 'User email already registered';
                break;
              default:
                this.ErrorMessage += 'Registration failed';
                console.log(element.description);
                break;
            }
          });
          this._snackBar.open(this.ErrorMessage, 'Cerrar');
        }
      },
      err => console.log(err)
    );
  }
}
