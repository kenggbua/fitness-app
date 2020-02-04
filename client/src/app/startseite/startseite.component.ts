import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-startseite',
  templateUrl: './startseite.component.html',
  styleUrls: ['./startseite.component.css']
})
export class StartseiteComponent implements OnInit {
  private user;

  constructor(private dataservice: DataService) { }

  ngOnInit() {
    this.user = localStorage.getItem("u_name");
  }

  logout(): void {
    this.dataservice.logout();
  }
}
