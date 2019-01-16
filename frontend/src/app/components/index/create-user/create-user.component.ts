import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { InputErrorStateMatcher } from 'src/app/Utilites/InputErrorStateMatcher/input-error-state-matcher';
import { CreateUserServiceService } from 'src/app/services/createUserService/create-user-service.service';
import { SnackBarService } from 'src/app/services/snackBarService/snack-bar.service';

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
              private snackBarService: SnackBarService) {
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
      .subscribe(
        () => { this.snackBarService.openSnackBar('successfully created account!'); },
        () => { this.snackBarService.openSnackBarError('account creation failed, please try again. Min password length: 8 characters'); },
      );
  }

  ngOnInit() {
  }

}
