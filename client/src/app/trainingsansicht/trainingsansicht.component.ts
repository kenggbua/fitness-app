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
  private userdata;



  constructor(
    private workout: WorkoutService,
    private route: ActivatedRoute,
    private router : Router,
    private dataservice: DataService) { }


  private sets :any[];
  private currentExercise;
  private exerciseCounter;
  private workout_id;

  ngOnInit() {

    this.route.queryParams.subscribe(params=>{
      //workout id aus params auslesen
    console.log(params[0])
    this.workout_id = params[0];
    })
    this.initializeSets();

    this.loadUserData();

    console.log(this.userdata)

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
        console.log(exercises.iscardio)

        for (let i=1; i<=element;i++)
        this.sets.push({"exercise_name" : exercises.exercise_name,
                        "setnumber" : i,
                        "iscardio" : exercises.iscardio
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
    this.insertLogEntry();
    if(this.exerciseCounter <this.sets.length-1){
    this.exerciseCounter = this.exerciseCounter+1;
    this.currentExercise = this.sets[this.exerciseCounter];
    //console.log(this.currentExercise);



  } else{
    //hier noch route ändern
    this.insertLogEntry();
    console.log("out of bound");
    this.router.navigate(['/startseite']);
  }
  }
  loadUserData() {
    this.dataservice.getUserData().subscribe((data) => {
      this.userdata = data.data;
      console.log(this.userdata);
      console.log(this.userdata.u_name);
    })
  }

  insertLogEntry(){
    //username, exercisename, setnumber, date
    let username = this.userdata.u_name;
    let exercisename = this.currentExercise.exercise_name;
    let iscardio = this.currentExercise.iscardio;
    let setnumber = this.currentExercise.setnumber
    let options = { day: '2-digit', year: 'numeric', month: '2-digit' };
    let today  = new Date();
    //Chinesische Reihenfolge, weil sie zum Postgres Format passt
    let formattedDate = today.toLocaleDateString("zh-Hans-CN", options).replace(/[/:.-]+/gi, '-')
    console.log(formattedDate);
     //reps and weight
    let weight =(<HTMLInputElement>document.getElementById("weightInput")).value;
    let reps = (<HTMLInputElement>document.getElementById("repInput")).value;
    console.log("weight: " + weight)
    console.log("reps: " +reps)


    this.dataservice.insertLogEntry(username,exercisename,iscardio,setnumber,weight,reps).subscribe(data=>{

    });

  }
}
