import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stopwatch } from "ts-stopwatch";
import {WorkoutService} from '../service/workout.service';
import { Router, ActivatedRoute } from '@angular/router';

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



  constructor(private workout: WorkoutService,private route: ActivatedRoute, private router : Router) { }
  private sets :any[];
  private currentExercise;
  private exerciseCounter;
  private workout_id;

  ngOnInit() {

    

    this.stopwatch = new Stopwatch();
    this.timer = document.getElementById("timer");
    this.route.queryParams.subscribe(params=>{
      //workout id auslesen
      console.log(params[13])
      this.workout_id = params[13];
  
      console.log(this.workout_id)})
    this.initializeSets();

  }

   millisToMinutesAndSeconds(millis) : any {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    // @ts-ignore
     return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  //zeug das den Timer startet //soll eher log übergeben
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


  initializeSets() {
    this.workout.getSets(this.workout_id).subscribe((data) => {

     this.sets= [];
     this.exerciseCounter = 0;

      for (let exercises of data) {

        let element = exercises.sets;
        console.log(exercises);
        console.log(exercises.exercise_name);

        for (let i=1; i<=element;i++)
        this.sets.push({"exercise_name" : exercises.exercise_name,
                        "setnumber" : i
        })


      }
      console.log(this.sets);
      
      this.currentExercise = this.sets[0];
      console.log(this.currentExercise.exercise_name);
      console.log(this.currentExercise.setnumber);

    });
  }
  nextSet(): void{
    //hier noch log anlage adden
    console.log("TESTESTST")
    if(this.exerciseCounter <this.sets.length-1){
    this.exerciseCounter = this.exerciseCounter+1;
    this.currentExercise = this.sets[this.exerciseCounter];
    console.log(this.currentExercise);
  } else{
    //hier noch route ändern
    console.log("out of bound");
    this.router.navigate(['/startseite']);
  }
  }
}
