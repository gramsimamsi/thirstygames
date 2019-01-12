import { Component, OnInit } from '@angular/core';
import {CreateUserServiceService} from '../services/createUserService/create-user-service.service';
import { InputErrorStateMatcher} from '../Utilites/InputErrorStateMatcher/input-error-state-matcher';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginServeService} from '../services/loginService/login-serve.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  inputForm: FormGroup;
  matcher = new InputErrorStateMatcher();

  constructor(private formBuilder: FormBuilder,
              private createUserService: CreateUserServiceService,
              private loginService: LoginServeService) {
    this.inputForm = this.formBuilder.group({
      username: '',
      password: ['', [Validators.required]],
      confirmPassword: ['']
    },
    { validator: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true };
  }

  addUser(): void {
    const username = this.inputForm.get('username').value;
    const password = this.inputForm.get('password').value;
    this.createUserService.createUser(username, password)
      .subscribe(response => {
        console.log(response);
      });
  }

  ngOnInit() {
  }

}
