import { Component, OnInit } from '@angular/core';
import {NotificationService} from '../service/notification.service';
import {CalenderService} from '../service/calender.service';

@Component({
  selector: 'app-terminplaner',
  templateUrl: './terminplaner.component.html',
  styleUrls: ['./terminplaner.component.css']
})
export class TerminplanerComponent implements OnInit {
  private db : any[];
  constructor(private notifyService: NotificationService, private calenderdata: CalenderService) {
  }


  // if(Date.now = dateFromEvent - 300000) showToastr(subject, startTime)

  ngOnInit() {
    //show all appointments for this user
    this.calenderdata.getSchedules().subscribe((data) => {
      this.db = data;
    });
  }

  showToastr() {
    this.notifyService.showToast('startTime', 'subject');
  }

  getDatetime(): number {
    return Date.now();
  }

  addEvent() {
  console.log('Event hinzugefügt');

  }

  private abort() {

  }

  createListElement(){
    const listElement = document.createElement('div');
    listElement.setAttribute('class', 'listElement');
    listElement.style.backgroundColor = 'gray';
    listElement.style.borderRadius = '3px';
    listElement.style.width = '300px';

    const subjectP = document.createElement('p');
    subjectP.innerText = 'Titel: ';
    const subjectInput = document.createElement('input');
    subjectInput.setAttribute('class', 'inputFields');
    subjectP.appendChild(subjectInput);

    const dateP = document.createElement('p');
    dateP.innerText = 'Datum: ';
    const dateInput = document.createElement('input');
    dateInput.setAttribute('class', 'inputFields');
    dateP.appendChild(dateInput);

    const startP = document.createElement('p');
    startP.innerText = 'Uhrzeit: ';
    const startInput = document.createElement('input');
    startInput.setAttribute('class', 'inputFields');
    startP.appendChild(startInput);

    const saveBtn = document.createElement('button');
    saveBtn.setAttribute('id', 'save-btn');
    saveBtn.innerText = 'Hinzufügen';
    saveBtn.addEventListener('click', (e) => this.addEvent());

    const abortBtn = document.createElement('button');
    abortBtn.setAttribute('id', 'abort-btn');
    abortBtn.innerText = 'Abbrechen';
    abortBtn.addEventListener('click', (e) => this.abort());

    listElement.appendChild(subjectP);
    listElement.appendChild(dateP);
    listElement.appendChild(startP);
    listElement.appendChild(saveBtn);

    const list = document.getElementById('list');
    list.appendChild(listElement);
  }


}
