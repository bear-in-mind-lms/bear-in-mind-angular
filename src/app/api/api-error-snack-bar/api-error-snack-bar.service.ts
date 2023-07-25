import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiError, getApiErrorMessage } from '../api-error';
import { ApiResponse } from '../api-response';

const ERROR_SNACKBAR_DURATION = 3000;

@Injectable({
  providedIn: 'root',
})
export class ApiErrorSnackBar {
  constructor(private readonly snackBar: MatSnackBar) {}

  open(error: ApiError) {
    return this.snackBar.open(getApiErrorMessage(error), undefined, {
      duration: ERROR_SNACKBAR_DURATION,
      panelClass: 'snackbar-error',
    });
  }

  openOnFailure(response: ApiResponse<any>) {
    if (response.isFailure()) {
      this.open(response.error!);
    }
  }
}
