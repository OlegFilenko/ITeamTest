import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../services/authorization/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class AdminRouteGuard implements CanActivate {
  constructor(
    private readonly authorizationService: AuthorizationService,
    private readonly router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {
    if (this.authorizationService.userObject.role != 'Admin') {
      this.router.navigate(["/access-denied"]);
      return false
    }
    return true;
  }
  
}
