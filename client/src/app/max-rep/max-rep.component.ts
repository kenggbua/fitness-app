import { Component, OnInit } from '@angular/core';
import { OneRepMaxService } from '../service/onerepmax.service';

@Component({
  selector: 'app-max-rep',
  templateUrl: './max-rep.component.html',
  styleUrls: ['./max-rep.component.css']
})
export class MaxRepComponent implements OnInit {

  constructor(private onerepmaxservice : OneRepMaxService) { }

  private username = localStorage.getItem("u_name");
  private oneRepmax;
  ngOnInit() {
    this.getOneRepMax();
    
  }
  
  getOneRepMax() {
    this.onerepmaxservice.getOneRepMax(this.username).subscribe(data=>{
      this.oneRepmax = data; 
      console.log(this.oneRepmax); 
      for(let item of this.oneRepmax){
        console.log("name: " + item.exercise_name)
        console.log("Weight: " + item.max_weight)
      }   
    })
  }
}
