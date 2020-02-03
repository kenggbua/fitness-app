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
  private insertLogURL = this.serverURL + "saveLogEntry"
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
          document.cookie = data.token;
          this.httpOptions.headers = this.httpOptions.headers.set('Authorization', data);
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
          document.cookie = data.token;
          this.httpOptions.headers = this.httpOptions.headers.set('Authorization', data);
          return true;
        }
        return false;
      }), catchError((error) => { return of(false); })
    );
  }

  getUserData() {
    let data = document.cookie;
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', data);
    return this.http.get<any>(this.userURL, this.httpOptions).pipe(
      catchError((error) => { return of(undefined); })
    );
  }

  saveUserData(user) {
    let data = document.cookie;
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', data);
    let url = this.userURL + "/" + user.u_name;
    return this.http.patch<any>(url, user, this.httpOptions).pipe(
      catchError((error) => { return of(undefined); })
    );
  }

  checkCookie(): any {
    let data = document.cookie;
    if(data === '') return of(false);
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', data);

    return this.http.get<any>(this.loginURL + '/tok', this.httpOptions).pipe(
      map((data) => {
        if (data && data.token) {
          return true;
        }
        return false;
      }), catchError((error) => { return of(false); })
      );
  }

  deleteCookie(): void {
    document.cookie = '';
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', '');
  }

  insertLogEntry(username, exercisename, iscardio, setnumber,weight, reps):any{

    

    //this.http.post<any>('http://localhost:3000/saveLogEntry', { title: 'Angular POST Request Example' }).subscribe(data => {
    
//})

    console.log("in fucking logentry dataService")
    console.log(this.insertLogURL)
    console.log("iscardio: " + iscardio)
   


    let body = { user: username, exercise: exercisename, iscardio: iscardio,setnumber: setnumber, weight:weight,reps:reps };
    return this.http.post<any>(this.insertLogURL, body, this.httpOptions).pipe(map((data) => {
      this.httpOptions.headers = this.httpOptions.headers.set('Authorization', data);
          return true;
    })
    );
    }
}
