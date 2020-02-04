import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {WorkoutService} from '../service/workout.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../service/data.service';

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
  private timeLeft: number = 3;
  private interval;
  private username = localStorage.getItem("u_name");



  constructor(
    private workout: WorkoutService,
    private route: ActivatedRoute,
    private router : Router,
    private dataservice: DataService) { }


  private sets :any[];
  private currentExercise;
  private exerciseCounter;
  private workout_id;
  private buttonDisabled : boolean = false;
  private iscardio : boolean = false;
  private weight;
  private reps;
  private duration;

  ngOnInit() {

    this.route.queryParams.subscribe(params=>{
         this.workout_id = params[0];
    })
    this.initializeSets();
   
  }


  
  startWorkout(): void{
    this.buttonDisabled = true; 

    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 3;
        clearInterval(this.interval);
        this.buttonDisabled = false;      
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
        console.log(exercises.iscardio)

        for (let i=1; i<=element;i++)
        this.sets.push({"exercise_name" : exercises.exercise_name,
                        "setnumber" : i,
                        "iscardio" : exercises.iscardio
        })


      }
      console.log(this.sets);

      this.currentExercise = this.sets[0];
      this.iscardio = this.currentExercise.iscardio;
      console.log(this.currentExercise.exercise_name);
      console.log(this.currentExercise.setnumber);
      console.log(this.currentExercise.iscardio)

    });
  }
  nextSet(): void{
       
    if(this.exerciseCounter <this.sets.length-1){
    this.startWorkout(); 
    this.insertLogEntry();
    this.exerciseCounter = this.exerciseCounter+1;
    this.currentExercise = this.sets[this.exerciseCounter];
    this.iscardio = this.currentExercise.iscardio;

  } else{
    //hier noch route ändern
    this.insertLogEntry();
    console.log("last Exercise");
    this.router.navigate(['/startseite']);
  }
  }

  insertLogEntry(){
    let username = this.username;
    let exercisename = this.currentExercise.exercise_name;
    let iscardio = this.currentExercise.iscardio;
    let setnumber = this.currentExercise.setnumber
    let options = { day: '2-digit', year: 'numeric', month: '2-digit' };
    let today  = new Date();
    //Chinesische Reihenfolge, weil sie zum Postgres Format passt
    let formattedDate = today.toLocaleDateString("zh-Hans-CN", options).replace(/[/:.-]+/gi, '-')
    console.log(formattedDate);
     //reps and weight
    if(!this.iscardio){
      this.weight =(<HTMLInputElement>document.getElementById("weightInput")).value;
      this.reps = (<HTMLInputElement>document.getElementById("repInput")).value;
      this.duration = null;
      console.log("weight: " + this.weight)
      console.log("reps: " +this.reps)}
    else{
      this.weight = null;
      this.reps = null;
      this.duration = (<HTMLInputElement>document.getElementById("durationInput")).value;
      console.log("duration: " + this.duration)
    }
        
    this.dataservice.insertLogEntry(username,exercisename,iscardio,setnumber,this.weight,this.reps,this.workout_id, this.duration).subscribe(data=>{
    });
  }
}
