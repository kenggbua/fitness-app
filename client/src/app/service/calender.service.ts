import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CalenderService {
  private serverURL = 'http://localhost:3000/';
  private calenderURL = this.serverURL + 'terminplaner';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: ''
    })
  };


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
  constructor(private http: HttpClient) {}


  getSchedules(user: string): any {
    const getallUrl = `http://localhost:3000/user/getTermins` + user;
    return this.http.get(getallUrl, this.httpOptions).pipe(catchError(this.handleError));
  }

  insertCalenderEntry(username, subject, date, start): any {
    console.log('in calenderService ');
    console.log('subject: ' + subject);
    console.log('date: ' + date);
    console.log('starttime: ' + start);

    let body = {user: username, subject, date, start};
    return this.http.post<any>(this.calenderURL, body, this.httpOptions).pipe(map((data) => {
          this.httpOptions.headers = this.httpOptions.headers.set('Authorization', data);
          return true;
        })
      );
  }
}
