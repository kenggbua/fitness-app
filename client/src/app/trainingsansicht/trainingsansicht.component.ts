import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {WorkoutService} from '../service/workout.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../service/data.service';
import { OneRepMaxService } from '../service/onerepmax.service';

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
  private timeLeft;
  private timeString;
  private interval;
  private username = localStorage.getItem("u_name");



  constructor(
    private workout: WorkoutService,
    private route: ActivatedRoute,
    private router : Router,
    private dataservice: DataService,
    private onerepmaxservice : OneRepMaxService) { }


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
  startTimer(): void{
    this.buttonDisabled = true; 
    this.timeString = this.timeLeft = 3;
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeString=this.timeLeft--;
      } else {
        this.timeString = this.timeLeft = 3;
        clearInterval(this.interval);
        this.buttonDisabled = false;      
      }
    },1000)

  }
  initializeSets() {
    this.workout.getSets(this.workout_id).subscribe((workout) => {

     this.sets= [];
     this.exerciseCounter = 0;
      for (let exercises of workout) {
        let element = exercises.sets;
        for (let i=1; i<=element;i++)
        this.sets.push({"exercise_name" : exercises.exercise_name,
                        "setnumber" : i,
                        "iscardio" : exercises.iscardio
        })
      }
      console.log(this.sets);
      this.currentExercise = this.sets[0];
      this.iscardio = this.currentExercise.iscardio;
      if(!this.iscardio){
        this.timeString = this.timeLeft = 3
      }else {
        this.timeString = this.timeLeft = 0
      }
    });
  }
  nextSet(): void{   

    if(this.exerciseCounter <this.sets.length-1){
      if(!this.currentExercise.iscardio){
        this.startTimer();
      } 
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
       
    // Datum wird in Node.js erstellt
    //let options = { day: '2-digit', year: 'numeric', month: '2-digit' };
    //let today  = new Date();
    //Chinesische Reihenfolge, weil sie zum Postgres Format passt
    //let formattedDate = today.toLocaleDateString("zh-Hans-CN", options).replace(/[/:.-]+/gi, '-')
    //console.log(formattedDate);
     //reps, weight, duration
    if(!this.iscardio){
      this.weight =(<HTMLInputElement>document.getElementById("weightInput")).value;
      this.reps = (<HTMLInputElement>document.getElementById("repInput")).value;
      this.duration = null;
      console.log("weight: " + this.weight)
      console.log("reps: " +this.reps)
      let oneRepMax = this.onerepmaxservice.calculateOneRepMax(this.reps,this.weight);
      console.log("One REP MAX: "+ oneRepMax)
    } else {
      this.weight = null;
      this.reps = null;
      this.duration = (this.timeLeft/60).toFixed(2)
      console.log("duration: " + this.duration)
    }        
    this.dataservice.insertLogEntry(this.username,this.currentExercise.exercise_name,this.currentExercise.iscardio,this.currentExercise.setnumber,this.weight,this.reps,this.workout_id, this.duration).subscribe(data=>{
    });
  }


  startStopwatch():void{
    console.log("in stoppwatch")
    let timerButton = (<HTMLInputElement>document.getElementById("timer_btn"))
       
    if (timerButton.innerHTML =="Stoppuhr starten"){
      timerButton.innerHTML = "Stoppuhr stoppen"
      //timer starten
      this.timeString = this.timeLeft = 0;
      this.interval = setInterval(() => {        
          this.timeLeft = this.timeLeft+1
          if(this.timeLeft>60){
            let minutes = Math.floor(this.timeLeft/60)
            let seconds = this.timeLeft%60
            this.timeString = minutes + " : " + seconds
          } else{
            this.timeString = this.timeLeft
          }         
      },1000)
    }else if (timerButton.innerHTML == "Stoppuhr stoppen"){
      timerButton.innerHTML = "Cardio speichern"
      clearInterval(this.interval);
      //timer stoppen
    }else {
      console.log("im speichern")
      timerButton.innerHTML ="Stoppuhr starten"
     this.nextSet();
      //nächster satz
    }    
  }

}
