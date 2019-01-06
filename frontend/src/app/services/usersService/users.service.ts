import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {HttpClientHelper} from '../../Utilites/HttpClientHelper';
import {User} from '../../models/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient,
  ) {}

  private apiURL = 'user';

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiURL, HttpClientHelper.httpOptionsApplicationJSON)
      .pipe(catchError(HttpClientHelper.handleError('GET_ALL_USERS_ERROR', [])));
  }

  deleteSingleUser(userID): Observable<any> {
    return this.http.delete(this.apiURL + '/' + userID, HttpClientHelper.httpOptionsApplicationJSON)
      .pipe(catchError(HttpClientHelper.handleError('DELETE_SINGLE_USER_ERROR ->' + userID)));
  }

  /* Todo putApi expexts user_id, but this is not provided anymore
  putSingleUser(user): Observable<any> {
    return this.http.put(this.apiURL + '/' + user.user_)
  }
  */
}

