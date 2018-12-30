import { Component, OnInit } from '@angular/core';
import {User} from "../models/User";
import {UsersService} from "../services/usersService/users.service";
import {EventService} from "../services/eventService/event.service";
import { Event } from "../models/Event";
import {SelectionModel} from "@angular/cdk/collections";
import {SnackBarService} from "../services/snackBarService/snack-bar.service";
import {MatTableDataSource, MatSort} from "@angular/material";

@Component({
  selector: 'app-admin-welcome-page',
  templateUrl: './admin-welcome-page.component.html',
  styleUrls: ['./admin-welcome-page.component.css']
})
export class AdminWelcomePageComponent implements OnInit {

  constructor(private userService: UsersService,
              private snackBar: SnackBarService
              ) { }

  username;
  users: User[];
  displayedColumns: string[] = ['user_name', 'user_role', 'edit', 'delete'];
  dataSource: MatTableDataSource<User>;


  /*
  showAllEvents(): void
  {
    this.eventService.getAllEvents().subscribe(
      events => this.events = events,
      error => console.log("ERROR ADMIN WELCOME PAGE -> " + error)
    )
  }

  removeSingleEvent(event): void
  {
    this.eventService.deleteSingleUser(event).subscribe(
      response => console.log("Event removoed -> " + event.event_id),
      error => console.log("Error removing event -> " + error)
    )
  }
*/
  ////////////////////////////////////////////////////////////////////////////////////

  showAllUsers(): void
  {
    this.userService.getAllUsers().subscribe(
      users => {
        this.users = users;
        this.dataSource = new MatTableDataSource(users);
        console.log(this.dataSource);
      },
      () => this.snackBar.openSnackBar('Could not load users')
    )
  }

  removeSingleUser(user): void
  {
    this.userService.deleteSingleUser(user.user_id).subscribe(
      response => {this.showAllUsers(); console.log("User deleted -> " + user.user_id)},
      () => this.snackBar.openSnackBar('Could not delete User: '  + user.user_id)
    );
  }



  ///////////////////////////////////////////////////////////////////////////////////////
  ngOnInit() {
    this.users = [];
    this.username = sessionStorage.getItem('username');
    this.showAllUsers();


    //this.showAllEvents();
  }

}
