import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrierenComponent } from './registrieren.component';

describe('RegistrierenComponent', () => {
  let component: RegistrierenComponent;
  let fixture: ComponentFixture<RegistrierenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrierenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrierenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
