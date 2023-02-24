import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigateAttendanceComponent } from './navigate-attendance.component';

describe('NavigateAttendanceComponent', () => {
  let component: NavigateAttendanceComponent;
  let fixture: ComponentFixture<NavigateAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigateAttendanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigateAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
