import { Component, OnInit } from '@angular/core';
import { IHoliday } from 'src/app/shared/entities/holiday.entity';
import holidays from 'src/assets/Dummy Data/Holidays.json'
@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.css']
})
export class HolidaysComponent implements OnInit {

  constructor() { }
  Holidays: IHoliday[] = [];
  ngOnInit(): void {
    // alert(storedNames[0]['Name']);
    this.Holidays = holidays;
  }

}
