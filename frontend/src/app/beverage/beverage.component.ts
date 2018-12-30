import { Component, OnInit } from '@angular/core';
import {SnackBarService} from "../services/snackBarService/snack-bar.service";
import {MatTableDataSource} from "@angular/material";
import {BeverageService} from "../services/beverageService/beverage.service";
import {Beverage} from "../models/Beverage";

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
  displayedColumns: string[] = ['beverage_name', 'beverage_alc', 'edit', 'delete'];
  dataSource: MatTableDataSource<Beverage>;


  showAllBeverages(): void
  {
    this.beverageService.getAllBeverages().subscribe(
      beverages => {
        this.beverage = beverages;
        this.dataSource = new MatTableDataSource(this.beverage);
      },
      () => this.snackBar.openSnackBar('Could not load Beverages')
    );
  }

  removeSingleBeverage(beverage): void
  {
    this.beverageService.deleteSingleBeverage(beverage.user_id).subscribe(
      response => this.snackBar.openSnackBar('Deleted'),
      () => this.snackBar.openSnackBar('Could not delete Beverage: '  + beverage.beverage_id)
    );
  }

  ngOnInit() {
    this.showAllBeverages();
  }
}
