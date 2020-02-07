import { Component, OnInit } from '@angular/core';
import { OneRepMaxService } from '../service/onerepmax.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {
  private ranking;
  private deadlift=[];
  private squat=[];
  private benchpress=[]; 
  private militarypress=[];
  private row=[];

  constructor(private onerepmaxservice : OneRepMaxService) { }

  ngOnInit() {
    this.initializeRanking()
  }

  initializeRanking(){
    this.onerepmaxservice.getRanking().subscribe(data=>{
      this.ranking = data;
      for (let item of data){
        console.log(item.exercise_name)
        console.log(item.u_name)
        console.log(item.max_weight)
    

        switch(item.exercise_name){
          case 'Deadlift':{
            this.deadlift.push({"exercise_name" : item.exercise_name,
            "u_name" : item.u_name,
            "weight" : item.max_weight
})
            break;
          }
          case 'Squat':{
            this.squat.push({"exercise_name" : item.exercise_name,
            "u_name" : item.u_name,
            "weight" : item.max_weight
})
            break;
          }
          case 'Bench Press':{
            this.benchpress.push({"exercise_name" : item.exercise_name,
            "u_name" : item.u_name,
            "weight" : item.max_weight
})
            break;
          }
          case 'Military Press':{
            this.militarypress.push({"exercise_name" : item.exercise_name,
            "u_name" : item.u_name,
            "weight" : item.max_weight
})
            break;
          }
          case 'Row':{
            this.row.push({"exercise_name" : item.exercise_name,
            "u_name" : item.u_name,
            "weight" : item.max_weight
})
            break;
          }
          default: break;
        }
      }
      console.log(this.deadlift)
      console.log(this.squat)
      console.log(this.benchpress)
      console.log(this.militarypress)
      console.log(this.row)
    })
  }


}
