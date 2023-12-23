import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { forbiddenValidator } from '../directive/forbidden-password.directive';
import { Registration } from '../models/login.model.ts';
import { HttpService } from '../services/http.service';
import { ToastService } from '../services/toast.service';
import { takeUntil } from 'rxjs';
import { UnsubscribeService } from '../services/unsubscribe.service';
import { ErrorMessages, ToastMessage, ToastState } from '../models/toast.model';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  regForm: FormGroup = new FormGroup({
    name: new FormControl('', { nonNullable: true }),
    email: new FormControl('', { nonNullable: true }),
    password: new FormControl('', { nonNullable: true }),
  });
  private visibility: boolean = false;
  disabled: boolean = false;
  errorType: string | undefined;
  type: string = 'password';
  icon = '../../../../assets/visibility_off_FILL0_wght200_GRAD0_opsz20.svg';
  user: Registration | undefined;
  emailsDuplicate: string[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private httpService: HttpService,
    private unsubscribe$: UnsubscribeService,
    private toastService: ToastService,
    private authService: AuthService
  ) {
    //let emailsDuplikate: string[] | [] = [];
    /*this.authService.user.subscribe((val: Auth) => {
      this.user = val;
    });*/
  }

  ngOnInit() {
    if (localStorage.getItem('emails')) {
      localStorage.removeItem('emails');
    }
    this.regForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[\p{L}\s]*$/u),
        Validators.maxLength(40),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        this.emailValidator(),
      ]),
      password: new FormControl('', [
        Validators.required,
        forbiddenValidator(),
      ]),
    });
    this.regForm.controls;
  }

  get name() {
    return this.regForm.get('name');
  }

  get email() {
    return this.regForm.get('email');
  }

  get password() {
    return this.regForm.get('password');
  }

  onSubmit() {
    this.disabled = true;
    if (this.regForm.value.email && this.regForm.value.password) {
      console.log(this.regForm.value.email);
      const bodyLogin = this.regForm.getRawValue();
      console.log(bodyLogin);

      this.httpService
        .signup(bodyLogin)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: (val) => {
            console.log(val);
            this.toastService.showToast(
              ToastMessage.SucsessSignin,
              ToastState.Sucsess
            );
            //this.router.navigate(['']);
          },
          complete: () => {
            setTimeout(() => {
              this.router.navigate(['signin']);
            }, 6000);
          },
          error: (error: ErrorMessages) => {
            this.toastService.showToast(error.message, ToastState.Error);
            if (error.type === ToastMessage.ErrorType) {
              if (this.regForm.value.email) {
                let email: string = this.regForm.value.email;
                //let emailsDuplikate = []
                this.emailsDuplicate.push(email);
                //this.authService.emails$ = this.emailsDuplicate;
                localStorage.setItem(
                  'emails',
                  JSON.stringify(this.emailsDuplicate)
                );
              }
              console.log(error.type);
              this.errorType = error.message;
            }
            //this.regForm.invalid;
          },
        });
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

  emailValidator(): ValidatorFn {
    return (control: AbstractControl<string>): ValidationErrors | null => {
      this.errorType = undefined;
      console.log(control.value);
      console.log(this.regForm.valid);
      /*this.authService
        .getEmailsDuplicate$()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((val) => {
          console.log(val);
          this.emailsDuplicate = val;
          const emailValid = control.value
            ? !this.emailsDuplicate.includes(control.value)
            : false;
          if (!emailValid) {
            return { forbiddenEmail: 'User {email} already exists' };
          }
          return null;
        });
      return null;*/

      if (localStorage.getItem('emails')) {
        const emailsStr = localStorage.getItem('emails');
        if (emailsStr) {
          const emails: string[] = JSON.parse(emailsStr);
          const emailValid = control.value
            ? !emails.includes(control.value)
            : false;
          console.log(this.regForm.valid);
          console.log(emailValid);
          if (!emailValid) {
            return { forbiddenEmail: 'User {email} already exists' };
          }
        }
      }
      console.log(this.regForm.valid);
      this.disabled = false;
      return null;
    };
  }
}
