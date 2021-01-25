import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UserService } from '../../Services/user.service';

import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { StorageMap } from '@ngx-pwa/local-storage';
import { SnackBarService } from '../../Services/snack-bar.service';
import { Country } from '../../Models/Countries/countries.model';
import { State } from '../../Models/Countries/states.model';
import { User } from '../../Models/user.model';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { NewPassword } from '../../Models/new-password.model';


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
  selector: 'app-user-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-MX' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class UserSettingsComponent implements OnInit, OnDestroy {

  public tabName: String;
  countryArray: Country[] = [];
  stateArray: State[] = [];
  formModel: FormGroup;
  passwordFormModel: FormGroup;
  passwordRequest: NewPassword;
  user: User;
  date = new FormControl(moment());
  ErrorMessage: any;
  token: String;
  emailConfirmed: boolean;
  tokenSubscription: Subscription;
  emailConfirmedSubscription: Subscription;
  hideNew: boolean;
  hideOld: boolean;

  constructor(public dialogRef: MatDialogRef<UserSettingsComponent>,
    private service: UserService,
    private _snackBar: SnackBarService,
    protected storageMap: StorageMap,
    private fb: FormBuilder) {

    this.service.getCountries().subscribe((countries: Country[]) => {
      this.countryArray = countries;
    });

    this.tabName = "profile";
    
    this.hideOld = true;
    this.hideNew = true;

    this.emailConfirmedSubscription = this.storageMap.watch('emailConfirmed', { type: 'boolean' })
      .subscribe((result) => {
        this.emailConfirmed = result;
      });

    this.tokenSubscription = this.storageMap.watch('token', { type: 'string' })
      .subscribe((result) => {
        this.service.getUserProfile(result).subscribe(
          (res: User) => {
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
              countryCode: [this.user.countryCode],
              stateCode: [this.user.stateCode]
            });

          }
        )
      });
    
    this.passwordRequest = new NewPassword();

    this.passwordFormModel = this.fb.group({
      //validators van aqui
      oldPassword: ["", Validators.required],
      newPassword: ["", [Validators.required, Validators.minLength(8), this.validatePassword]],
      passwordConfirm: ['', Validators.required]
    }, { validator: this.comparePasswords });
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.emailConfirmedSubscription.unsubscribe();
    this.tokenSubscription.unsubscribe();
  }

  public onTabChange(val: string) {
    this.tabName = val;
  }

  fillStates(countryCode: string) {
    this.service.getStates(countryCode).subscribe((states: State[]) => {
      this.stateArray = states;
    });
  }

  guardar() {

  }

  comparePasswords(fb: FormGroup) {
    let confirmPwdCtl = fb.get('passwordConfirm');
    if (confirmPwdCtl.errors == null || 'passwordMismatch' in confirmPwdCtl.errors) {
      if (fb.get('newPassword').value != confirmPwdCtl.value) {
        confirmPwdCtl.setErrors({ passwordMismatch: true });
      } else {
        confirmPwdCtl.setErrors(null);
      }
    }
  }

  validatePassword(control: AbstractControl): { [key: string]: any } | null {
    if (control.value) {
      let expresion = ".*[0-9].*";
      let result = (control.value as string).match(expresion);
      if (result && result.length > 0) {
        return null; // return null if validation is passed.
      }
      return { 'passwordInvalid': true }; // return object if the validation is not passed.
    }
  }

  updateForm(value: any, property: string) {
    this.user[property] = value;
    //console.log(this.user);
  }

  updatePasswordForm(value: any, property: string) {
    this.passwordRequest[property] = value;
  }
}
