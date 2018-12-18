import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-welcome-page',
  templateUrl: './admin-welcome-page.component.html',
  styleUrls: ['./admin-welcome-page.component.css']
})
export class AdminWelcomePageComponent implements OnInit {

  constructor() { }

  panelOpenState = false;
  private username: string;

  ngOnInit() {
    this.username = sessionStorage.getItem('username');
  }

}
