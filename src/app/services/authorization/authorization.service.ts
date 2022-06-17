import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, from, map, Observable, throwError } from 'rxjs';
import { AuthorizationRequestModel } from './models/authorization-request.model';
import { AuthorizationResponseModel } from './models/authorization-response.model';
import { AuthorizedUserModel } from './models/authorized-user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private readonly TOKEN_STORAGE_KEY: string = 'ITeamTestToken';
  private readonly USER_OBJECT_STORAGE_KEY: string = 'ITeamTestUserLogin';

  private readonly SOURCE: Map<string, AuthorizedUserModel> = new Map<string, AuthorizationResponseModel>().
    set('admin@deepersignals.com*password', { first_name: 'Admin', last_name: 'Deepersignals', role: 'Admin', token: 'QWRtaW5Vc2Vy' }).
    set('user@deepersignals.com*password', { first_name: 'User', last_name: 'Deepersignals', role: 'User', token: 'H9u4asNd23ds22' });

  constructor(private readonly http: HttpClient) { }

  login(credentials: AuthorizationRequestModel): Observable<boolean | {}> {
    return this._login(credentials).pipe(
      map((data: AuthorizationResponseModel) => {
        localStorage.setItem(this.TOKEN_STORAGE_KEY, data.token);
        localStorage.setItem(this.USER_OBJECT_STORAGE_KEY, JSON.stringify(<AuthorizedUserModel>{first_name: data.first_name, last_name: data.last_name, role: data.role}));
        return true;
      }),
      catchError(error => {
        this.logout();
        return throwError(error);
      })
    )
    //return this.http.post<AuthorizationResponseModel | {}>(`${environment.api}`, credentials).pipe(
    //  map((data: AuthorizationResponseModel) => {
    //    localStorage.setItem(this.TOKEN_STORAGE_KEY, data.token);
    //    localStorage.setItem(this.USER_OBJECT_STORAGE_KEY, JSON.stringify(<AuthorizedUserModel>{first_name: data.first_name, last_name: data.last_name, role: data.role}));
    //    return true;
    //  }),
    //  catchError(error => {
    //    this.logout();
    //    return throwError(error);
    //  })
    //);
  }

  logout() {
    localStorage.removeItem(this.TOKEN_STORAGE_KEY);
    localStorage.removeItem(this.USER_OBJECT_STORAGE_KEY);
  }

  private _login(credentials: AuthorizationRequestModel): Observable<AuthorizationResponseModel | {}> {                                // <-- API controller method request imitation
    const checkCredentialsPromise = () => new Promise((resolve, reject) => {
      const userObject = this.SOURCE.get(credentials.email + '*' + credentials.password);
      if (!!userObject) {
        resolve(userObject);
      } else {
        reject({ error: 'Wrong authorisation data' })
      }
    });

    return <Observable<AuthorizationResponseModel | {}>>from(checkCredentialsPromise());
  }

  get token(): string {
    return localStorage.getItem(this.TOKEN_STORAGE_KEY);
  }

  tokenClear() {
    localStorage.setItem(this.TOKEN_STORAGE_KEY, null);
  }

  get userObject(): AuthorizedUserModel {
    return JSON.parse(localStorage.getItem(this.USER_OBJECT_STORAGE_KEY));
  }
}
