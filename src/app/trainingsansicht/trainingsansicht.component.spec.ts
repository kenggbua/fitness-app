import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingsansichtComponent } from './trainingsansicht.component';

describe('TrainingsansichtComponent', () => {
  let component: TrainingsansichtComponent;
  let fixture: ComponentFixture<TrainingsansichtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingsansichtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingsansichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
