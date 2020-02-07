import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../service/data.service';


@Component({
  selector: 'app-registrieren',
  templateUrl: './registrieren.component.html',
  styleUrls: ['./registrieren.component.css']
})
export class RegistrierenComponent implements OnInit {

  constructor(
    private router: Router,
    private dataservice: DataService
  ) { }

  ngOnInit() {
  }

  checkRegistration() {
    let email = <HTMLInputElement>document.getElementById("email");
    let username = <HTMLInputElement>document.getElementById("username");
    let password = <HTMLInputElement>document.getElementById("password");
    let password2 = <HTMLInputElement>document.getElementById("password2");
    let out = <HTMLInputElement>document.getElementById("out");
    let error = "";

    if(!email.checkValidity()) {
      error = error + "Die Email Adresse ist nicht gültig.\n";
    }
    if(!username.checkValidity()) {
      error = error + "Der Username ist nicht gültig. Ein Username muss zwischen 5 & 20 Zeichen lang sein und besteht nur aus Buchstaben und _.\n";
    }
    if(!password.checkValidity()) {
      error = error + "Das Passwort ist nicht gültig. Das Passwort muss zwischen 8 & 20 Zeichen lang sein, mindestens 1 Groß- und Kleinbuchstaben sowie ein Sonderzeichen enthalten.\n";
    }
    if (password.value != password2.value) {
      password2.value = "";
      error = error + 'Die Passwörter stimmen nicht überein!';
    }
    if(error != "") {
      out.innerHTML = error;
      out.style.display = "block";
      return;
    }

    if (email.checkValidity() && username.checkValidity() && password.checkValidity()) {
      //Todo: check if email or username is already used
      //Todo: create new accout

      this.dataservice.registerUser(email.value, username.value, password.value)
        .subscribe((data) => {
          if (data == true) {
            this.router.navigate(['/startseite']);
            return;
          } else if (data == "email alredy used") {
            out.innerHTML = "Die Email-Adresse ist bereits vergeben.";
          } else if (data == "username already used") {
            out.innerHTML = "Der username wird bereits verwendet.";
          } else {
            out.innerHTML = data;
          }
          out.style.display = "block";
        });

        
    return;
  }
}

}
