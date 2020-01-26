import { Component, OnInit } from '@angular/core';
import {WorkoutService} from '../service/workout.service';

@Component({
  selector: 'app-auswahl',
  templateUrl: './auswahl.component.html',
  styleUrls: ['./auswahl.component.css']
})
export class AuswahlComponent implements OnInit {

  private db : any[];


  constructor(  private workout: WorkoutService) {

  }

  ngOnInit() {


    this.workout.getWorkouts().subscribe((data) => {
      console.log(data)
      this.db = data;
    });

  }

}
