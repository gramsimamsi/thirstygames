import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {AuthService} from '../authService/auth.service';
import 'rxjs-compat/add/operator/filter';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(routeSnapShot: ActivatedRouteSnapshot): boolean {
    const redirect = routeSnapShot.data.authGuardRedirect;
    const isUserLoggedIn$ = this.authService.isLoggedIn();

    isUserLoggedIn$
      .filter(isLoggedIn => !isLoggedIn && !!redirect)
      .subscribe(() => this.router.navigate([redirect]));

    // check role of user, too
    const token = localStorage.getItem('accessToken');
    const tokenUserRole = jwt_decode(token).userRole;
    const userRole = routeSnapShot.data.role;
    // console.log("token -> " + token + " userRole -> " + userRole);
    return isUserLoggedIn$ && (tokenUserRole <= userRole);
  }
}
