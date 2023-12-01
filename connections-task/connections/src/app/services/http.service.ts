import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap, throwError } from 'rxjs';
import {
  AuthUser,
  Login,
  Registration,
  User,
  UserProfile,
} from '../models/login.model.ts';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private REGISTRATION = 'registration';
  private LOGIN = 'login';
  private PROFILE = 'profile';
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
      }),
      catchError(this.handleError)
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
        }),
        catchError(this.handleError)
      );
  }

  getUser(user: AuthUser) {
    /*const httpOptions = {
      headers: new HttpHeaders({
        'rs-uid': `${user.uid}`,
        'rs-email': `${user.email}`,
        Authorization: `Bearer ${user.token}`,
      }),
    };*/
    return this.httpClient.get<UserProfile>(this.PROFILE).pipe(
      map((r) => {
        const obj: User = {
          id: r.uid.S,
          email: r.email.S,
          name: r.name.S,
          date: new Date(+r.createdAt.S),
        };
        return obj;
      }),
      catchError(this.handleError)
    );
  }

  updateUser(name: string) {
    return this.httpClient.put<UserProfile>(this.PROFILE, { name }).pipe(
      map((r) => {
        const obj: User = {
          id: r.uid.S,
          email: r.email.S,
          name: r.name.S,
          date: new Date(+r.createdAt.S),
        };
        return obj;
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.log('An error occurred:', error.error);
    } else {
      console.error(
        // error.error.error.message
        `Backend returned code ${error.status}, body was: `,
        error.error.error.message
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
