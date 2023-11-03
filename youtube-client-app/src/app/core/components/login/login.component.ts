import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  name: string = '';
  constructor(private router: Router, private AuthService: AuthService) {
    this.AuthService.name.subscribe((val) => (this.name = val));
  }

  ngOnInit() {
    if (!this.AuthService.checkAuth()) {
      this.router.navigate(['login']);
    }
    /*if (this.AuthService.checkAuth()) {
      this.AuthService.name.subscribe((val) => (this.name = val));
      console.log('init login');
      this.router.navigate(['']);
    } else {
      this.router.navigate(['login']);
    }*/
  }

  openLoginForm() {
    console.log(this.AuthService.checkAuth());
    if (this.AuthService.checkAuth()) this.AuthService.loggout();
    this.router.navigate(['login']);
  }
}
