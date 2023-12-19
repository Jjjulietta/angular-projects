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
  private authToken: string = '';

  constructor() {}

  auth(password: string, login: string) {
    this.generateToken();
    console.log(this.authToken);
    let user: Auth = {
      login,
      password,
      token: this.authToken,
    };
    localStorage.setItem('user', JSON.stringify(user));
    //this.isAuth = true;
    console.log(this.isAuth);
    this.isAuth.next(true);
    this.user.next(user);
    this.name.next('User');
    this.logged.next('Logout');
  }

  private generateToken() {
    let arr = [];
    let tokenLength: number = 0;
    while (tokenLength <= 7) {
      arr.push(Math.floor(Math.random() * 10));
      tokenLength += 1;
    }
    this.authToken = arr.join('');
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
