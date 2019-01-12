import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../models/User';
import { BaseService } from 'src/app/services/base.service';
import { SnackBarService } from '../snackBarService/snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseService<User> {

  apiURL = 'user';

  constructor(_httpClient: HttpClient, _snackBarService: SnackBarService) {
    super(_httpClient, _snackBarService);
  }

  deleteSingleItem(id: string): void {
    throw new Error('One does not simply delete users in the MVP!');
  }

  postSingleItem(itemWithoutId): void {
    throw new Error('One does not simply create users via the userService, use createUserService instead!');
  }
}

