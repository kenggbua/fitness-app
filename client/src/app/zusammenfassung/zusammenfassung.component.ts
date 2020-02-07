import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {WorkoutService} from '../service/workout.service';

@Component({
  selector: 'app-zusammenfassung',
  templateUrl: './zusammenfassung.component.html',
  styleUrls: ['./zusammenfassung.component.css']
})
export class ZusammenfassungComponent implements OnInit {
  private workouts: any[];
  private sumweight: number;

  constructor(
    private route: ActivatedRoute,
    private workoutservice: WorkoutService
  ) { }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');
    this.workoutservice.getFinishedWorkout(id).subscribe((data) => {
      this.workouts = data.data;
      this.calculateSumweight();
    });
  }

  calculateSumweight() {
    this.sumweight = 0;
    for (let element of this.workouts) {
      this.sumweight += element.weight;
    }
  }

}
