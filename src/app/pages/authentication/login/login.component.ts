import { ChangeDetectorRef } from '@angular/core';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../../services/authorization/authorization.service';
import { AuthorizationRequestModel } from '../../../services/authorization/models/authorization-request.model';
import { ErrorMessageService } from '../../../services/error-message/error-message.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  hide: boolean = true;

  authData: AuthorizationRequestModel = { email: '', password: '' };

  constructor(
    private readonly changeDetector: ChangeDetectorRef,
    private readonly authorizationService: AuthorizationService,
    private readonly router: Router,
    private readonly errorMessage: ErrorMessageService
  ) { }

  ngOnInit(): void {
    
  }

  onSubmit(): void {
    this.authorizationService.login(this.authData).subscribe(
      ok => {
        this.router.navigate(['']);
      },
      error => {
        this.errorMessage.show('Wrong authorization data')
        this.authData.email = '';
        this.authData.password = '';
        this.changeDetector.detectChanges();
      }
    )
  }

}
