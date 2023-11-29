import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { forbiddenValidator } from '../directive/forbidden-password.directive';
import { Registration } from '../models/login.model.ts';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
  type: string = 'password';
  icon = '../../../../assets/visibility_off_FILL0_wght200_GRAD0_opsz20.svg';
  user: Registration | undefined;

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
    this.regForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
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
    if (this.regForm.value.email && this.regForm.value.password) {
      console.log(this.regForm.value.email);
      const bodyLogin = this.regForm.getRawValue();
      console.log(bodyLogin);
      this.httpService.signup(bodyLogin).subscribe((val) => console.log(val));
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
