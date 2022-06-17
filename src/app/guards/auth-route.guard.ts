import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { AuthorizationService } from '../services/authorization/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class AuthRouteGuard implements CanActivateChild {

  constructor(
    private readonly authorizationService: AuthorizationService,
    private readonly router: Router
  ) {}

  async canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (this.authorizationService.token == null) {
      this.router.navigate(["/login"]);
      return false;
    }
    return true;
  }
  
}
