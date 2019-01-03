import { Component } from '@angular/core';
import {Location} from '@angular/common';
import { SnackBarService } from './services/snackBarService/snack-bar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  location;
  snackBarService;

  constructor(location: Location, snackBarService: SnackBarService) {
    this.location = location;
    this.snackBarService = snackBarService;
   }

  logout(): void {
    this.snackBarService.openSnackBar('Logout successful');
  }
}
