import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Holiday } from 'src/app/shared/entities/holiday.entity';
import { HttpClientModule } from '@angular/common/http';
import { HolidayTableComponent } from './holiday-table.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('HolidayTableComponent', () => {
  let component: HolidayTableComponent;
  let fixture: ComponentFixture<HolidayTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule.withRoutes([])],
      declarations: [ HolidayTableComponent ],
      providers: []
    })
    .compileComponents();
    fixture = TestBed.createComponent(HolidayTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(HolidayTableComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  it('should create', () => {
    let holidays: Holiday[] = JSON.parse(localStorage.getItem('HolidayList')!);
    expect(component).toBeTruthy();
    console.log(component)
    // expect(component.holidays).toEqual(holidays)
  });
});
