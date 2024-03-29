import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  private URL = 'https://www.googleapis.com/youtube/v3';
  private API_KEY = 'AIzaSyBPJb1EGYR949ZdWnL_SCBqXP0CUtZgQ2Y'; //'AIzaSyD7fJvlZR3KM_3rzX4n00zQazTk3RXUzBA'; //'AIzaSyC1F20A2M2pKe6HMjqS7TYMF9UqdGMMzGg'; //'AIzaSyB8zQEc9EzWukDP-CpmnKs6y93sA84B90Y';
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(
      request.clone({
        url: `${this.URL}/${request.url}`,
        setParams: { key: this.API_KEY },
      })
    );
  }
}
