import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from "@angular/material";

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar){}

  openSnackBar(message: string): void
  {
    const config = new MatSnackBarConfig();
    config.panelClass = ['blue-snackbar'];
    config.duration = 5000;
    this.snackBar.open(message, 'Close', config)
  }
}

