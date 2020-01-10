import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingszusammenfassungComponent } from './trainingszusammenfassung.component';

describe('TrainingszusammenfassungComponent', () => {
  let component: TrainingszusammenfassungComponent;
  let fixture: ComponentFixture<TrainingszusammenfassungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingszusammenfassungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingszusammenfassungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
