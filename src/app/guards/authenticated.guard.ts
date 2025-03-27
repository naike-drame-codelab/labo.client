import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from '../services/session.service';

export const authenticatedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (inject(SessionService).session().isAuthenticated) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};