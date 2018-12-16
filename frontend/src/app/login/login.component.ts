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
  private token: string;

  login(): void
  {
    this.loginService.submitLogin(this.username, this.password).subscribe(body => this.token = body.token);
    console.log("token -> " + this.token);
    localStorage.setItem(this.username, JSON.stringify(this.token));
  }

  redirectCreateUser(): void
  {
    this.router.navigateByUrl('users');
  }


  ngOnInit() {
  }

}
