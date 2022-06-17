import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from '../services/authorization/authorization.service';
import { AuthorizedUserModel } from '../services/authorization/models/authorized-user.model';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  userName: string;
  userRole: string;

  constructor(
    private readonly authService: AuthorizationService,
    private readonly router: Router
  ) {
    const userObj: AuthorizedUserModel = authService.userObject;
    this.userName = userObj.first_name + ' ' + userObj.last_name + ' | ' + userObj.role
    this.userRole = userObj.role;
  }

  ngOnInit(): void {
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login'])
  }
}
