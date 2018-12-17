import { Component, OnInit } from '@angular/core';
import {UsersService} from "../services/usersService/users.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private userService: UsersService) { }

  showAllUsers(): void
  {
    this.userService.getAllUsers().subscribe(
      body => console.log(body)
    );
  }


  ngOnInit() {
    this.showAllUsers();
  }

}
