import { Component, OnInit } from '@angular/core';
import {ToastrModule, ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-terminplaner',
  templateUrl: './terminplaner.component.html',
  styleUrls: ['./terminplaner.component.css']
})
export class TerminplanerComponent implements OnInit {

  constructor(private toastr: ToastrService) { }

  ngOnInit() {
  }

  showToastr(){
  this.toastr.info("Training um 15 Uhr", "Kalendereintrag");
  }
}
