import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { Event} from "../../models/Event";
import {catchError} from "rxjs/operators";
import {HttpClientHelper} from "../../Utilites/HttpClientHelper";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  private getEventsURL = "event";
  private deleteEventURL = "event/";

  getAllEvents(): Observable<Event[]>
  {
    return this.http.get<Event[]>(this.getEventsURL, HttpClientHelper.httpOptionsApplicationJSON)
      .pipe(catchError(HttpClientHelper.handleError("ERROR_GETTING_ALL_EVENTS", [])))
  }

  deleteSingleEvent(eventID): Observable<any>
  {
    return this.http.delete(this.deleteEventURL + eventID, HttpClientHelper.httpOptionsApplicationJSON)
      .pipe(catchError(HttpClientHelper.handleError("ERROR_DELETING_SINGLE_EVENT")))
  }
}
