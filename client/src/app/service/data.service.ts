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
  private insertLogURL = this.serverURL + "saveLogEntry";
  private insertWorkoutFinURL = this.serverURL + "saveWorkoutFin";
  private getWorkoutFinIdUrl = this.serverURL + "getWorkoutFinId/";
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
    let url = this.userURL + "/" + localStorage.getItem("u_name");
    return this.http.patch<any>(url, user, this.httpOptions).pipe(
      catchError((error) => { return of(undefined); })
    );
  }

  logout(): void {
    localStorage.clear();
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', '');
  }

  getAllUser(): any{
    let getallUrl = "http://localhost:3000/user/allusers";
    return this.http.get(getallUrl, this.httpOptions).pipe(
      catchError((error) => { return of(undefined); })
    );
  }

  confirmFriend(user1: string, user2: string): any{
    let confirm = "http://localhost:3000/user/confirmfriend"
    let data = {user1: user1, user2:user2}
    return this.http.patch<any>(confirm, data, this.httpOptions).pipe(
      catchError((error) => { return of(undefined); })
    );
  }

  getFriends(user: string): any {

    let getfriendsURL= "http://localhost:3000/user/getfriends/" + user;
    return this.http.get<any>(getfriendsURL, this.httpOptions).pipe (
      catchError((error) => { return of(undefined); })
    );
  }

  beFriend(user1: string, user2: string): any {
    let insertFriend = "http://localhost:3000/user/addfriend";
    let data = {user1: user1, user2:user2};
    return this.http.post<any>(insertFriend,data, this.httpOptions).pipe(
      map((data) => {
        this.httpOptions.headers = this.httpOptions.headers.set('Authorization', data);
        return true;
      }));
  }

  removefriend(user1: string, user2: string) : any {
    let deleteFriend = "http://localhost:3000/user/removefriend/"+user1+"+"+user2;

    return this.http.delete<any>(deleteFriend,this.httpOptions).pipe(
      map((data) => {
        this.httpOptions.headers = this.httpOptions.headers.set('Authorization', data);
        return true;
      })
    )
  }

  insertLogEntry(workoutFin_id, exercisename, iscardio, setnumber,weight, reps, duration):any{

    console.log("in logentry dataService");
    console.log("iscardio: " + iscardio);
    console.log("duration: " + duration);

    let body = {workout_fin_id : workoutFin_id, exercise: exercisename, iscardio: iscardio, setnumber: setnumber, weight:weight, reps:reps, duration:duration };
    return this.http.post<any>(this.insertLogURL, body, this.httpOptions).pipe(map((data) => {
      this.httpOptions.headers = this.httpOptions.headers.set('Authorization', data);
          return true;
    }));
  }
  insertWorkoutFin(username,workout_id):any{

    console.log("in insertWorkoutFin dataService");
    console.log("username: " + username);
    console.log("workout_id: " + workout_id);

    let body = { u_name: username, workout_id : workout_id };
    return this.http.post<any>(this.insertWorkoutFinURL, body, this.httpOptions).pipe(map((data) => {
      this.httpOptions.headers = this.httpOptions.headers.set('Authorization', data);
          return true;
    })
    );
    }
    getWorkoutFinId(username): any {

      console.log("im get workoutFinId");
      console.log("username: " + username);

      return this.http.get<any>(this.getWorkoutFinIdUrl+username, this.httpOptions).pipe(map((data) => {
        this.httpOptions.headers = this.httpOptions.headers.set('Authorization', data);
            return data;
    }));
  }
}
