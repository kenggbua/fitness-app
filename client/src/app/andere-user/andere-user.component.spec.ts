import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AndereUserComponent } from './andere-user.component';

describe('AndereUserComponent', () => {
  let component: AndereUserComponent;
  let fixture: ComponentFixture<AndereUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AndereUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AndereUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
