import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {inject} from '@angular/core';
import {TokenService} from "../shared/service/token.service";
import {AuthenticationService} from "../shared/service/authentication.service";

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot,
                                         state: RouterStateSnapshot) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  const authenticationService = inject(AuthenticationService);
  const expectedRoles = route.data['roles'] as string;
  if (tokenService.isTokenNotValid()) {
    router.navigate(['login']);
    return false;
  }
 else if (authenticationService.isLoggedIn() && tokenService.userRoles.includes(expectedRoles)) {
    return true;
  }else {
    router.navigate(['login']);
    return false;
  }
}
