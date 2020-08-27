import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user.model';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseService } from '../../../Services/base.service'
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json',
    'observe':'response'
  })
};

@Injectable({
  providedIn: 'root'
})

export class UserService extends BaseService {

  serviceUrl: string = this.baseUrl + "User";
  
  constructor(private http: HttpClient, private fb: FormBuilder) { super() }
  
  formModel = this.fb.group({
    //validators van aqui
    firstName: ['', Validators.required],
    lastName: [''],
    birthDate: [''],
    sex: ['Male'],
    job: [''],
    civilStateString: [''],
    email: ['', [Validators.required, Validators.email] ],
    passwords: this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirm: ['', Validators.required],
    }, {validator : this.comparePasswords }),
    countryCode: [''],
    stateCode: ['']
  });

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

  public register (): Observable<User> {
    var user: User = new User();
    user.firstName = this.formModel.value.firstName;
    user.lastName = this.formModel.value.lastName;
    user.birthDate = this.formModel.value.birthDate;
    user.sex = this.formModel.value.sex;
    user.job = this.formModel.value.job;
    user.civilStateString = this.formModel.value.civilStateString;
    user.email = this.formModel.value.email;
    user.password = this.formModel.get('passwords.password').value;
    user.countryCode = this.formModel.value.countryCode;
    user.stateCode = this.formModel.value.stateCode;
    return this.http.post<User>(this.serviceUrl + '/Register', user, httpOptions)
      .pipe(
            catchError(this.handleError)
      );
  }

  public login (email: string, password: string) {
    var temp: User = new User();
    temp.email = email;
    temp.password = password;
    return this.http.post(this.serviceUrl + '/Login', temp);
  }

  public getUserProfile(){
    var tokenHeader = new HttpHeaders({'Authorization':'Bearer ' + localStorage.getItem('token')});
    return this.http.get(this.serviceUrl + 'Profile', {headers : tokenHeader});
  }
}