import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  if (localStorage.getItem('authUser')) {
    return true;
  }
  inject(Router).navigate(['signin']);
  return false;
};
