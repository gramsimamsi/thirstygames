import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Team} from '../../models/Team';
import { SnackBarService } from '../snackBarService/snack-bar.service';
import {WebsocketService} from '../webSocketService/web-socket.service';
import 'rxjs-compat/add/operator/map';
import { BaseService } from 'src/app/services/base.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeamService  extends BaseService<Team> {

  apiURL = 'team';

  constructor(_httpClient: HttpClient,
              _snackBarService: SnackBarService,
              private webSocketService: WebsocketService
              ) {
    super(_httpClient, _snackBarService);

  }

  // has to be called before any other function call
  init(): void {
    if (!this.loaded) {
      super.init();

      // init Websocket
      this.webSocketService.connect()
      .map((response: MessageEvent): Team => {
            // get data from webSocketService and convert it
            const obj = JSON.parse(response.data)[0];
            return {
              _id: obj._id,
              team_name: obj.team_name,
              team_alc_count: obj.team_alc_count
            };
        }).subscribe(
          // update local duplicate of server data, push changes to subscribers
          msg => {
            this.dataStore.items.splice(this.dataStore.items.map(t => t._id).indexOf(msg._id), 1, msg);
            this._items.next(this.dataStore.items);
        });
    }
  }

  // uses base service, but rounds team_alc_count to 2 decimal points!
  getAllItems(): Observable<Team[]> {
    return super.getAllItems().pipe(
      map((result: Team[] ) => {
        result.forEach(team => {
          team.team_alc_count = +team.team_alc_count.toFixed(2);
        });
        return result;
      }
    ));
  }

}
