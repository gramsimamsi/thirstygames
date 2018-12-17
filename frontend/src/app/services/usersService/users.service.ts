import { Injectable } from '@angular/core';
import  {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";
import {HttpClientHelper} from "../../Utilites/HttpClientHelper";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient,
  ) { }

  private usersGet  =  'users'; /*'http://127.0.0.1:3000/login';*/

  getAllUsers(): Observable<any>
  {
    return this.http.get(this.usersGet, HttpClientHelper.httpOptionsApplicationJSON)
      .pipe(catchError(HttpClientHelper.handleError('GET_ALL_USERS_ERROR')));
  }
}
