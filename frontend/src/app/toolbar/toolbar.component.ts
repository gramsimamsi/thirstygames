import { Component, OnInit, Input } from '@angular/core';
import { SnackBarService } from '../services/snackBarService/snack-bar.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @Input() navMenuRef;

  location: Location;
  snackBarService: SnackBarService;

  constructor(location: Location, snackBarService: SnackBarService) {
    this.location = location;
    this.snackBarService = snackBarService;
   }

  logout(): void {
    this.snackBarService.openSnackBar('Logout successful');
  }

  ngOnInit() {

  }

}
