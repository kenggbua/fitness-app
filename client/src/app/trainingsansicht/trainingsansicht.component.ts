import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  constructor() { }

  ngOnInit() {
  }

  workoutOverview(): void {
  //let list: string[] = document.getElementsByClassName('label');
    //replace workoutname by Übungsname xD
    //anhängen von zusätzlichen Elementen wie gewicht und sätze
    //visibility von timer und play button ändern
}

  startWorkout(): void{
  //@Kevin deine STopwatch einbauen"
}
}
