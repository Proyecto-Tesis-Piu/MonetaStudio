import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormGroupDirective, NgForm, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { User } from '../shared/user.model';
import { Country } from '../../Shared/Countries/countries.model';
import { State } from '../../Shared/Countries/states.model';
import { UserService } from '../shared/user.service';

import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { StorageMap } from '@ngx-pwa/local-storage';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LegalComponent } from '../legal/legal.component';
import { SnackBarService } from '../../Shared/Snackbar/snack-bar.service';

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
              public service: UserService, 
              private _snackBar: SnackBarService,
              protected storageMap: StorageMap,
              private fb: FormBuilder,
              private dialog: MatDialog) {
    
    this.service.getCountries().subscribe((countries: Country[]) => {
        this.countryArray = countries;
      });
    
    this.storageMap.watch('token', {type: 'string'})
      .subscribe((result) => {
        if(result){
          this.service.getUserProfile(result).subscribe(
            (res:User) => {
              console.log(res);
              this.user = res;
              this.fillStates(this.user.countryCode);
              console.log(this.stateArray);
            },
            err => {
              this.user = new User();
              console.log(err);
            },
            () => {
              this.formModel = this.fb.group({
                //validators van aqui
                firstName: [this.user.firstName, Validators.required],
                lastName: [this.user.lastName, Validators.required],
                birthDate: [this.user.birthDate, Validators.required],
                sex: [this.user.sex],
                job: [this.user.job],
                civilStateString: [this.user.civilStateString],
                email: [this.user.email, [Validators.required, Validators.email] ],
                passwords: this.fb.group({
                  password: [this.user.password, [Validators.required, Validators.minLength(8), this.validatePassword]],
                  passwordConfirm: ['', Validators.required],
                }, {validator : this.comparePasswords }),
                countryCode: [this.user.countryCode],
                stateCode: [this.user.stateCode]
              });
              
            }
          )
        }else{
          this.user = new User();
          this.formModel = this.fb.group({
            //validators van aqui
            firstName: [this.user.firstName, Validators.required],
            lastName: [this.user.lastName, Validators.required],
            birthDate: ['', Validators.required],
            sex: [this.user.sex],
            job: [this.user.job],
            civilStateString: [this.user.civilStateString],
            email: [this.user.email, [Validators.required, Validators.email] ],
            passwords: this.fb.group({
              password: [this.user.password, [Validators.required, Validators.minLength(8), this.validatePassword]],
              passwordConfirm: ['', Validators.required],
            }, {validator : this.comparePasswords }),
            countryCode: [this.user.countryCode],
            stateCode: [this.user.stateCode]
          });
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

  validatePassword(control: AbstractControl) : {[key: string]: any} | null {
    if (control.value) {
      let expresion = ".*[0-9].*";
      let result = (control.value as string).match(expresion);
      if(result && result.length > 0){
        return null; // return null if validation is passed.
      }
      return { 'passwordInvalid': true }; // return object if the validation is not passed.
    }
  }

  comparePasswords(fb:FormGroup){
    let confirmPwdCtl = fb.get('passwordConfirm');
    if(confirmPwdCtl.errors == null || 'passwordMismatch' in confirmPwdCtl.errors){
      if(fb.get('password').value != confirmPwdCtl.value){
        confirmPwdCtl.setErrors({passwordMismatch: true});
      }else{
        confirmPwdCtl.setErrors(null);
      }
    }
  }

  guardar() {
    this.service.register(this.user).subscribe(
      (res:any) => {
        if(res.succeeded){
          this._snackBar.show('Registro exitoso', 'Cerrar');
          this.service.login(this.user.email, this.user.password)
          .subscribe(
            (res: any) => {
              this.storageMap.set('token', res.token).subscribe(() => {});
              this.storageMap.set('emailConfirmed', res.emailConfirmed).subscribe(() => {});
              localStorage.setItem('token', res.token);
            }, 
            err => {
              if(err.status == 400){
                this._snackBar.show(err.error.reasonPhrase, 'Cerrar');
              }
              console.log(err)
            });
          //this.router.navigate(['transactions']);
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
            console.log(element);
          });
          this._snackBar.show(this.ErrorMessage, 'Cerrar');
        }
      },
      err => console.log(err)
    );
    this.dialogRef.close();
  }

  termsOnClick(){
    const dialogRef = this.dialog.open(LegalComponent);
  }

}
