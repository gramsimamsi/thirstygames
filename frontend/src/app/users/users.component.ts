import { Component, OnInit } from '@angular/core';
import {UsersService} from '../services/usersService/users.service';
import {User} from '../models/User';
import {SnackBarService} from '../services/snackBarService/snack-bar.service';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  username;
  users: User[];
  displayedColumns: string[] = ['user_name', 'user_role_edit'];
  dataSource: MatTableDataSource<User>;
  // userRoles = [userRoles['ADMIN'], userRoles['BARKEEPER']];
  userRoles = [
    'ADMIN',
    'BARKEEPER',
    'VIEWER',
    'SEB_SPRINGER'];

  constructor(private userService: UsersService,
              private snackBar: SnackBarService
  ) { }

  showAllUsers(): void {
    this.userService.getAllItems().subscribe(
      users => {
        this.users = users;
        this.dataSource = new MatTableDataSource(users);
      },
      () => this.snackBar.openSnackBar('Could not load users')
    );
  }

  updateSingleUser(user, value): void {

    user.user_role = value;
    console.log(user);
    this.userService.putSingleItem(user);
  }

  ngOnInit() {
    this.users = [];
    this.username = sessionStorage.getItem('username');
    this.userService.init();
    this.showAllUsers();

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
