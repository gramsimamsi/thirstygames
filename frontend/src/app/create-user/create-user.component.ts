import { Component, OnInit } from '@angular/core';
import {CreateUserServiceService} from "../services/createUserService/create-user-service.service";
import { InputErrorStateMatcher} from "../Utilites/InputErrorStateMatcher/input-error-state-matcher";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  inputForm: FormGroup;

  matcher = new InputErrorStateMatcher();

  constructor(private formBuilder: FormBuilder,
              private createUserService: CreateUserServiceService
              )
  {
    this.inputForm = this.formBuilder.group({
        username: '',
        password: ['', [Validators.required]],
        confirmPassword: ['']
      },
      { validator: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true }
  }


  addUser(): void
  {
    this.createUserService.createUser(this.inputForm.get("username").value, this.inputForm.get("password").value)
      .subscribe(response => console.log(response));
  }

ngOnInit() {
  }

}
