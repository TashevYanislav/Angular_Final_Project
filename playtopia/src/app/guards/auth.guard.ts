import {
  CanActivateFn,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router: Router = inject(Router);
  const protectedRoutes: string[] = ['/login', '/register'];
  return protectedRoutes.includes(state.url) && localStorage.getItem('token')
    ? router.navigate(['/'])
    : true;
};

export const authGuardNotLogged: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router: Router = inject(Router);
  const protectedRoutes: string[] = ['/add_game', '/cart'];
  return protectedRoutes.includes(state.url) && !localStorage.getItem('token')
    ? router.navigate(['/register'])
    : true;
};
