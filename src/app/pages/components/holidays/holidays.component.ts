import { Component, OnInit } from '@angular/core';
import { HolidayService } from 'src/app/core/service/crud/holiday/holiday.service';
import { IHoliday } from 'src/app/shared/entities/holiday.entity';
import holidays from 'src/assets/Dummy Data/Holidays.json';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.css']
})
export class HolidaysComponent implements OnInit {

  constructor( private holidayServicve: HolidayService) { }
  holidays: IHoliday[] = [];
  role!: string;
  ngOnInit(): void {
    // this.holidays = holidays;
    this.holidayServicve.getHolidayDetails().subscribe(res => {
      this.role = res.role;
      for(let i =0; i < res.holidays.length; i++){
      this.holidays.push({id:res.holidays[i]._id, day:res.holidays[i].day,date:res.holidays[i].date, holiday:res.holidays[i].holiday} as IHoliday);}
      console.log(res.holidays);
    });
  }

  editHoliday(id: string){
    this.holidayServicve.getHolidayDetailsForEdit(id).subscribe(res => {
      console.log(res.holiday)
    })
  }

}
