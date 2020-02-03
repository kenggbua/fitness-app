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
  private timeLeft: number = 3;
  private interval;



  constructor(private workout: WorkoutService,private route: ActivatedRoute, private router : Router) { }
  private sets :any[];
  private currentExercise;
  private exerciseCounter;
  private workout_id;

  ngOnInit() {

    this.route.queryParams.subscribe(params=>{
      //workout id auslesen
      console.log(params[13])
      this.workout_id = params[13];

      console.log(this.workout_id)})
    this.initializeSets();

  }


  //zeug das den Timer startet //soll eher log übergeben
  startWorkout(): void{


    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 3;
        clearInterval(this.interval);
      }
    },1000)

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
    this.startWorkout();
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
