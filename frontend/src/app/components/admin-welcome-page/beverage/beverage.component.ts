import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { Beverage } from 'src/app/models/Beverage';
import { BeverageService } from 'src/app/services/beverageService/beverage.service';
import { SnackBarService } from 'src/app/services/snackBarService/snack-bar.service';

@Component({
  selector: 'app-beverage',
  templateUrl: './beverage.component.html',
  styleUrls: ['./beverage.component.css']
})
export class BeverageComponent implements OnInit {

  beverage: Beverage[];
  displayedColumns: string[] = ['beverage_name', 'beverage_alc'];
  dataSource: MatTableDataSource<Beverage>;

  constructor(private beverageService: BeverageService,
              private snackBar: SnackBarService
  ) { }

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
