import {HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";


export class HttpClientHelper
{

  static httpOptionsApplicationJSON = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json'
    }
  )
};

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
   static handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.log(`${operation} failed: ${error.message}`); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
