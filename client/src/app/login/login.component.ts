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
      if(data == true) {
        this.router.navigate(['/login']);
      }
    });
  }

  checkLogin() {
    let username = <HTMLInputElement>document.getElementById("username");
    let password = <HTMLInputElement>document.getElementById("password");

    this.dataservice.loginUser(username.value, password.value).subscribe((data) => {
      if(data == true) {
        this.router.navigate(['/startseite']);
      } else {
        password.value = '';
        document.getElementById("out").style.display = "block";
      }
    });
  }

}
