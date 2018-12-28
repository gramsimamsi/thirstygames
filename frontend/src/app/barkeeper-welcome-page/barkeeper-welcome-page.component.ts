import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-barkeeper-welcome-page',
  templateUrl: './barkeeper-welcome-page.component.html',
  styleUrls: ['./barkeeper-welcome-page.component.css']
})
export class BarkeeperWelcomePageComponent implements OnInit {

  constructor() { }

  username;

  ngOnInit() {
    this.username = sessionStorage.getItem('username');

  }

}
