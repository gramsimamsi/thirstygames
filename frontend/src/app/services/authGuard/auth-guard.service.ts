import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from "@angular/router";
import {AuthService} from "../authService/auth.service";
import {Observable} from "rxjs";
import "rxjs-compat/add/operator/filter";
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(routeSnapShot: ActivatedRouteSnapshot): Observable<boolean>
  {
    let redirect = routeSnapShot.data.authGuardRedirect;
    let isUserLoggedIn$ = this.authService.isLoggedIn();

    isUserLoggedIn$
      .filter(isLoggedIn => !isLoggedIn && !!redirect)
      .subscribe(() => this.router.navigate([redirect]));



    //check also role of user
    const token = localStorage.getItem('accessToken');
    const tokenUserRole = jwt_decode(token).userRole;
    let userRole = routeSnapShot.data.role;
    //console.log("token -> " + token + " userRole -> " + userRole);
    if(isUserLoggedIn$ && (tokenUserRole === userRole))
    {
      return isUserLoggedIn$;
    }
    else
    {
      return new Observable<false>();
    }
  }
}
