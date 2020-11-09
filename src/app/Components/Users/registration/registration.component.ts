import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, Validators, FormGroup, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { User } from '../shared/user.model';
import { Country } from '../../Shared/Countries/countries.model';
import { State } from '../../Shared/Countries/states.model';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';

import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { StorageMap } from '@ngx-pwa/local-storage';
import { MatDialogRef } from '@angular/material/dialog';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-MX'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class RegistrationComponent implements OnInit {
  response: any;
  countryArray: Country[] = [];
  stateArray: State[] = [];
  user: User;
  formModel:FormGroup;
  ErrorMessage:any;
  date = new FormControl(moment());

  constructor(public dialogRef: MatDialogRef<RegistrationComponent>,
              private http: HttpClient, 
              public service: UserService, 
              private router: Router,
              private _snackBar: MatSnackBar,
              private _adapter: DateAdapter<any>,
              protected storageMap: StorageMap) {
    
    this.service.getCountries().subscribe((countries: Country[]) => {
        this.countryArray = countries;
      });
    
    this.storageMap.watch('token', {type: 'string'})
      .subscribe((result) => {
        //console.log("registration token update: " + result);
        if(result){
          this.service.getUserProfile(result).subscribe(
            (res:User) => {
              this.user = res
            },
            err => {
              console.log(err);
            }
          )
        }else{
          this.user = new User();
        }
      });
  }

  ngOnInit(): void {

  }

  updateForm(value: any, property: string) {
    this.user[property] = value;
    //console.log(this.user);
  }

  fillStates(countryCode: string) {
    this.service.getStates(countryCode).subscribe((states: State[]) => {
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
                //console.log(element.description);
                break;
            }
          });
          this._snackBar.open(this.ErrorMessage, 'Cerrar');
        }
      },
      err => console.log(err)
    );
    this.dialogRef.close();
  }
}
