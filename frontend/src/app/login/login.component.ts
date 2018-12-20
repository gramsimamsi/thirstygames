import { Component, OnInit } from '@angular/core';
import {LoginServeService} from "../services/loginService/login-serve.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginServeService,
              private router: Router) { }

  private username: string;
  private password: string;

  login(): void
  {
    this.loginService.submitLogin(this.username, this.password)
      .subscribe(
        body => {
                        localStorage.setItem('accessToken', JSON.stringify(body.token));
                        localStorage.setItem('username', JSON.stringify(this.username));
                        localStorage.setItem('refreshToken', JSON.stringify(body.refreshToken));
                        this.router.navigateByUrl('admin/welcome');
                      },
        body => {
          console.log("ERROR LOGIN_SERVICE GETTING token ->" + body.token);

        }

    );
  }

  ngOnInit() {
  }

}
