import { Component, OnInit } from '@angular/core';
import {NotificationService} from '../service/notification.service';
import {CalenderService} from '../service/calender.service';

@Component({
  selector: 'app-terminplaner',
  templateUrl: './terminplaner.component.html',
  styleUrls: ['./terminplaner.component.css']
})
export class TerminplanerComponent implements OnInit {
  private allTermins: any[];
  private username = localStorage.getItem("u_name");

  constructor(
    private notifyService: NotificationService,
    private calenderdata: CalenderService) { }

  ngOnInit() {
    // show all appointments for this user
    this.updateLists();
  }

  updateLists(): void{
    this.calenderdata.getSchedules(this.username).subscribe((data) => {
      console.log(data);
      this.allTermins = data.data;
    });
  }

  showToastr(subject, start) {
    this.notifyService.showToast('Beginnt um ' + start, subject);
  }

  addEvent() {
    const subjectElem = document.getElementById('aSubject') as HTMLInputElement;
    const dateElem = document.getElementById('aDate') as HTMLInputElement;
    const startElem = document.getElementById('aStart') as HTMLInputElement;
    const subject = subjectElem.value;
    const date = dateElem.value;
    const start = startElem.value;

    // save data in db
    this.calenderdata.insertCalenderEntry(this.username, subject, date, start).subscribe((data) => {
      if (data) {
        console.log('saving termin succeeded');
      } else {
        console.log('saving termin failed');
      }
      this.updateLists();
    });
    
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
