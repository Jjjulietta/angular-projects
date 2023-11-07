import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Auth } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //isAuth: boolean | undefined;
  isAuth = new Subject<boolean>();
  name = new Subject<string>();
  user = new Subject<Auth>();
  logged = new Subject<string>();

  constructor() {}

  auth(password: string, login: string, token: string) {
    let user: Auth = {
      login,
      password,
      token,
    };
    localStorage.setItem('user', JSON.stringify(user));
    //this.isAuth = true;
    console.log(this.isAuth);
    this.isAuth.next(true);
    this.user.next(user);
    this.name.next('User');
    this.logged.next('Logout');
  }

  loggout() {
    localStorage.clear();
    //this.isAuth = false;
    this.isAuth.next(false);
    this.name.next('Your Name');
    this.logged.next('Login');
  }

  checkAuth(): boolean {
    if (localStorage.getItem('user')) {
      this.isAuth.next(true);
      this.name.next('User');
      this.logged.next('Logout');
      return true;
    }
    this.isAuth.next(false);
    this.name.next('Your Name');
    this.logged.next('Login');
    return false;
  }
}
