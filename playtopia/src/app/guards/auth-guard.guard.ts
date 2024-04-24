import { CanActivateFn,Router,ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';

export const authGuardGuard: CanActivateFn = (route, state) => {
  return true;
};
