import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Login } from '../models/login.model.ts';
import { HttpService } from './http.service';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuth: boolean = false;
  emailsDuplicate = new BehaviorSubject<string[]>([]);

  constructor(
    private httpService: HttpService,
    public toastService: ToastService,
    public router: Router
  ) {}

  set emails$(val: string[]) {
    this.emailsDuplicate.next(val);
  }

  getEmailsDuplicate$() {
    return this.emailsDuplicate.asObservable();
  }

  auth(bodyLogin: Login) {
    return this.httpService.login(bodyLogin);
  }

  checkAuth() {
    if (localStorage.getItem('authUser')) {
      console.log('true');
      this.isAuth = true;
      return true;
    } else {
      console.log('false');
      return false;
    }
  }
}
