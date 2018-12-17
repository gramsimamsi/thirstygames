import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public getToken(): string {
    console.log("AccessToken from localStorage -> " + localStorage.getItem("accessToken"));
    return localStorage.getItem('accessToken');
  }
}
