import { Injectable } from '@angular/core';
import {Observable, Observer, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  constructor() { }

  private subject: Subject<MessageEvent>;
  private webSocketURL = `ws://${window.location.hostname}:3000/`;

  public connect(): Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create();
      console.log('Successfully connected: ' + this.webSocketURL);
    }
    return this.subject;
  }

  private create(): Subject<MessageEvent> {
    const ws = new WebSocket(this.webSocketURL);

    const observable = Observable.create(
      (obs: Observer<MessageEvent>) => {
        ws.onmessage = obs.next.bind(obs);
        ws.onerror = obs.error.bind(obs);
        ws.onclose = obs.complete.bind(obs);
        return ws.close.bind(ws);
      });
    const observer = {
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      }
    };
    return Subject.create(observer, observable);
  }

}
