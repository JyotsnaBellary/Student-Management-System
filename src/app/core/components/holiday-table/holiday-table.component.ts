import { Component, OnInit } from '@angular/core';
import { Holiday, IHoliday } from 'src/app/shared/entities/holiday.entity';
import holidays from "src/assets/Dummy Data/Holidays.json";
import { HolidayService } from '../../service/crud/holiday/holiday.service';
@Component({
  selector: 'app-holiday-table',
  templateUrl: './holiday-table.component.html',
  styleUrls: ['./holiday-table.component.css']
})
export class HolidayTableComponent implements OnInit {

  constructor(private holidayService: HolidayService) { }

  holidays: Holiday[] = [];
  nextHolidays: Holiday[] = [];
  ngOnInit(): void {
    // this.holidays = holidays
    this.holidayService.getHolidayDetails().subscribe(res => {
      this.holidays = res.holidays;
      console.log(this.holidays);
    });
  }
}
