import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private user;

  constructor(
    private router: Router,
    private location: Location,
    private dataservice: DataService
  ) { }

  ngOnInit() {
    this.user = localStorage.getItem("u_name");
  }

  back(): void {
    this.location.back();
  }

  logout(): void {
    this.dataservice.logout();
  }
}
