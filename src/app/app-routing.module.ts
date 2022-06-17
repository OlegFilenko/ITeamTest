import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminRouteGuard } from './guards/admin-route.guard';
import { AuthRouteGuard } from './guards/auth-route.guard';
import { MainLayoutComponent } from './main-layout/main-layout.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/authentication/login/login.module').then(m => m.LoginModule),
    pathMatch: 'full'
  },
  {
    path: '',
    canActivateChild: [AuthRouteGuard],
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'userassessments',
        pathMatch: 'full'
      },
      {
        path: 'access-denied',
        loadChildren: () => import('./pages/authentication/access-denied/access-denied.module').then(m => m.AccessDeniedModule),
        pathMatch: 'full'
      },
      {
        path: 'userassessments',
        loadChildren: () => import('./pages/userassessments/userassessments.module').then(m => m.UserassessmentsModule),
        pathMatch: 'full'
      },
      {
        path: 'userassessments/graph/:id',
        loadChildren: () => import('./pages/userassessments/graph/graph.module').then(m => m.GraphModule),
        pathMatch: 'full'
      },
      {
        path: 'users',
        canActivate: [AdminRouteGuard],
        loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule),
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    relativeLinkResolution: 'legacy'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
