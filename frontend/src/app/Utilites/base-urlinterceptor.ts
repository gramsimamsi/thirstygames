import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiReq = request.clone({ url: `https://${window.location.hostname}:3000/${request.url}` });
    return next.handle(apiReq);
  }
}

