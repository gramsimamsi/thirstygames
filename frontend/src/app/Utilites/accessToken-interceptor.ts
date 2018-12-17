import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { AuthService } from '../services/authService/auth.service';
import { Observable } from 'rxjs/Observable';
import "rxjs-compat/add/operator/do";
import {Router} from "@angular/router";

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

    return next.handle(request);

    /*testimplementation for token expiration check */

    /*
    return next.handle(request).do( (event: HttpEvent<any>) => {

      if(event instanceof HttpResponse)
      {
        //nothing to do everythink fine
      }
    }, (err: any) =>
      {
        if(err instanceof HttpErrorResponse)
        {
          if(err.status === 401)
          {
            //redirect to login page -> token expired -> redirect is very nice :D
            this.router.navigateByUrl('token');
          }
        }
      })
  }*/
  }
}
