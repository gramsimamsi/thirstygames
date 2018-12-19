import { Component, OnInit } from '@angular/core';
import {EventService} from "../services/eventService/event.service";
import { Event} from "../models/Event";


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  constructor(private eventService: EventService) { }

  private events: Event[];

  showAllEvents(): void
  {
    this.eventService.getAllEvents()
      .subscribe(
        result => {
            this.events = result;
            console.log("Events -> " + result);
        },
        error => console.log("Error getting all evens -> " + error)
      )
  }
  ngOnInit() {
  }

}
