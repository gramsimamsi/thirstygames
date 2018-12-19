import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import "rxjs-compat/add/observable/of";
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public getToken(): string {
    return localStorage.getItem('accessToken');
  }

  public isLoggedIn(): Observable<boolean>
  {
    let token = this.getToken();
    if(token)
    {
      let tokenExpired = this.isTokenExpired(token);

      if(!tokenExpired) return Observable.of(true)
    }

    return Observable.of(false);
  }


  // toDo needs to be tested
  public getTokenExpirationDate(token: string): Date
  {
    const decodedToken = jwt_decode(token);

    if (decodedToken.exp === undefined) return null;

    const date = new Date(0);
    date.setUTCSeconds(decodedToken.exp);
    return date;
  }


  isTokenExpired(token: string): boolean
  {
    const date = this.getTokenExpirationDate(token);
    if(date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }

}


