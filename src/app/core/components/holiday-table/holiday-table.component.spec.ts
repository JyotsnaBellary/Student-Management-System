import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Holiday } from 'src/app/shared/entities/holiday.entity';

import { HolidayTableComponent } from './holiday-table.component';

describe('HolidayTableComponent', () => {
  let component: HolidayTableComponent;
  let fixture: ComponentFixture<HolidayTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HolidayTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidayTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    let holidays: Holiday[] = JSON.parse(localStorage.getItem('HolidayList')!);
    expect(component).toBeTruthy();
    expect(component.holidays).toEqual(holidays)
  });
});
