import { Component, OnInit } from '@angular/core';
import {LoginServeService} from "../services/loginService/login-serve.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginServeService) { }

  private username: String;
  private password: String;

  login(): void
  {
    this.loginService.submitLogin(this.username, this.password).subscribe();
  }

  ngOnInit() {
  }

}
