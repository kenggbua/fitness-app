import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stopwatch } from "ts-stopwatch";

@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) { }
}

@Component({
  selector: 'app-trainingsansicht',
  templateUrl: './trainingsansicht.component.html',
  styleUrls: ['./trainingsansicht.component.css']
})


export class TrainingsansichtComponent implements OnInit {
  private timer: any;
  private stopwatch: Stopwatch;



  constructor() { }


  ngOnInit() {

    this.stopwatch = new Stopwatch();
    this.timer = document.getElementById("timer");

  }

   millisToMinutesAndSeconds(millis) : any {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    // @ts-ignore
     return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  startWorkout(): void{
    let interval;

    if(!this.stopwatch.isRunning()){
      this.stopwatch.start();
       interval = setInterval(() => {this.startTimer()}, 10);
    }else{
      this.stopwatch.stop();
      clearInterval(interval);
    }


  }

  startTimer(): void {

      this.timer.innerHTML = this.millisToMinutesAndSeconds(this.stopwatch.getTime());

  }


}
