import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../Components/Usuarios/usuario.model';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseService } from './base.service'

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  };

  @Injectable({
    providedIn: 'root'
  })

  export class UserService extends BaseService {

    serviceUrl: string = this.baseUrl + "User";
  
    constructor(private http: HttpClient) { super() }
  
    // public user (firstName: string, lastName:string, age: number,
    //             sex: boolean, job: string, civilStateString: string,
    //             email: string, password: string, countryCode: string,
    //             stateCode: string 
    public user (user: User): Observable<User> {
      /* var temp: User = new User();
      
      temp.firstName = firstName;
      temp.lastName = lastName;
      temp.age = age;
      temp.sex = sex;
      temp.job = job;
      temp.civilStateString = civilStateString;
      temp.email = email;
      temp.password = password;
      temp.countryCode = countryCode;
      temp.stateCode = stateCode; */

      return this.http.post<User>(this.serviceUrl, user, httpOptions)
      .pipe(
            catchError(this.handleError)
      );
    }
  
    
  }