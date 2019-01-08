import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { AuthService } from '../services/authService/auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs-compat/add/operator/do';
import 'rxjs/add/operator/catch';

import {Router} from '@angular/router';
import {throwError} from 'rxjs';

@Injectable()
export class AccessTokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService,
              private router: Router
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      setHeaders: {
        'x-access-token': `${this.auth.getToken()}`
      }
    });

    return next.handle(request)
      .catch(error => {
        console.log('Auth-Token is expired');
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            this.router.navigateByUrl('/');
          }
        } return throwError(error);
      }) as any;
  }
}

