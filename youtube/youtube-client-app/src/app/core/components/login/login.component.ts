import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  name: string = 'User name';
  logged: string = 'LOGIN';
  isAuth: boolean = false;
  public admin: boolean = false;
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.authService.name.subscribe((val) => {
      this.name = val;
    });
    this.authService.isAuth.subscribe((val) => (this.isAuth = val));
    this.authService.logged.subscribe((val) => (this.logged = val));
    if (!this.authService.checkAuth()) {
      this.router.navigate(['login']);
    } else {
      this.router.navigate(['main']);
    }
  }

  openLoginForm() {
    console.log(this.isAuth);
    if (this.isAuth) {
      this.authService.loggout();
      this.router.navigate(['login']);
    }
  }

  openAdminPage() {
    if (this.isAuth /*&& !sessionStorage.getItem('search')*/) {
      this.admin = true;
      this.router.navigate(['admin']);
    }
  }

  backMain() {
    this.admin = false;
    this.router.navigate(['main']);
  }
}
