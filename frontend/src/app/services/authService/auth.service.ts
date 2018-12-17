import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public getToken(): string {
    return localStorage.getItem('accessToken');
  }
}
