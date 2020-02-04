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
    this.notifyService.showToast('Beginnt um ' + start.innerHTML, subject.innerHTML);
    //TODO remove eventFrom list
  }

  getDatetime(): number {
    return Date.now();
  }

  addEvent() {
    let subject = <HTMLInputElement>document.getElementById("aSubject");
    let date = <HTMLInputElement>document.getElementById("aDate");
    let start = <HTMLInputElement>document.getElementById("aStart");

    // save data in db
    this.db.push({subject: subject.value, date: date.value, start:start.value});

    (<HTMLInputElement>document.getElementById("aSubject")).value = "";
    (<HTMLInputElement>document.getElementById("aDate")).value = "";
    (<HTMLInputElement>document.getElementById("aStart")).value = "";
    document.getElementById("addDate").style.visibility = "hidden";

    //start timer for trigger toast
    let dateString = date.innerHTML + start.innerHTML;
    let timeToShow = Date.parse(dateString) - 300000; //show toast 5min before event
    setTimeout(() => this.showToastr(subject, start), timeToShow);

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
