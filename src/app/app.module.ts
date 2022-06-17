import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutModule } from './main-layout/main-layout.module';
import { AuthorizationInterceptor } from './services/authorization/authorization.interceptor';

import { AuthorizationService } from './services/authorization/authorization.service';
import { ErrorMessageService } from './services/error-message/error-message.service';
import { UserassessmentsService } from './services/userassessments/userassessments.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AuthRouteGuard } from './guards/auth-route.guard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainLayoutModule,
    HttpClientModule,
    MatSnackBarModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationInterceptor,
      multi: true
    },
    AuthorizationService,
    UserassessmentsService,
    ErrorMessageService,
    AuthRouteGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
