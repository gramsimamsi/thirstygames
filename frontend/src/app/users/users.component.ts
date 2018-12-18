import { Component, OnInit } from '@angular/core';
import {UsersService} from "../services/usersService/users.service";
import {Observable} from "rxjs";
import {User} from "./User";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private userService: UsersService) { }

  users: User[];

  showAllUsers(): void
  {
    this.userService.getAllUsers().subscribe(
      users => {
        this.users = users;

      },
      error => console.log("ERROR GETTING USERS -> " + error.toString())
    );
  }


  ngOnInit() {
    this.showAllUsers();
  }

}
