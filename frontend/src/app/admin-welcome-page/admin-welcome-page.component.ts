import { Component, OnInit } from '@angular/core';
import {User} from "../models/User";
import {UsersService} from "../services/usersService/users.service";
import {UsersComponent} from "../users/users.component";

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

  ngOnInit() {
    this.username = sessionStorage.getItem('username');
    this.showAllUsers();
  }

}
