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

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private httpService: HttpService
  ) {
    /*this.authService.user.subscribe((val: Auth) => {
      this.user = val;
    });*/
  }

  ngOnInit() {
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
    if (this.authForm.value.email && this.authForm.value.password) {
      console.log(this.authForm.value.email);
      const bodyLogin = this.authForm.getRawValue();
      console.log(bodyLogin);
      this.httpService.login(bodyLogin).subscribe((val) => console.log(val));
      /*this.authService.auth(
        this.authForm?.value.login,
        this.authForm?.value.password
      );*/
      // console.log(this.user);
      this.router.navigate(['']);
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
}
