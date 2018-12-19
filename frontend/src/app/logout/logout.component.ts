import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    //logout user -> remove all entries in localStorage? or only accessToken
    localStorage.removeItem('accessToken');
  }

}


// ToDo -> deny access to pages after login, currently user can only not do api-calls
