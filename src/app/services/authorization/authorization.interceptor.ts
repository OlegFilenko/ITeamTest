import {
    HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, EMPTY, Observable, throwError } from 'rxjs';
import { AuthorizationService } from './authorization.service';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

  constructor(
    private readonly authorizationService: AuthorizationService,
    private readonly router: Router)
  { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<any> {
    const request = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authorizationService.token}`,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE'
      }
    });
    return next.handle(request).pipe(
      catchError(err => {
        if (err.status == 401) {
          this.authorizationService.tokenClear();
          this.router.navigate(["/login"]);
          return EMPTY;
        } else {
          return throwError(err);
        }
      })
    );
  }
}
