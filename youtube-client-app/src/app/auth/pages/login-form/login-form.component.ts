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
  private authToken: string = '';
  private visibility: boolean = false;
  type: string = 'password';
  icon = '../../../../assets/visibility_off_FILL0_wght200_GRAD0_opsz20.svg';
  user: Auth | undefined;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private AuthService: AuthService
  ) {
    this.AuthService.user.subscribe((val: Auth) => {
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
    //this.login = inputLogin;
    //this.password = inputPassword;
    //console.log(this.login);

    let arr = [];
    let n: number = 0;
    while (n <= 7) {
      arr.push(Math.floor(Math.random() * 10));
      n += 1;
    }
    this.authToken = arr.join('');
    console.log(this.authToken);
    // console.log(this.login);
    if (this.authForm.value.login && this.authForm.value.password) {
      console.log(this.authForm.value.login);
      this.AuthService.auth(
        this.authForm?.value.login,
        this.authForm?.value.password,
        this.authToken
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
