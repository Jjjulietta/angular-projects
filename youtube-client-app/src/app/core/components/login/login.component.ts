import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  name: string = 'User name';
  logged: string = 'LOGIN';
  isAuth: boolean = false;
  constructor(private router: Router, private AuthService: AuthService) {}

  ngOnInit() {
    this.AuthService.name.subscribe((val) => {
      this.name = val;
      console.log(this.name);
    });
    console.log(this.name);
    this.AuthService.isAuth.subscribe((val) => (this.isAuth = val));
    this.AuthService.logged.subscribe((val) => (this.logged = val));
    if (!this.AuthService.checkAuth()) {
      this.router.navigate(['login']);
    } else {
      this.router.navigate(['main']);
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
    console.log(this.isAuth);
    if (this.isAuth) {
      this.AuthService.loggout();
      this.router.navigate(['login']);
    }
    /*if (this.AuthService.checkAuth()) this.AuthService.loggout();
    this.router.navigate(['login']); */
  }

  openAdminPage() {
    if (this.isAuth) {
      this.router.navigate(['admin']);
    }
  }
}
