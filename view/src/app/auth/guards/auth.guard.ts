import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('AUTH GUARD PROCESS');
    const user = this.authService.userValue;

    const checkCompare = (guardRoles: string[], userRoles: string[]) => {
      const arr = guardRoles.filter((el) => userRoles.indexOf(el) > -1);
      return arr.length > 0;
    };

    if (user) {
      console.log(
        !(route.data.roles && !checkCompare(route.data.roles, user.roles))
      );
      return !(route.data.roles && !checkCompare(route.data.roles, user.roles));
    }

    this.authService.logout({ queryParams: { returnUrl: state.url } });
    return false;
  }
}
