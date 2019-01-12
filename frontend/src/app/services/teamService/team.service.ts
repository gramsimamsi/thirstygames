import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, BehaviorSubject} from 'rxjs';
import {HttpClientHelper} from '../../Utilites/HttpClientHelper';
import {Team} from '../../models/Team';
import { SnackBarService } from '../snackBarService/snack-bar.service';
import {WebsocketService} from '../webSocketService/web-socket.service';
import 'rxjs-compat/add/operator/map';
import { BaseService } from 'src/app/models/base.service';
import { Beverage } from 'src/app/models/Beverage';

@Injectable({
  providedIn: 'root'
})
export class TeamService  extends BaseService<Team> {

  apiURL = 'team';

  constructor(private _httpClient: HttpClient,
              private _snackBarService: SnackBarService,
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

}
