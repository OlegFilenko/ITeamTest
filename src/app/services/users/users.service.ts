import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserModel } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private readonly http: HttpClient) { }

  getUsers(): Observable<UserModel[]> {
    return of(<UserModel[]>[
      { id: 1, first_name: 'Tommie', last_name: 'Roebottom', role: 'User', age: 27, city: 'Mariara'},
      { id: 2, first_name: 'Randall', last_name: 'Owbrick', role: 'User', age: 25, city: 'Coaldale' },
      { id: 3, first_name: 'Admin', last_name: 'Deepersignals', role: 'Admin', age: 37, city: 'Piedra del Águila' },
      { id: 4, first_name: 'Bridie', last_name: 'Zannotti', role: 'User', age: 23, city: 'Nanjie' },
      { id: 5, first_name: 'Kristel', last_name: 'Warrior', role: 'User', age: 30, city: 'Viljoenskroon' },
      { id: 6, first_name: 'Conrade', last_name: 'Linzey', role: 'User', age: 40, city: 'Orodara' },
      { id: 7, first_name: 'Jacinthe', last_name: 'Bruin', role: 'User', age: 27, city: 'Qinxi' },
      { id: 8, first_name: 'Evey', last_name: 'Flucker', role: 'User', age: 42, city: 'Xinshiba' },
      { id: 9, first_name: 'Phaidra', last_name: 'Kretchmer', role: 'Admin', age: 36, city: 'Lyon' },
      { id: 10, first_name: 'Anna-diana', last_name: 'Tysack', role: 'User', age: 29, city: 'Mariara' },
      { id: 11, first_name: 'Gerty', last_name: 'Troillet', role: 'User', age: 28, city: 'Gualaceo' },
      { id: 12, first_name: 'Pierette', last_name: 'Fillery', role: 'User', age: 44, city: 'Dashtobod' },
      { id: 13, first_name: 'Ali', last_name: 'Blaza', role: 'User', age: 20, city: 'Skerries' },
      { id: 14, first_name: 'Lind', last_name: 'Tissell', role: 'Admin', age: 41, city: 'Grębów' },
      { id: 15, first_name: 'Shannon', last_name: 'Sarfati', role: 'User', age: 22, city: 'Brades' },
      { id: 16, first_name: 'Boris', last_name: 'Bagott', role: 'User', age: 35, city: 'Palguyod' },
      { id: 17, first_name: 'Marnia', last_name: 'Jeannon', role: 'User', age: 31, city: 'Marseille' },
      { id: 18, first_name: 'Reese', last_name: 'Everiss', role: 'User', age: 25, city: 'Laslovo' },
      { id: 19, first_name: 'Sterling', last_name: 'Eleshenar', role: 'User', age: 28, city: 'Tibro' },
      { id: 20, first_name: 'Bernardine', last_name: 'Ivanova', role: 'User', age: 22, city: 'Strängnäs' },
      { id: 21, first_name: 'Mikel', last_name: 'Doy', role: 'User', age: 27, city: 'Pittsburgh' },
      { id: 22, first_name: 'Addie', last_name: 'Thrush', role: 'User', age: 32, city: 'Redon' }
    ]);
  }
}
