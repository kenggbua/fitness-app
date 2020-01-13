import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private serverURL = 'http://localhost:3000/';
  private loginURL = this.serverURL + "login";
  httpOptions = { headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': ''
  })};

  constructor(private http: HttpClient) { }

  loginUser(username, password): any {
    let data = {user: username, pass: password};
    return this.http.post<any>(this.loginURL, data, this.httpOptions).pipe(
      map((data) => {
        if(data && data.token) {
          document.cookie = data.token;
          httpOptions.headers = httpOptions.headers.set('Authorization', data);
          return true;
        }
        return false;
      }), catchError(this.handleError<boolean>(false))
    );
  }

  checkCookie(): any{
    let data = document.cookie;
    console.log(data);
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', JSON.parse(data));

    return this.http.get<any>(this.loginURL+"/tok", this.httpOptions)
    .pipe(map((data) => {
      if(data && data.token) {
        return true;
      }
      return false;
    }), catchError(this.handleError<boolean>(false)));
  }

  private handleError<T> (result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    }
  }
}
