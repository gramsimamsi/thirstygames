import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HttpClientHelper} from "../../Utilites/HttpClientHelper";
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class CreateUserServiceService {

  private createURL = 'user';

  constructor(private http: HttpClient) { }

  createUser(username, password): Observable<any>
  {
    return this.http.post(this.createURL, {'user_name': username, 'user_password': password}, HttpClientHelper.httpOptionsApplicationJSON)
      .pipe(catchError(HttpClientHelper.handleError('CREATE_USER_ERROR')));
  }
}
