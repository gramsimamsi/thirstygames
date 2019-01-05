import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, BehaviorSubject, from, of, timer} from 'rxjs';
import {HttpClientHelper} from '../../Utilites/HttpClientHelper';
import {catchError, mergeMap, map} from 'rxjs/operators';
import {Team} from '../../models/Team';
import { SnackBarService } from '../snackBarService/snack-bar.service';


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

  constructor(private http: HttpClient, private snackBarService: SnackBarService) {
    console.log('creating team service');
    this.dataStore = { items: [] };
    this._items = <BehaviorSubject<Team[]>>new BehaviorSubject([]);
    this.items = this._items.asObservable();

    this.updateTeams();
  }

  getAllTeams(): Observable<Team[]> {
    return this.items;
  }

  /*
  getAllTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.teamURL, HttpClientHelper.httpOptionsApplicationJSON)
      .pipe(catchError(HttpClientHelper.handleError('ERROR_GETTING_ALL_TEAMS', [])));
  }
  */
  deleteSingleTeam(teamID): Observable<any> {
  return this.http.delete(this.teamURL + '/' + teamID, HttpClientHelper.httpOptionsApplicationJSON)
    .pipe(catchError(HttpClientHelper.handleError('ERROR_DELETING_SINGLE_TEAM')));
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
    // TODO: manipulate the old Team[] data in this.dataStore.items so that it reflects the current server Team[] data

    // once updated, this line pushes the new data to everybody who's interested for updating their stuff
    this._items.next(this.dataStore.items);

    // TODO: write 'teamService.keepUpdatedViaSocket();' into ngOnInit of score view
  }

}
