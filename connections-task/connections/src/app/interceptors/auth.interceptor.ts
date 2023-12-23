import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthUser } from '../models/login.model.ts';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const str = localStorage.getItem('authUser');
    if (str !== null) {
      const user: AuthUser = JSON.parse(str);
      const authReq = request.clone({
        setHeaders: {
          'rs-uid': `${user.uid}`,
          'rs-email': `${user.email}`,
          Authorization: `Bearer ${user.token}`,
        },
      });
      return next.handle(authReq);
    }
    return next.handle(request);
  }
}
