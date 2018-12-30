import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {HttpClientHelper} from "../../Utilites/HttpClientHelper";
import {catchError} from "rxjs/operators";
import {Team} from "../../models/Team";

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient) { }

  private getTeamsURL = "team";
  private deleteTeamURL = "team/:team_id";

  getAllTeams(): Observable<Team[]>
  {
    return this.http.get<Team[]>(this.getTeamsURL, HttpClientHelper.httpOptionsApplicationJSON)
      .pipe(catchError(HttpClientHelper.handleError("ERROR_GETTING_ALL_TEAMS", [])))
  }

  deleteSingleTeam(teamID): Observable<any>
  {
    return this.http.delete(this.deleteTeamURL+ teamID, HttpClientHelper.httpOptionsApplicationJSON)
      .pipe(catchError(HttpClientHelper.handleError("ERROR_DELETING_SINGLE_TEAM")))
  }
}
