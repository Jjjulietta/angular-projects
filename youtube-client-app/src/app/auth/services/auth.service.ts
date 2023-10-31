import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Auth } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuth: boolean | undefined;
  name = new Subject<string>();
  user = new Subject<Auth>();

  constructor() {}

  auth(password: string, login: string, token: string) {
    let user: Auth = {
      login,
      password,
      token,
    };
    localStorage.setItem('user', JSON.stringify(user));
    this.isAuth = true;
    console.log(this.isAuth);
    this.user.next(user);
    this.name.next('User');
  }

  loggout() {
    localStorage.clear();
    this.isAuth = false;
    this.name.next('Your Name');
  }

  checkAuth(): boolean {
    if (localStorage.getItem('user')) {
      this.isAuth = true;
      this.name.next('User');
      return true;
    }
    this.isAuth = false;
    this.name.next('Your Name');
    return false;
  }
}
