import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';


@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  config: MatSnackBarConfig<any>;

  constructor(private snackBar: MatSnackBar) {
    this.config = new MatSnackBarConfig();
  }

  openSnackBar(message: string): void {
    this.config.panelClass = ['blue-snackbar'];
    this.config.duration = 5000;
    this.snackBar.open(message, 'Close', this.config);
  }

  openSnackBarError(message: string): void {
    this.config.panelClass = ['error-snackbar'];
    this.config.duration = 10000;
    this.snackBar.open(message, 'Close', this.config);
  }
}

