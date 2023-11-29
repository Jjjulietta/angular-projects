import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { AuthUser, Login, Registration } from '../models/login.model.ts';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private REGISTRATION = 'registration';
  private LOGIN = 'login';
  //private URL = 'https://tasks.app.rs.school/angular/registration';
  constructor(private httpClient: HttpClient) {}

  signup(body: Registration) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    console.log(body);
    return this.httpClient.post(`${this.REGISTRATION}`, body, httpOptions).pipe(
      tap((r) => {
        console.log(r);
      })
    );
  }

  login(body: Login) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.httpClient
      .post<AuthUser>(`${this.LOGIN}`, body, httpOptions)
      .pipe(
        tap((r) => {
          console.log(r);
          const obj = Object.assign(r);
          obj.email = body.email;
          localStorage.setItem('authUser', JSON.stringify(obj));
        })
      );
  }
}
