import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Login } from '../models/login.model.ts';
import { forbiddenValidator } from '../directive/forbidden-password.directive';
import { HttpService } from '../services/http.service';
import { ToastService } from '../services/toast.service';
import { ToastComponent } from '../toast/toast.component';
import { UnsubscribeService } from '../services/unsubscribe.service';
import { takeUntil } from 'rxjs';
import { ErrorMessages, ToastMessage, ToastState } from '../models/toast.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, ToastComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  authForm: FormGroup = new FormGroup({
    email: new FormControl('', { nonNullable: true }),
    password: new FormControl('', { nonNullable: true }),
  });
  private visibility: boolean = false;
  type: string = 'password';
  icon = '../../../../assets/visibility_off_FILL0_wght200_GRAD0_opsz20.svg';
  user: Login | undefined;
  errorType: string | undefined;
  disabled: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private httpService: HttpService,
    private unsubscribe$: UnsubscribeService,
    public toastService: ToastService,
    private authService: AuthService
  ) {
    /*this.authService.user.subscribe((val: Auth) => {
      this.user = val;
    });*/
  }

  ngOnInit() {
    if (localStorage.getItem('emails')) {
      localStorage.removeItem('emails');
    }
    this.authForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        forbiddenValidator(),
      ]),
    });
    this.authForm.controls;
    /* this.authForm = new FormGroup({
        login: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
      }); */
  }

  get email() {
    return this.authForm.get('email');
  }

  get password() {
    return this.authForm.get('password');
  }

  onSubmit() {
    this.disabled = true;
    if (this.authForm.value.email && this.authForm.value.password) {
      console.log(this.authForm.value.email);
      const bodyLogin: Login = this.authForm.getRawValue();
      //this.authForm.reset();
      console.log(bodyLogin);
      this.authService
        .auth(bodyLogin)

        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: (val) => {
            console.log(val);
            this.toastService.showToast(
              ToastMessage.SucsessLogin,
              ToastState.Sucsess
            );
            //this.router.navigate(['']);
          },
          complete: () => {
            this.authForm.reset();
            this.disabled = false;
            setTimeout(() => {
              this.router.navigate(['']);
            }, 6000);
          },
          error: (error: ErrorMessages) => {
            console.log(error);
            this.toastService.showToast(error.message, ToastState.Error);
            if (error.type === ToastMessage.ErrorTypeNotFound) {
              console.log(error.type);
              this.errorType = error.message;
            }
            //this.disabled = false;
            //this.authForm.invalid;
          },
        });
      /*this.authService.auth(
        this.authForm?.value.login,
        this.authForm?.value.password
      );*/
      // console.log(this.user);
      //this.router.navigate(['']);
    }
  }

  changeVisibility() {
    if (this.visibility) {
      console.log(this.visibility);
      this.visibility = false;
      this.type = 'password';
      this.icon =
        '../../../../assets/visibility_off_FILL0_wght200_GRAD0_opsz20.svg';
    } else {
      console.log(this.visibility);
      this.visibility = true;
      this.type = 'text';
      this.icon =
        '../../../../assets/visibility_FILL0_wght200_GRAD0_opsz20.svg';
    }
  }

  onChange() {
    this.disabled = false;
  }
}
