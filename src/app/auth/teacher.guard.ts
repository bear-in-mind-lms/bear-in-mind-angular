import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoggedInUserService } from './logged-in-user.service';
import { UserRole } from './user-role';

export const teacherGuard: CanActivateFn = () => {
  if (!inject(LoggedInUserService).hasRole(UserRole.teacher)) {
    inject(Router).navigateByUrl('403');
    return false;
  }

  return true;
};
