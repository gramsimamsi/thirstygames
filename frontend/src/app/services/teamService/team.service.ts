import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, BehaviorSubject, Subject} from 'rxjs';
import {HttpClientHelper} from '../../Utilites/HttpClientHelper';
import {catchError, } from 'rxjs/operators';
import {Team} from '../../models/Team';
import { SnackBarService } from '../snackBarService/snack-bar.service';
import {WebsocketService} from '../webSocketService/web-socket.service';
import 'rxjs-compat/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private teamURL = 'team';
  public items: Observable<Team[]>;
  private loaded = false;
  private _items: BehaviorSubject<Team[]>;
  private dataStore: {
    items: Team[];
  };
  // needs to be public, so components can subscribe on it
  public messages: Subject<Team>;

  constructor(private http: HttpClient,
              private snackBarService: SnackBarService,
              private webSocketService: WebsocketService
              ) {
    this.dataStore = { items: [] };
    this._items = <BehaviorSubject<Team[]>>new BehaviorSubject([]);
    this.items = this._items.asObservable();

    this.updateTeams();

    // init Websocket
    this.messages = <Subject<any>>webSocketService
      .connect()
      .map((response: MessageEvent): Team => {
             const obj = JSON.parse(response.data)[0];
            return {
              _id: obj._id,
              team_name: obj.team_name,
              team_alc_count: obj.team_alc_count
            };
        });
  }

  getAllTeams(): Observable<Team[]> {
    return this.items;
  }
  deleteSingleTeam(teamID): Observable<any> {
  return this.http.delete(this.teamURL + '/' + teamID, HttpClientHelper.httpOptionsApplicationJSON)
    .pipe(catchError(HttpClientHelper.handleError('ERROR_DELETING_SINGLE_TEAM')));
  }
  putSingleTeam(team): Observable<any> {
    return this.http.put(this.teamURL + '/' + team._id, team, HttpClientHelper.httpOptionsApplicationJSON)
      .pipe(catchError(HttpClientHelper.handleError('ERROR_PUTTING_SINGLE_USER')));
  }
  updateTeams(): void {

    if (!this.loaded) {
      // call to server happens here
      this.http.get<Team[]>(this.teamURL, HttpClientHelper.httpOptionsApplicationJSON).subscribe(
        // success case: simply return the teams we got from the server
        (teamsFromServer: Team[]) => {

          this.loaded = true;
          this.dataStore.items = teamsFromServer;
          this._items.next(this.dataStore.items);
        },
        // error case: clear local teamArray and prompt an error message
        (errorFromServer) => {
          console.log('loading teams from server threw error:');
          console.log(errorFromServer);
          this.snackBarService.openSnackBarError('Server Error, please reload page!');

          this.loaded = false;
          this.dataStore.items = [];
          this._items.next(this.dataStore.items);
          console.log('returning from updateteams-servererror');
        }
      );
    }
  }

  keepUpdatedViaSocket(): void {

    this.messages.subscribe(
      msg => {
        this.dataStore.items.splice(this.dataStore.items.map(t => t._id).indexOf(msg._id), 1, msg);
        this._items.next(this.dataStore.items);
    });

  }

}
