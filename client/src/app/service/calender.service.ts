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
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': ''
    })
  };

  constructor(private http: HttpClient) {}


  getSchedules(user: string): any {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', localStorage.getItem('token'));
    return this.http.get<any>(this.calenderURL + '/' + user, this.httpOptions).pipe(
      catchError((error) => { return of(undefined); })
    );
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
