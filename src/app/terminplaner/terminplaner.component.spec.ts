import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminplanerComponent } from './terminplaner.component';

describe('TerminplanerComponent', () => {
  let component: TerminplanerComponent;
  let fixture: ComponentFixture<TerminplanerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerminplanerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminplanerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
