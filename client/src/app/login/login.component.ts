import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private dataservice: DataService
  ) { }

  ngOnInit() {
  }

  checkLogin() {
    let username = <HTMLInputElement>document.getElementById("username").value;
    let password = <HTMLInputElement>document.getElementById("password").value;

    this.dataservice.loginUser(username, password).subscribe((data) => {
      if(data == false) {
        document.getElementById("out").style.display = "block";
      } else {
        this.router.navigate(['/startseite']);
      }
    })
    // if(this.dataservice.loginUser(username, password)) {
    //   this.router.navigate(['/startseite']);
    // } else {
    //   document.getElementById("out").style.display = "block";
    // }
  }

}
