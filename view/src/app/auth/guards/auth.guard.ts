import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.authService.userValue;
    const checkCompare = (guardRoles: string[], userRoles: string[]) => {
      const arr = guardRoles.filter((el) => userRoles.indexOf(el) > -1);
      return arr.length > 0;
    };

    if (user) {
      if (route.data.roles && !checkCompare(route.data.roles, user.roles)) {
        return false;
      }
      return true;
    }

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
