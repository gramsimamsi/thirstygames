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

  constructor(public location: Location, public snackBarService: SnackBarService, public userService: UsersService) { }

  getUserRole(): number {
    return jwt_decode(localStorage.getItem('accessToken')).userRole;
  }

  logout(): void {
    this.snackBarService.openSnackBar('Logout successful');
  }
}
