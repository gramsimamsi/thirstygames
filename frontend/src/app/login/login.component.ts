import { Component, OnInit } from '@angular/core';
import {LoginServeService} from "../services/loginService/login-serve.service";
import {Router} from "@angular/router";
import * as jwt_decode from 'jwt-decode'
import {userRoles} from "../../environments/environment";
import {SnackBarService} from "../services/snackBarService/snack-bar.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginServeService,
              private router: Router,
              private snackBar: SnackBarService) { }

  private username: string;
  private password: string;

  login(): void
  {
    this.loginService.submitLogin(this.username, this.password)
      .subscribe(
        body => {
                          localStorage.setItem('accessToken', JSON.stringify(body.token));
                          sessionStorage.setItem('username', JSON.stringify(this.username));
                          localStorage.setItem('refreshToken', JSON.stringify(body.refreshToken));
                          this.redirectOnRole(body.token);
                      },
        error => {
          console.log("ERROR LOGIN_SERVICE -> " + error);
          this.snackBar.openSnackBar('Login Failed');
          this.username = '';
          this.password = ''
        }
    );
  }

  /*

  was sceptical about this approach, but STOVF ... :D
  https://stackoverflow.com/questions/51171468/how-to-achieve-role-based-redirection-after-login-in-angular-5
   */
  redirectOnRole(token): void
  {
      //get userRole from token
    const userRole = jwt_decode(token).userRole;

    switch(userRole)
    {
      case userRoles.ADMIN:
        this.router.navigateByUrl('admin/welcome');
        break;
      case userRoles.BARKEEPER:
        this.router.navigateByUrl('barkeeper/welcome');
        break;
      case userRoles.SEB_SPRINGER:
        //joa better do sth here :D
            break;
      default:
        this.router.navigateByUrl('viewer'); //Todo better add this router sooner or later :D
        break;
    }
  }

  ngOnInit() {
  }

}
