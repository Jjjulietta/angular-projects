import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  if (inject(AuthService).checkAuth()) {
    return true;
  } else {
    inject(Router).navigate(['signin']);
    return false;
  }
};
