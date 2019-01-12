import { Component, OnInit } from '@angular/core';
import {SnackBarService} from '../services/snackBarService/snack-bar.service';
import {MatTableDataSource} from '@angular/material';
import {BeverageService} from '../services/beverageService/beverage.service';
import {Beverage} from '../models/Beverage';

@Component({
  selector: 'app-beverage',
  templateUrl: './beverage.component.html',
  styleUrls: ['./beverage.component.css']
})
export class BeverageComponent implements OnInit {


  constructor(private beverageService: BeverageService,
              private snackBar: SnackBarService
  ) { }

  beverage: Beverage[];
  displayedColumns: string[] = ['beverage_name', 'beverage_alc'];
  dataSource: MatTableDataSource<Beverage>;


  showAllBeverages(): void {
    this.beverageService.init();
    this.beverageService.getAllItems().subscribe(
      beverages => {
        this.beverage = beverages;
        this.dataSource = new MatTableDataSource(this.beverage);
      },
      () => this.snackBar.openSnackBar('Could not load Beverages')
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit() {
    this.showAllBeverages();
  }
}
