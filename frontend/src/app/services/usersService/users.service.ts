import { Injectable } from '@angular/core';
import  {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";
import {HttpClientHelper} from "../../Utilites/HttpClientHelper";
import {User} from "../../models/User";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient,
  ) {}

  private usersGet = 'users'; /*'http://127.0.0.1:3000/login';*/
  private singleUserDelete = 'users?user_id=';

  getAllUsers(): Observable<User[]>
  {
    return this.http.get<User[]>(this.usersGet, HttpClientHelper.httpOptionsApplicationJSON)
      .pipe(catchError(HttpClientHelper.handleError('GET_ALL_USERS_ERROR', [])));
  }

  deleteSingleUser(userID): Observable<any>
  {
    return this.http.delete(this.singleUserDelete + userID, HttpClientHelper.httpOptionsApplicationJSON)
      .pipe(catchError(HttpClientHelper.handleError('DELETE_SINGLE_USER_ERROR ->' + userID)));
  }
}

