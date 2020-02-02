import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  private userdata;

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

   //TODO show visibility settings
   const visibility = document.getElementsByClassName('visibility');


   // show save button
   const save = document.getElementById('save-btn');
   save.style.visibility = 'visible';
  }

  saveSettings(): void {
    // hide button
    const save = document.getElementById('save-btn');
    save.style.visibility = 'hidden';

    // TODO hide visibility settings
    const visibility = document.getElementsByClassName('visibility');
    //TODO: save settings

    // make text non editable
    const height = document.getElementById('height') as HTMLInputElement;
    height.setAttribute('disabled', String(true));
    const weight = document.getElementById('weight') as HTMLInputElement;
    weight.setAttribute('disabled', String(true));

    this.userdata.weight = weight.value;
    this.userdata.height = height.value;

    this.dataservice.saveUserData(this.userdata).subscribe((data) => {
      if (data) {
        console.log('saving data succeeded');
      } else {
        console.log('saving data failed');

      }

    });
  }

  loadUserData() {
    this.dataservice.getUserData().subscribe((data) => {
      this.userdata = data.data;
    });
  }
}
