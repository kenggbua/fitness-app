import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import {Observable, of, throwError} from 'rxjs';





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
    const getallUrl = `http://localhost:3000/plans`;
    return this.http.get(getallUrl, this.httpOptions).pipe(catchError(this.handleError));
  }
  getSets(id: number): any {
    const getallUrl = `http://localhost:3000/workout/` + id;
    return this.http.get(getallUrl, this.httpOptions).pipe(catchError(this.handleError));
  }

  getFinishedWorkout(id: number): any {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', localStorage.getItem("token"));
    return this.http.get(this.serverURL + "finWorkout/" + id, this.httpOptions).pipe(catchError(this.handleError));
  }
}
