import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private serverUrl = 'http://localhost:3000/';
  httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'}) };

  constructor(private http: HttpClient) { }

  loginUser(username, password): any {
    let url = this.serverUrl + "login";
    let data = {user: username, pass: password};
    return this.http.post<any>(url, data, this.httpOptions).pipe(
      map((data) => {
        if(data && data.token) {
          document.cookie = JSON.stringify(data.token);
        }
      }), catchError(this.handleError<boolean>('something', false))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    }
  }
}
