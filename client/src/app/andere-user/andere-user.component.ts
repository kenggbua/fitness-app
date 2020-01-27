import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-andere-user',
  templateUrl: './andere-user.component.html',
  styleUrls: ['./andere-user.component.css']
})
export class AndereUserComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  addFriend(): void{
    //TODO: add user to friendlist in DB
    const icon = document.getElementById('add_btn');
    icon.style.visibility = 'hidden';
  }
}
