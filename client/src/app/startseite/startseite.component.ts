import { Component, OnInit } from '@angular/core';
import { LogService } from '../service/log.service'

@Component({
  selector: 'app-startseite',
  templateUrl: './startseite.component.html',
  styleUrls: ['./startseite.component.css']
})
export class StartseiteComponent implements OnInit {
  private history: any[];

  constructor(private logservice: LogService) { }

  ngOnInit() {
    this.logservice.loadLastHistory(3).subscribe((data) => {
      console.log(data.data);

      this.history = data.data;
    });
  }

}
