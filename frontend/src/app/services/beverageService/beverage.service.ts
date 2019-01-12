import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Beverage } from '../../models/Beverage';
import { BaseService } from 'src/app/models/base.service';
import { SnackBarService } from '../snackBarService/snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class BeverageService extends BaseService<Beverage> {

  apiURL = 'beverage';

  constructor(_httpClient: HttpClient, _snackBarService: SnackBarService) {
    super(_httpClient, _snackBarService);
  }

  postSingleItem(item): void {
    throw new Error('One does not simply create drinks in the MVP!');
  }

  putSingleItem(item: Beverage): void {
    throw new Error('One does not simply edit drinks in the MVP!');
  }

  deleteSingleItem(id: string) {
    throw new Error('One does not simply delete drinks in the MVP!');
  }

}
