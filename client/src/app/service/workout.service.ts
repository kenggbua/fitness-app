import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import {Observable, of, throwError} from 'rxjs';
import {Workout} from '../helper/workout';




@Injectable({
  providedIn: 'root'
})




export class WorkoutService {

  private serverURL = 'http://localhost:3000/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': ''
    })
  };

  entries: Workout[];

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


  getWorkouts(): any {
    this.entries = [];
    const getallUrl = `http://${this.serverURL}/plans`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this.http.get(getallUrl, httpOptions)
      .pipe(
        catchError(this.handleError)
      ).subscribe((data: any) => {
      Object.keys(data).forEach(
        (key) => {
          let entry = new Workout (
            data[key].id,
            data[key].name)
          this.entries.push(entry);
        }
      );
    });
  }
}
