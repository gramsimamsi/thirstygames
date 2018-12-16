import { Injectable } from '@angular/core';
import  {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {HttpClientHelper} from "../../Utilites/HttpClientHelper";

@Injectable({
  providedIn: 'root'
})
export class LoginServeService {

  constructor(
    private http: HttpClient,
  ) { }

  private loginURL  = 'http://127.0.0.1:3000/login';

  submitLogin(username, password): Observable<any>
  {
    return this.http.post(this.loginURL, {'user_name' : username, 'user_password': password}, HttpClientHelper.httpOptionsApplicationJSON)
      .pipe(catchError(HttpClientHelper.handleError('LOGIN_ERROR')));
  }
}
