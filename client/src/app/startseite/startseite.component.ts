import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-startseite',
  templateUrl: './startseite.component.html',
  styleUrls: ['./startseite.component.css']
})
export class StartseiteComponent implements OnInit {

  constructor(private dataservice: DataService) { }

  ngOnInit() {
  }

  logout(): void {
    this.dataservice.deleteCookie();
  }
}
