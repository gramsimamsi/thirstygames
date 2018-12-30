import {HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {throwError} from 'rxjs'


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

      //pass error to subscriber (good idea?)
      return  throwError(error.message)     //of(result as T);
    };
  }
}

/*
different possibilities for error handling
 -> with catch locally in service
 -> with error locally at subscribe()
 -> with httpInterceptor globally
 */



