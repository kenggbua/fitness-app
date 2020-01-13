import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  serverUrl = 'http://localhost:3000/login';
  httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'}) };

  constructor(private http: HttpClient) { }

  loginUser(username, password): any {
    let url = this.serverUrl + "login";
    let data = {user: username, pass: password};
    let result =  this.http.post<any>('localhost:3000/login', data, this.httpOptions).pipe(
      map((data) => {
        if(data && data.token) {
          document.cookie = JSON.stringify(data.token);
          return true;
        }
        return false;
      }), catchError(this.handleError<boolean>('something', false))
    );
    console.log(result);
    return false;
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    }
  }
}
