import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {HttpClientHelper} from "../../Utilites/HttpClientHelper";
import {catchError} from "rxjs/operators";
import {Beverage} from "../../models/Beverage";

@Injectable({
  providedIn: 'root'
})
export class BeverageService {

  constructor(private http: HttpClient) { }

  private beveragesGet = 'beverage';
  private singleBeverageDelete = 'beverages?beverage_id=';

  getAllBeverages(): Observable<Beverage[]>
  {
    return this.http.get<Beverage[]>(this.beveragesGet, HttpClientHelper.httpOptionsApplicationJSON)
      .pipe(catchError(HttpClientHelper.handleError('GET_ALL_BEVERAGES_ERROR', [])));
  }

  deleteSingleBeverage(beverageID): Observable<any>
  {
    return this.http.delete(this.singleBeverageDelete + beverageID, HttpClientHelper.httpOptionsApplicationJSON)
      .pipe(catchError(HttpClientHelper.handleError('DELETE_SINGLE_BEVERAGE_ERROR ->' + beverageID)));
  }
}
