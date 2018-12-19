import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from "@angular/router";
import {AuthService} from "../authService/auth.service";
import {Observable} from "rxjs";
import "rxjs-compat/add/operator/filter";

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
    let redirect = routeSnapShot.data['authGuardRedirect'];
    let isUserLoggedIn$ = this.authService.isLoggedIn();

    isUserLoggedIn$
      .filter(isLoggedIn => !isLoggedIn && !!redirect)
      .subscribe(() => this.router.navigate([redirect]));

    return isUserLoggedIn$;
  }
}
