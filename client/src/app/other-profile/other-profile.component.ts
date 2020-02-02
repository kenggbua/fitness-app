import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-other-profile',
  templateUrl: './other-profile.component.html',
  styleUrls: ['./other-profile.component.css']
})
export class OtherProfileComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    //TODO: load userdata depending on selected user
    //TODO: check if user set profile to private, then use following code:
    /*
     const height =<HTMLInputElement> document.getElementById('height');
    height.style.visibility = 'hidden';
    const weight = <HTMLInputElement>document.getElementById('weight');
    weight.style.visibility = 'hidden';
     */
  }
}
