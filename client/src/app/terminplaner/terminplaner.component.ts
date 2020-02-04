import { Component, OnInit } from '@angular/core';
import {NotificationService} from '../service/notification.service';
import { EventSettingsModel} from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-terminplaner',
  templateUrl: './terminplaner.component.html',
  styleUrls: ['./terminplaner.component.css']
})
export class TerminplanerComponent implements OnInit {

  constructor(private notifyService: NotificationService) {
  }
  public eventData: EventSettingsModel = {
    dataSource: [{
      // TODO: Replace this dummy data through data from db
      Id: 1,
      Subject: 'Training1',
      StartTime: new Date(2020, 2, 3, 9, 0),
      EndTime: new Date(2020, 2, 3, 11, 0)
    }]
  };

  // if(Date.now = dateFromEvent - 300000) showToastr(subject, startTime)

  ngOnInit() {}

  showToastr() {
    this.notifyService.showToast('startTime', 'subject');
  }

  getDatetime(): number {
    return Date.now();
  }
}
