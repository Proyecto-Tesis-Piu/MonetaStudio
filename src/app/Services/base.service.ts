import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs'; 
import { catchError, map } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService {
  //baseUrl:string = "http://localhost:49755/api/"; //local (add to proxyconfig.json)
  baseUrl:string = "https://monetaapi.azurewebsites.net/api/"; //production

  constructor(protected http: HttpClient) { }

  protected handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

  protected extractData(res: Response) {
    let body = res.json();
    return body;
  }

  public wakeUp(){
    return this.http.get(this.baseUrl + 'external');
  }
}
