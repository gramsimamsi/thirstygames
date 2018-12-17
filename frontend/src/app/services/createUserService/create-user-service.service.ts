import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HttpClientHelper} from "../../Utilites/HttpClientHelper";
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class CreateUserServiceService {

  private createURL = 'users';

  constructor(private http: HttpClient) { }

  createUser(username, password): Observable<any>
  {
    return this.http.post(this.createURL, {'user_name': username, 'user_password': password, 'user_role': 1, 'user_id': 100}, HttpClientHelper.httpOptionsApplicationJSON)
      .pipe(catchError(HttpClientHelper.handleError('CREATE_USER_ERROR')));
  }
}
