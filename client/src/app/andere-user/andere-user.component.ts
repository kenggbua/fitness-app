import { Component, OnInit } from '@angular/core';
import {WorkoutService} from '../service/workout.service';
import { ActivatedRoute } from '@angular/router';
import {DataService} from '../service/data.service';

@Component({
  selector: 'app-andere-user',
  templateUrl: './andere-user.component.html',
  styleUrls: ['./andere-user.component.css']
})
export class AndereUserComponent implements OnInit {

  private allusers : any[];
  private userdata = localStorage.getItem("u_name");
  private friends : any[];
  private allFriendRequests : any[];




  constructor(private dataservice: DataService) { }

  ngOnInit() {
    this.dataservice.getFriends(this.userdata).subscribe(data => {
      this.friends = [];
      this.allFriendRequests = data;
      for(let friend of data){
        if(friend.u_name1 === this.userdata && friend.isconfirmed == true){
          this.friends.push(friend.u_name2);
        }else if(friend.u_name2 === this.userdata && friend.isconfirmed == true) this.friends.push(friend.u_name1);
      }
    })
    this.dataservice.getAllUser().subscribe((data) => {
      this.allusers = data;

      if(this.allFriendRequests.length === 0){
        this.allusers = this.allusers.filter(x => {
          return x.u_name !== this.userdata;
        })
      }

        for (let j = 0; j < this.allFriendRequests.length; j++) {
          this.allusers = this.allusers.filter( x => {
            return x.u_name !== this.allFriendRequests[j].u_name2 && x.u_name !== this.allFriendRequests[j].u_name1;
          })


        }





    })

  }

  addFriend(user2: string): void{

    let bool = false;

    for (let user of this.allFriendRequests){
      // @ts-ignore
      if(user2.u_name === user.u_name1 && this.userdata === user.u_name2){
        console.log("test")
        bool = true;
        // @ts-ignore
        this.dataservice.confirmFriend(user2.u_name,localStorage.getItem("u_name")).subscribe((data) => {return})
      }
    }

    if(!bool){
      // @ts-ignore
      this.dataservice.beFriend(localStorage.getItem("u_name"),user2.u_name).subscribe((data) => {return});
      const icon = document.getElementById('add_btn');
      icon.style.visibility = 'hidden';
    }




  }


}
