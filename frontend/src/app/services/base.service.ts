import {HttpClient} from '@angular/common/http';
import {Observable, BehaviorSubject} from 'rxjs';
import {HttpClientHelper} from '../Utilites/HttpClientHelper';
import {SnackBarService} from './snackBarService/snack-bar.service';

export abstract class BaseService<T extends { _id: string }> {

  protected apiURL;
  public items: Observable<T[]>;
  protected loaded = false;
  protected _items: BehaviorSubject<T[]>;
  protected dataStore: {
    items: T[];
  };

  constructor(private http: HttpClient,
              private snackBarService: SnackBarService) {
    this.dataStore = { items: [] };
    this._items = <BehaviorSubject<T[]>>new BehaviorSubject([]);
    this.items = this._items.asObservable();
  }

  // has to be called before any other function call
  init(): void {
    if (!this.loaded) {
      // initial load via https

      // call to server happens here
      this.http.get<T[]>(this.apiURL, HttpClientHelper.httpOptionsApplicationJSON).subscribe(
        // success case: simply return the items we got from the server
        (itemsFromServer: T[]) => {
          this.loaded = true;
          this.dataStore.items = itemsFromServer;
          this._items.next(this.dataStore.items);
        },
        // error case: clear local itemArray and prompt an error message
        (errorFromServer) => {
          this.errorRecovery(errorFromServer);
        }
      );

    }
  }

  getAllItems(): Observable<T[]> {
    return this.items;
  }

  postSingleItem(itemWithoutId): void {
    console.log('triggered postsingleitem');
    // optimistically add the item we shall, with a dummy id
    const optimisticItem: T = {...itemWithoutId};
    // use random number in case another post is set off before this one returns
    optimisticItem._id = Math.random().toString();

    this.dataStore.items.push(optimisticItem);
    this._items.next([...this.dataStore.items]);
    this.snackBarService.openSnackBar('You created something!');

    this.http.post<T>(this.apiURL, itemWithoutId, HttpClientHelper.httpOptionsApplicationJSON).subscribe(
      // success case: replace the dummy item with the one we got from the server
      (createdItem: T) => {
        this.dataStore.items.splice(this.dataStore.items.map(t => t._id).indexOf(optimisticItem._id), 1, createdItem);
        this._items.next(this.dataStore.items);
      },
      // error case: clear local itemArray and prompt an error message
      (errorFromServer) => {
        this.errorRecovery(errorFromServer);
      });
  }

  deleteSingleItem(itemId: string): void {
    // optimistically delete the item we shall
    const deletedItem: T[] = this.dataStore.items.splice(this.dataStore.items.map(t => t._id).indexOf(itemId), 1);
    this._items.next(this.dataStore.items);
    this.snackBarService.openSnackBar('You deleted something!');

    this.http.delete(this.apiURL + '/' + itemId, HttpClientHelper.httpOptionsApplicationJSON).subscribe(
      // success case: everything already done, nothing to do here
      () => { },
      // error case: clear local itemArray and prompt an error message
      (errorFromServer) => {
        this.errorRecovery(errorFromServer);
      });
  }

  putSingleItem(item: T): void {
    // optimistically edit the item we shall
    this.dataStore.items.splice(this.dataStore.items.map(t => t._id).indexOf(item._id), 1, item);
    this._items.next(this.dataStore.items);
    // this.snackBarService.openSnackBar('You updated ' + item.getName() + '!');

    this.http.put(this.apiURL + '/' + item._id, item, HttpClientHelper.httpOptionsApplicationJSON).subscribe(
      // success case: everything already done, nothing to do here
      () => { },
      // error case: clear local itemArray and prompt an error message
      (errorFromServer) => {
        this.errorRecovery(errorFromServer);
      });
  }

  protected errorRecovery(errorFromServer): void {
    console.log('server threw error:');
    console.log(errorFromServer);
    this.snackBarService.openSnackBarError('Oops - something went wrong, please reload page!');

    this.loaded = false;
    this.dataStore.items = [];
    this._items.next(this.dataStore.items);
    console.log('returning from servererror');
  }

  // helper class for invividual items
  getOneItem(itemId): Observable<T> {
    return this.getAllItems().map(
      items => {
        const filterResults = items.filter(item => item._id === itemId);
        return (filterResults.length > 0) ? filterResults[0] : null;
      }
    );
  }
}
