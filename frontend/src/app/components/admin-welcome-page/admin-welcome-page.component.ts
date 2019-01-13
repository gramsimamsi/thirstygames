import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-admin-welcome-page',
  templateUrl: './admin-welcome-page.component.html',
  styleUrls: ['./admin-welcome-page.component.css']
})
export class AdminWelcomePageComponent implements OnInit {

  activeTab: string;
  username: string;

  constructor(public router: ActivatedRoute) {
    this.activeTab = router.snapshot.params.tab;
  }

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username');
  }
}
