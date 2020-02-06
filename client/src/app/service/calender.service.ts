import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {of, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CalenderService {
  private serverURL = 'http://localhost:3000/';
  private calenderURL = this.serverURL + 'terminplaner';
  private insertCalenderURL = this.serverURL + 'insertTermin';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': ''
    })
  };

  constructor(private http: HttpClient) {}

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

  getSchedules(user: string): any {
    console.log('in getSchedules');
    return this.http.get(this.calenderURL + '/' + user, this.httpOptions).pipe(catchError(this.handleError));
  }

  insertCalenderEntry(username, subject, date, start): any {
    console.log('in calenderService ');
    console.log('subject: ' + subject);
    console.log('date: ' + date);
    console.log('starttime: ' + start);

    let body = {user: username, subject: subject, date: date, start: start};
    return this.http.post<any>(this.insertCalenderURL, body, this.httpOptions).pipe(map((data) => {
          this.httpOptions.headers = this.httpOptions.headers.set('Authorization', data);
          return true;
        })
      );
  }
}
