import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AppRoute } from '../routing/app-route';
import { LoggedInUserService } from './logged-in-user.service';

export const userGuard: CanActivateFn = () => {
  if (!inject(LoggedInUserService).exists) {
    inject(Router).navigateByUrl(AppRoute.login.routerLink);
    return false;
  }

  return true;
};
