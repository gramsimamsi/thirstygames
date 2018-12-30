import { Component, OnInit } from '@angular/core';
import {EventService} from "../services/eventService/event.service";
import { Event} from "../models/Event";
import {SnackBarService} from "../services/snackBarService/snack-bar.service";
import {MatTableDataSource} from "@angular/material";


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {


  constructor(private eventService: EventService,
              private snackBar: SnackBarService
  ) { }

  private events: Event[];
  displayedColumns: string[] = ['event_name', 'event_date', 'edit', 'delete'];
  dataSource: MatTableDataSource<Event>;



  showAllEvents(): void
  {
    this.eventService.getAllEvents().subscribe(
      events => {
        this.events = events;
        this.dataSource = new MatTableDataSource(events);

      },
      () => this.snackBar.openSnackBar('Could not load users')
    )
  }

  removeSingleEvent(event): void
  {
    this.eventService.deleteSingleEvent(event.event_id).subscribe(
      response => {this.showAllEvents(); console.log("Event deleted -> " + event.event_id)},
      () => this.snackBar.openSnackBar('Could not delete Event: '  + event.event_id)
    );
  }


  ngOnInit() {
    this.events = [];
    this.showAllEvents();

  }

}
