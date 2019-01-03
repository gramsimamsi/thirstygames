import { Component, OnInit } from '@angular/core';
import {UsersService} from "../services/usersService/users.service";
import {User} from "../models/User";
import {SnackBarService} from "../services/snackBarService/snack-bar.service";
import {MatTableDataSource} from "@angular/material";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {


  constructor(private userService: UsersService,
              private snackBar: SnackBarService
  ) { }

  username;
  users: User[];
  displayedColumns: string[] = ['user_name', 'user_role', 'edit', 'delete'];
  dataSource: MatTableDataSource<User>;
  selectedRole: string;


  showAllUsers(): void
  {
    this.userService.getAllUsers().subscribe(
      users => {
        this.users = users;
        this.dataSource = new MatTableDataSource(users);
      },
      () => this.snackBar.openSnackBar('Could not load users')
    )
  }

  removeSingleUser(user): void
  {
    this.userService.deleteSingleUser(user._id).subscribe(
      response => this.snackBar.openSnackBar('Deleted'),
      () => this.snackBar.openSnackBar('Could not delete User: '  + user._id)
    );
  }


  ngOnInit() {
    this.users = [];
    this.username = sessionStorage.getItem('username');
    this.showAllUsers();

  }


}
