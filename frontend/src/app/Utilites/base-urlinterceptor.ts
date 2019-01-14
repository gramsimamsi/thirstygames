import {Inject, Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {

  constructor(public router: ActivatedRoute,
    @Inject('BASE_API_URL') private baseUrl: string) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiReq = request.clone({ url: `http://${window.location.hostname}:3000/${request.url}` });
    return next.handle(apiReq);
  }
}

