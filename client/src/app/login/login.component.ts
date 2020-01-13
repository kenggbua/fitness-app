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
    this.dataservice.checkCookie().subscribe((data) => {
      console.log(data);
      if(data == true) {
        this.router.navigate(['/startseite']);
      }
    });
  }

  checkLogin() {
    let username = <HTMLInputElement>document.getElementById("username").value;
    let password = <HTMLInputElement>document.getElementById("password").value;

    this.dataservice.loginUser(username, password).subscribe((data) => {
      console.log(data);
      if(data == true) {
        this.router.navigate(['/startseite']);
      } else {
        document.getElementById("out").style.display = "block";
      }
    });
  }

}
