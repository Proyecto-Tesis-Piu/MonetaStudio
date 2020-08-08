import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../Components/Usuarios/usuario.model';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseService } from './base.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class LoginService extends BaseService {

  serviceUrl: string = this.baseUrl + "User/Login/";

  constructor(private http: HttpClient) { super() }  

  public login (email: string, password: string): Observable<User> {
    var temp: User = new User();
    temp.email = email;
    temp.password = password;
    return this.http.post<User>(this.serviceUrl, temp, httpOptions)
    .pipe(
          catchError(this.handleError)
    );
  }

  
}
