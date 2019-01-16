import { Component } from '@angular/core';
import {Location} from '@angular/common';
import { SnackBarService } from './services/snackBarService/snack-bar.service';
import * as jwt_decode from 'jwt-decode';
import { UsersService } from './services/usersService/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  localStorage;

  constructor(public location: Location, public snackBarService: SnackBarService, public userService: UsersService) {
    // has to be assigned this way, app.component.html cannot access it otherwise...
    this.localStorage = localStorage;
   }

  getUserRole(): number {
    return jwt_decode(localStorage.getItem('accessToken')).userRole;
  }

  logout(): void {
    this.snackBarService.openSnackBar('Logout successful');
  }
}
