import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {inject} from '@angular/core';
import {TokenService} from "../shared/service/token.service";

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot,
                                         state: RouterStateSnapshot) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  const expectedRoles = route.data as Array<string>;
  if (tokenService.isTokenNotValid()) {
    router.navigate(['login']);
    return false;
  }
 /* if (this.authService.isLoggedIn() && expectedRoles.includes(this.authService.getUserRole())) {
    return true;
  }*/
  return true;
}
/*
constructor(private authService: AuthService, private router: Router) {}

const expectedRoles = route.data.roles as Array<string>; // Récupère les rôles autorisés depuis les données de la route

    if (this.authService.isLoggedIn() && expectedRoles.includes(this.authService.getUserRole())) {
      return true;
    } else {
      this.router.navigate(['/login']); // Redirige vers la page de connexion si l'utilisateur n'est pas connecté ou n'a pas le bon rôle
      return false;
    }
 */
