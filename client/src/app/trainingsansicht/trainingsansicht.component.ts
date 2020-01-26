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

  startWorkout(): void{
  //@Kevin deine STopwatch einbauen"
}
}
