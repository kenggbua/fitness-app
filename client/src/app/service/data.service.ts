import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private serverURL = 'http://localhost:3000/';
  private loginURL = this.serverURL + "login";
  private registerURL = this.serverURL + "register";
  private userURL = this.serverURL + "user";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': ''
    })
};

  constructor(private http: HttpClient) { }

  registerUser(email: string, username: string, password: string): any {
    let data = { mail: email, user: username, pass: password };
    return this.http.post<any>(this.registerURL, data, this.httpOptions).pipe(
      map((data) => {
        if (data && data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("u_name", username);
          return true;
        }
        return data.message;
      }), catchError((error) => {
        console.log(error.error.message);
        return of(error.error.message);
      })
    );
  }

  loginUser(username, password): any {
    let body = { user: username, pass: password };
    return this.http.post<any>(this.loginURL, body, this.httpOptions).pipe(
      map((data) => {
        if (data && data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("u_name", username);
          return true;
        }
        return false;
      }), catchError((error) => { return of(false); })
    );
  }

  getUserData(username: string) {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', localStorage.getItem("token"));
    return this.http.get<any>(this.userURL + "/" + username, this.httpOptions).pipe(
      catchError((error) => { return of(undefined); })
    );
  }

  saveUserData(user) {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', localStorage.getItem("token"));
    let url = this.userURL + "/" + user.u_name;
    return this.http.patch<any>(url, user, this.httpOptions).pipe(
      catchError((error) => { return of(undefined); })
    );
  }

  logout(): void {
    localStorage.clear();
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', '');
  }
}
