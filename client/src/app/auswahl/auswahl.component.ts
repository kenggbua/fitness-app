import { Component, OnInit } from '@angular/core';
import {WorkoutService} from '../service/workout.service';
import { OneRepMaxService } from '../service/onerepmax.service';

@Component({
  selector: 'app-auswahl',
  templateUrl: './auswahl.component.html',
  styleUrls: ['./auswahl.component.css']
})
export class AuswahlComponent implements OnInit {
  private db : any[];

  constructor(  private workout: WorkoutService,
                private onerepmaxservice : OneRepMaxService) { }

  ngOnInit() {
    this.workout.getWorkouts().subscribe((data) => {
      this.db = data;
    });
    let username = localStorage.getItem('u_name')
    console.log("username vom local storage" + username)
    this.onerepmaxservice.initializeOneRepMax(username).subscribe();
  }

}
