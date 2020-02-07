import { Component, OnInit } from '@angular/core';
import { OneRepMaxService } from '../service/onerepmax.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-max-rep',
  templateUrl: './max-rep.component.html',
  styleUrls: ['./max-rep.component.css']
})
export class MaxRepComponent implements OnInit {

  constructor(private onerepmaxservice : OneRepMaxService,
    private route: ActivatedRoute) { }

  private username = localStorage.getItem("u_name");
  private otherusername;
  private oneRepmax;
  private maxRepuser;
  ngOnInit() {

    

    
    this.route.queryParams.subscribe(params=>{
      this.otherusername = params[0];
      console.log(this.otherusername)
      console.log(this.username)
      this.getOneRepMax();
 })
   
    
  }
  
  getOneRepMax() {
    if (this.username == this.otherusername){
      this.maxRepuser = this.username
    } else {
      this.maxRepuser = this.otherusername
    }

    this.onerepmaxservice.getOneRepMax(this.maxRepuser).subscribe(data=>{
      this.oneRepmax = data; 
      console.log(this.oneRepmax); 
      for(let item of this.oneRepmax){
        console.log("name: " + item.exercise_name)
        console.log("Weight: " + item.max_weight)
      }   
    })
  }
}
