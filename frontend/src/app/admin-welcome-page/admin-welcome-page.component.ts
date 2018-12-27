import { Component, OnInit } from '@angular/core';
import {User} from "../models/User";
import {UsersService} from "../services/usersService/users.service";
import {EventService} from "../services/eventService/event.service";
import { Event } from "../models/Event";

@Component({
  selector: 'app-admin-welcome-page',
  templateUrl: './admin-welcome-page.component.html',
  styleUrls: ['./admin-welcome-page.component.css']
})
export class AdminWelcomePageComponent implements OnInit {

  constructor(private userService: UsersService,
              private eventService: EventService
              ) { }

  panelOpenState = false;
  username;
  users: User[];
  events: Event[];


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

  ////////////////////////////////////////////////////////////////////////////////////
  showAllUsers(): void
  {
    this.userService.getAllUsers().subscribe(
      users => this.users = users,
      error1 => console.log('ERROR ADMIN WELCOME PAGE -> ' + error1.toString())
    )
  }

  removeSingleUser(user): void
  {
    this.userService.deleteSingleUser(user.user_id).subscribe(
      response => {this.showAllUsers(); console.log("User deleted -> " + user.user_id)},
      error => console.log("ERROR_DELETING_USER")
    );
  }

  ///////////////////////////////////////////////////////////////////////////////////////
  ngOnInit() {
    this.username = sessionStorage.getItem('username');
    this.showAllUsers();
    this.showAllEvents();
  }

}
