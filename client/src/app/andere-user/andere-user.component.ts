import { Component, OnInit } from '@angular/core';
import {WorkoutService} from '../service/workout.service';
import { ActivatedRoute } from '@angular/router';
import {DataService} from '../service/data.service';
import {timeout} from 'rxjs/operators';

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
  private friendRequests : any[];




  constructor(private dataservice: DataService) { }

  ngOnInit() {

    this.updateLists();


  }

  updateLists() : void {
    this.dataservice.getFriends(this.userdata).subscribe(data => {
      this.friends = [];
      this.allFriendRequests = data;
      for(let friend of data){
        if(friend.u_name1 === this.userdata && friend.isconfirmed == true){
          this.friends.push(friend.u_name2);
        }else if(friend.u_name2 === this.userdata && friend.isconfirmed == true) this.friends.push(friend.u_name1);
      }
      this.dataservice.getAllUser().subscribe((data) => {
        this.allusers = data;
        this.friendRequests = [];


        this.allusers = this.allusers.filter(x => {
          return x.u_name !== this.userdata;
        });


        for (let request of this.allFriendRequests){
          if(!this.userdata.localeCompare(request.u_name2) && !request.isconfirmed){
            this.friendRequests.push(request);
          }
        }


        for (let t of this.allFriendRequests){
          if(!this.userdata.localeCompare(t.u_name2)){
            this.allusers = this.allusers.filter( x => {
              return x.u_name.localeCompare(t.u_name1);
            })
          }else this.allusers = this.allusers.filter( x => {
            return x.u_name.localeCompare(t.u_name2);
          })
        }

      })
    })




  }

  addFriend(user2: string): void{

    let bool = false;

    for (let user of this.allFriendRequests){
      // @ts-ignore
      if(user2 === user.u_name1 && this.userdata === user.u_name2){
        bool = true;
        // @ts-ignore
        this.dataservice.confirmFriend(user2,localStorage.getItem("u_name")).subscribe((data) => {
          return})
        this.updateLists();
      }
    }

    if(!bool){
      // @ts-ignore
      this.dataservice.beFriend(localStorage.getItem("u_name"),user2).subscribe((data) => {return});
      this.updateLists();
      const icon = document.getElementById('add_btn');
      icon.style.visibility = 'hidden';
    }

  }

  removeFriend(user2: string): void{

    if(confirm("Freund "+ user2 +" entfernen?")){
      this.dataservice.removefriend(this.userdata,user2).subscribe((data) => {return});
      this.updateLists();
    }

  }


}
