import { Component, OnInit } from '@angular/core';
import {User} from "../models/User";
import {UsersService} from "../services/usersService/users.service";

@Component({
  selector: 'app-admin-welcome-page',
  templateUrl: './admin-welcome-page.component.html',
  styleUrls: ['./admin-welcome-page.component.css']
})
export class AdminWelcomePageComponent implements OnInit {

  constructor(private userService: UsersService) { }

  panelOpenState = false;
  private username: string;
  users: User[];

  showAllUsers(): void
  {
    this.userService.getAllUsers().subscribe(
      users => this.users = users,
      error1 => console.log('ERROR ADMIN WELCOME PAGE -> ' + error1.toString())
    )
  }

  deleteSingleUser(user): void
  {
    this.userService.deleteSingleUser(user.user_id).subscribe(
      response => {this.showAllUsers(); console.log("User deleted -> " + user.user_id)},
      error => console.log("ERROR_DELETING_USER")
    );
  }

  ngOnInit() {
    this.username = sessionStorage.getItem('username');
    this.showAllUsers();
  }

}
