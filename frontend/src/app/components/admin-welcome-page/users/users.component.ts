import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { User } from 'src/app/models/User';
import { UsersService } from 'src/app/services/usersService/users.service';
import { SnackBarService } from 'src/app/services/snackBarService/snack-bar.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  username;
  users: User[];
  deniedUsers: User[];
  displayedColumns: string[] = ['user_name', 'user_role_edit', 'edit'];
  dataSource: MatTableDataSource<User>;
  deniedDataSource: MatTableDataSource<User>;

  constructor(public userService: UsersService,
              private snackBar: SnackBarService) { }

  loadUsers(): void {
    this.userService.getAllItems().subscribe(
      users => {
        this.users = users;
        this.deniedUsers = users.filter( (user: User) => user.user_role === this.userService.roleNameToId('Denied'));
        const notDeniedUsers = users.filter( (user: User) => user.user_role !== this.userService.roleNameToId('Denied'));
        this.dataSource = new MatTableDataSource(notDeniedUsers);
        this.deniedDataSource = new MatTableDataSource(this.deniedUsers);
      },
      () => this.snackBar.openSnackBar('Could not load users')
    );
  }

  updateSingleUser(user, value): void {

    user.user_role = value;
    this.userService.putSingleItem(user);
  }

  ngOnInit() {
    this.users = [];
    this.username = sessionStorage.getItem('username');
    this.userService.init();
    this.loadUsers();

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
