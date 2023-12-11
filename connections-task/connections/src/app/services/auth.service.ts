import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, takeUntil } from 'rxjs';
import { Login } from '../models/login.model.ts';
import { ToastMessage, ToastState } from '../models/toast.model';
import { HttpService } from './http.service';
import { ToastService } from './toast.service';
import { UnsubscribeService } from './unsubscribe.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuth: boolean = false;

  constructor(
    private httpService: HttpService,
    public toastService: ToastService,
    private unsubscribe$: UnsubscribeService,
    public router: Router
  ) {}
  auth(bodyLogin: Login) {
    this.httpService
      .login(bodyLogin)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (val) => {
          console.log(val);
          localStorage.setItem('authUser', JSON.stringify(val));
          this.isAuth = true;
          this.toastService.showToast(
            ToastMessage.SucsessLogin,
            ToastState.Sucsess
          );
          //this.router.navigate(['']);
        },
        complete: () => {
          setTimeout(() => {
            this.router.navigate(['']);
          }, 6000);
        },
        error: (error) => {
          console.log(error);
          this.toastService.showToast(error.message, ToastState.Error);
          //this.authForm.invalid;
        },
      });
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
