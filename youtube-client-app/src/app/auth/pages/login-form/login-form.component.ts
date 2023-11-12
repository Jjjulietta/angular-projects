import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Auth } from '../../models/auth.model';
import { forbiddenValidator } from '../../directives/forbidden-login.directive';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  /* authForm = this.fb.group({
      login: ['', Validators.required],
      password: [''],
    }); */
  // public authForm: FormGroup | undefined;
  /*authForm = new FormGroup({
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    }); */
  authForm: FormGroup = new FormGroup({
    login: new FormControl('', { nonNullable: true }),
    password: new FormControl('', { nonNullable: true }),
  });
  private visibility: boolean = false;
  type: string = 'password';
  icon = '../../../../assets/visibility_off_FILL0_wght200_GRAD0_opsz20.svg';
  user: Auth | undefined;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.authService.user.subscribe((val: Auth) => {
      this.user = val;
    });
  }

  ngOnInit() {
    this.authForm = new FormGroup({
      login: new FormControl('', [Validators.required, Validators.email]),
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

  get login() {
    return this.authForm.get('login');
  }

  get password() {
    return this.authForm.get('password');
  }

  onSubmit() {
    if (this.authForm.value.login && this.authForm.value.password) {
      console.log(this.authForm.value.login);
      this.authService.auth(
        this.authForm?.value.login,
        this.authForm?.value.password
      );
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
