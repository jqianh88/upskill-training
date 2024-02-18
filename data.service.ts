import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Item } from './item.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'api/items'; // Assume this is the API endpoint for fetching items

  constructor(private http: HttpClient) { }

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl).pipe(
      catchError(this.handleError<Item[]>('getItems', []))
    );
  }

  updateItem(item: Item): Observable<any> {
    // Assume this would send a PUT request to update item data on the server
    return of(true);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // Log the error to console
      // Let the app keep running by returning an empty result
      return of(result as T);
    };
  }
}
