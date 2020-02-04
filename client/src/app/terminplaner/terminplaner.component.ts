import { Component, OnInit } from '@angular/core';
import {NotificationService} from '../service/notification.service';
import {CalenderService} from '../service/calender.service';

@Component({
  selector: 'app-terminplaner',
  templateUrl: './terminplaner.component.html',
  styleUrls: ['./terminplaner.component.css']
})
export class TerminplanerComponent implements OnInit {
  private db: any[];

  constructor(private notifyService: NotificationService, private calenderdata: CalenderService) {
  }
  // if(Date.now = dateFromEvent - 300000) showToastr(subject, startTime)

  ngOnInit() {
    // show all appointments for this user
    this.calenderdata.getSchedules().subscribe((data) => {
      this.db = data;
    });
  }

  showToastr(subject, start) {
    this.notifyService.showToast('Beginnt um ' + start, subject);
    // TODO remove eventFrom list
  }

  addEvent() {
    const subjectElem = document.getElementById('aSubject') as HTMLInputElement;
    const dateElem = document.getElementById('aDate') as HTMLInputElement;
    const startElem = document.getElementById('aStart') as HTMLInputElement;
    const subject = subjectElem.value;
    const date = dateElem.value;
    const start = startElem.value;

    // save data in db
    this.db.push({subject, date, start});

    // start timer for trigger toast
    console.log(date);
    console.log(start);
    const dateString = date + ' ' + start;
    console.log(dateString);
    const timeToShow = Date.parse(dateString) - 300000 - Date.now(); // show toast 5min before event
    setTimeout(() => this.showToastr(subject, start), timeToShow);

    (document.getElementById('aSubject') as HTMLInputElement).value = '';
    (document.getElementById('aDate') as HTMLInputElement).value = '';
    (document.getElementById('aStart') as HTMLInputElement).value = '';
    document.getElementById('addDate').style.visibility = 'hidden';

    console.log('Event hinzugefügt');

  }

  private abort() {
    (document.getElementById('aSubject') as HTMLInputElement).value = '';
    (document.getElementById('aDate') as HTMLInputElement).value = '';
    (document.getElementById('aStart') as HTMLInputElement).value = '';

    document.getElementById('addDate').style.visibility = 'hidden';
    console.log('element entfernt');
  }

  createListElement() {
    document.getElementById('addDate').style.visibility = 'visible';
  }


}
