import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AttendanceContentComponent } from './attendance-content.component';

describe('AttendanceContentComponent', () => {
  let component: AttendanceContentComponent;
  let fixture: ComponentFixture<AttendanceContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendanceContentComponent ],
      imports:[RouterTestingModule.withRoutes([])],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // console.log(component.date, "date")
    component.ngOnInit();
    expect(component).toBeTruthy();
  });
});
