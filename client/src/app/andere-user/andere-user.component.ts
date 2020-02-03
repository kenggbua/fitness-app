import { Component, OnInit } from '@angular/core';
import {WorkoutService} from '../service/workout.service';
import {DataService} from '../service/data.service';

@Component({
  selector: 'app-andere-user',
  templateUrl: './andere-user.component.html',
  styleUrls: ['./andere-user.component.css']
})
export class AndereUserComponent implements OnInit {

  private db : any[];
  private userdata;


  constructor(private dataservice: DataService) { }

  ngOnInit() {
    this.loadUserData();
    this.dataservice.getAllUser().subscribe((data) => {
      this.db = data;
    })
  }

  addFriend(user2: string): void{

    let user = this.userdata.u_name;
    console.log(user);

    // @ts-ignore
    console.log(user2.u_name);

    // @ts-ignore
    this.dataservice.beFriend(user,user2.u_name).subscribe((data) => {return});

    const icon = document.getElementById('add_btn');
    icon.style.visibility = 'hidden';
  }

  loadUserData() {
    this.dataservice.getUserData().subscribe((data) => {
      this.userdata = data.data;
    })
  }
}
