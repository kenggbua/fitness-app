import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stopwatch } from "ts-stopwatch";
import {WorkoutService} from '../service/workout.service';

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



  constructor(private workout: WorkoutService) { }
  private sets :any[];

  ngOnInit() {

    this.stopwatch = new Stopwatch();
    this.timer = document.getElementById("timer");
    this.displaySets();

  }

   millisToMinutesAndSeconds(millis) : any {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    // @ts-ignore
     return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  startWorkout(): void{
    let interval;
    const icon = document.getElementById('play_btn');
    if(!this.stopwatch.isRunning()){
      icon.setAttribute('src', 'https://img.icons8.com/doodle/48/000000/circled-pause.png');
      this.stopwatch.start();
       interval = setInterval(() => {this.startTimer()}, 10);
    }else{
      icon.setAttribute('src', 'https://img.icons8.com/doodle/48/000000/circled-play.png');
      this.stopwatch.stop();
      clearInterval(interval);
    }


  }

  startTimer(): void {

      this.timer.innerHTML = this.millisToMinutesAndSeconds(this.stopwatch.getTime());

  }


  displaySets() {
    let id = 1;
    this.workout.getSets(id).subscribe((data) => {





     this.sets= [];

      for (let exercises of data) {

        let element = exercises.sets;
        console.log(exercises);

        for (let i=1; i<=element;i++)
        this.sets.push({"exercise_name" : exercises.exercise_name,
                        "setnumber" : i

        })


      }
      console.log(this.sets);



    });
  }
}
