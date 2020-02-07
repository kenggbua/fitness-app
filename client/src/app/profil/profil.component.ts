import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  private userdata;
  private myUser;

  constructor(
    private route: ActivatedRoute,
    private dataservice: DataService
  ) { }

  ngOnInit() {
    this.loadUserData();
  }

  settings(): void {
    let settingBtn = <HTMLInputElement>document.getElementById('settings-btn');
    if (settingBtn.value === 'Einstellungen') {
      // set text editable
      document.getElementById('height').removeAttribute('disabled');
      document.getElementById('weight').removeAttribute('disabled');
      document.getElementById('visibility').removeAttribute('disabled');

      // show save button
      settingBtn.value = 'Speichern';
    } else {
      this.saveSettings();
      settingBtn.value = 'Einstellungen';
    }
  }

  saveSettings(): void {
    // make text non editable
    let height = document.getElementById('height') as HTMLInputElement;
    height.setAttribute('disabled', String(true));
    let weight = document.getElementById('weight') as HTMLInputElement;
    weight.setAttribute('disabled', String(true));
    let visibility = document.getElementById('visibility') as HTMLInputElement;
    visibility.setAttribute('disabled', String(true));

    this.userdata.weight = weight.value;
    this.userdata.height = height.value;
    this.userdata.visible = visibility.value;

    // save settings
    this.dataservice.saveUserData({ weight: weight.value, height: height.value, visible: visibility.value }).subscribe((data) => {
      if (data) {
        console.log('saving data succeeded');
      } else {
        console.log('saving data failed');
      }
    });
  }

  loadUserData() {
    let username = this.route.snapshot.paramMap.get('username');
    this.dataservice.getUserData(username).subscribe((data) => {
      this.userdata = data.data;
      let visibility = (<HTMLInputElement>document.getElementById('visibility')).value = this.userdata.visible;
      if (this.userdata.u_name === localStorage.getItem("u_name")) {
        this.myUser = true;
      }
    });
  }
}
