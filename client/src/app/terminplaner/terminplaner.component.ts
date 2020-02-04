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
    //TODO remove eventFrom list
  }

  addEvent() {
    let subjectElem = <HTMLInputElement>document.getElementById("aSubject");
    let dateElem = <HTMLInputElement>document.getElementById("aDate");
    let startElem = <HTMLInputElement>document.getElementById("aStart");
    let subject = subjectElem.value;
    let date = dateElem.value;
    let start = startElem.value;

    // save data in db
    this.db.push({subject: subject, date: date, start:start});

    //start timer for trigger toast
    console.log(date);
    console.log(start);
    let dateString = date + ' ' +start;
    console.log(dateString);
    let timeToShow = Date.parse(dateString) - 300000; //show toast 5min before event
    setTimeout(() => this.showToastr(subject, start), timeToShow);

    (<HTMLInputElement>document.getElementById("aSubject")).value = "";
    (<HTMLInputElement>document.getElementById("aDate")).value = "";
    (<HTMLInputElement>document.getElementById("aStart")).value = "";
    document.getElementById("addDate").style.visibility = "hidden";

    console.log('Event hinzugefügt');

  }

  private abort() {
    (<HTMLInputElement>document.getElementById("aSubject")).value = "";
    (<HTMLInputElement>document.getElementById("aDate")).value = "";
    (<HTMLInputElement>document.getElementById("aStart")).value = "";

    document.getElementById("addDate").style.visibility = "hidden";
    console.log('element entfernt');
  }

  createListElement() {
    document.getElementById("addDate").style.visibility = "visible";
  }


}
