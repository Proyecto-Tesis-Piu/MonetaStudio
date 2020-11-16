import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user.model';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseService } from '../../../Services/base.service'
import { Feedback } from '../../contactus/feedback.model';

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
  
  constructor(private http: HttpClient) { super() }
  
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

  public submitFeedback(feedback: Feedback, token: string){
    var tokenHeader = new HttpHeaders({'Authorization':'Bearer ' + token});
    return this.http.post(this.serviceUrl + '/Feedback', feedback, { headers: tokenHeader });
  }
}
