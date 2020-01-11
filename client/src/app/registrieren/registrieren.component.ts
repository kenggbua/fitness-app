import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-registrieren',
  templateUrl: './registrieren.component.html',
  styleUrls: ['./registrieren.component.css']
})
export class RegistrierenComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {}

  checkRegistration() {
    let email = <HTMLInputElement>document.getElementById("email");
    let username = <HTMLInputElement>document.getElementById("username");
    let password = <HTMLInputElement>document.getElementById("password");
    let password2 = <HTMLInputElement>document.getElementById("password2");

    if(password.value != password2.value) {
      password2.value = "";
      password2.setCustomValidity('Die Passwörter stimmen nicht überein!');
      return;
    }

    if(email.checkValidity() && username.checkValidity() && password.checkValidity()) {
      //Todo: check if email or username is already used
      //Todo: create new accout
      this.router.navigate(['/startseite']);
      return;
    }
  }

}
