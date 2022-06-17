import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {

  private readonly CONFIG: MatSnackBarConfig = { duration: 5000, panelClass: ['snackbar-error'], horizontalPosition: 'right' };
  private readonly ACTION = 'OK';

  constructor(
    private readonly snackbar: MatSnackBar,
    private readonly router: Router
  ) { }

  show(error: any) {
    if (typeof error === 'string') {
      this.snackbar.open(error, this.ACTION, this.CONFIG);
      return;
    }
    if (error.status === 403) {
      this.snackbar.open(error.error.ValuesNotFound[0], this.ACTION, this.CONFIG);
      return;
    }
    if (error.status === 404) {
      this.snackbar.open(error.error.InvalidData[0], this.ACTION, this.CONFIG);
      return;
    }
    if (error.error.CustomServerError != null) {
      this.snackbar.open(error.error.CustomServerError, this.ACTION, this.CONFIG);
      return;
    }
    if (error.error.InvalidData != null) {
      this.snackbar.open(error.error.InvalidData[0], this.ACTION, this.CONFIG);
      return;
    }
    if (error.error.InternalServerError != null) {
      this.snackbar.open(error.error.InternalServerError[0], this.ACTION, this.CONFIG);
      return;
    }

    this.snackbar.open('Server Error', this.ACTION, this.CONFIG);
  }
}
