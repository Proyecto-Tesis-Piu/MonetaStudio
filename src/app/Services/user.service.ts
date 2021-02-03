import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { User } from '../Models/user.model';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseService } from './base.service'
import { Feedback } from '../Models/feedback.model';

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
    
  public register (user: User): Observable<User> {
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

  public getCountries(){
    return this.http.get(this.baseUrl + 'Country');
  }

  public getStates(country: String) {
    return this.http.get(this.baseUrl + 'Country/' + country + '/States');
  }

  public getUserProfile(token: string){
    var tokenHeader = new HttpHeaders({'Authorization':'Bearer ' + token});
    return this.http.get(this.serviceUrl + 'Profile', {headers : tokenHeader});
  }

  public confirmEmail(token: String){
    var tokenHeader = new HttpHeaders({'Authorization':'Bearer ' + token});
    return this.http.get(this.serviceUrl + '/ConfirmEmail', { headers: tokenHeader });
  }

  public forgotPassword (email: string) {
    var temp: User = new User();
    temp.email = email;
    return this.http.post(this.serviceUrl + '/ForgotPassword', temp);
  }

  public resetPassword(newPassword: String, token: String) {
    var tokenHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    return this.http.post(this.serviceUrl + '/ResetPassword', newPassword, { headers: tokenHeader });
}

  public submitFeedback(feedback: Feedback, token: string){
    var tokenHeader = new HttpHeaders({'Authorization':'Bearer ' + token});
    return this.http.post(this.serviceUrl + '/Feedback', feedback, { headers: tokenHeader });
  }
}
