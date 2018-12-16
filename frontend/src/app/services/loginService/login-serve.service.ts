import { Injectable } from '@angular/core';
import  {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json'
    }
  )
};

@Injectable({
  providedIn: 'root'
})
export class LoginServeService {

  constructor(
    private http: HttpClient
  ) { }

  private loginURL  = 'http://127.0.0.1:3000/login';

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.log(`${operation} failed: ${error.message}`); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  submitLogin(username, password): Observable<any>
  {
    console.log("hello");
    return this.http.post(this.loginURL, {'user_name' : username, 'user_password': password}, httpOptions)
      .pipe(catchError(this.handleError('LOGIN_ERROR')));
  }
}
