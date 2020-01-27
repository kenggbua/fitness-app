import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  constructor(private dataservice: DataService) { }

  ngOnInit() {
    this.loadUserData();
  }

  settings(): void {
    // set text editable
   const height = document.getElementById('height');
   height.removeAttribute('disabled');
   const weight = document.getElementById('weight');
   weight.removeAttribute('disabled');

   // show save button
   const save = document.getElementById('save-btn');
   save.style.visibility = 'visible';
  }

  saveSettings(): void {
    // TODO: send data to DB

    // hide button
    const save = document.getElementById('save-btn');
    save.style.visibility = 'hidden';

    // make text non editable
    const height = document.getElementById('height');
    height.setAttribute('disabled', String(true));
    const weight = document.getElementById('weight');
    weight.setAttribute('disabled', String(true));
  }

  loadUserData() {
    this.dataservice.getUserData().subscribe((data) => {

    })
  }
}
