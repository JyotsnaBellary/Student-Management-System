import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import moment, { Moment } from 'moment';
import { AttendanceService } from 'src/app/core/service/attendence/attendance.service';
import { Studentattendance } from '../../../../shared/entities/Attendence.entity';
import { Student } from '../../../../shared/entities/Student.entity';

@Component({
  selector: 'app-navigate-attendance',
  templateUrl: './navigate-attendance.component.html',
  styleUrls: ['./navigate-attendance.component.css']
})
export class NavigateAttendanceComponent implements OnInit, OnChanges {

  constructor( private attendanceService:AttendanceService) { }
  startDate:Moment = moment();
  endDate:Moment = moment();
  @Output() startDateEmit = new EventEmitter<Moment>();
  @Output() endDateEmit = new EventEmitter<Moment>();

  @Output() dateRangeEmitter = new EventEmitter<IDateRange>();
  // @Input() attendance!: Studentattendance;
  @Input() attendance: Studentattendance[] = [];
  currentDate!: string;
  monday!:Moment;
  currentWeekDate!: Moment;
  weeklyAttendence: Studentattendance[] = [];
  ngOnInit(): void {
    this.startDate = this.attendanceService.getStartOfWeek();
    this.endDate = this.attendanceService.getEndOfWeek();
    this.dateRangeEmitter.emit({startDate : this.startDate, endDate: this.endDate});
  }  

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes['attendance'].currentValue) {
      // this.weeklyAttendence = this.attendance;
      // this.currentWeekDate = moment(this.weeklyAttendence[0].attendance[0].date);
      console.log("attendance Changed", this.attendance)
      this.dateRangeEmitter.emit({startDate : this.startDate, endDate: this.endDate});

    // }
  }
  getNextWeek(){
    this.startDate = this.attendanceService.getNextWeekStart(moment(JSON.parse(JSON.stringify(this.startDate))));
    this.endDate = this.attendanceService.getNextWeekEnd(moment(JSON.parse(JSON.stringify(this.endDate))));
    this.dateRangeEmitter.emit({startDate : this.startDate, endDate: this.endDate});
  }
  getPreviousWeek(){
   
    this.startDate = this.attendanceService.getLastWeekStart(moment(JSON.parse(JSON.stringify(this.startDate))));
    this.endDate = this.attendanceService.getLastWeekEnd(moment(JSON.parse(JSON.stringify(this.endDate))));
    this.dateRangeEmitter.emit({startDate : this.startDate, endDate: this.endDate});
  }

 

 public  getOriginalDate (date: Moment) {
    return date ? new Date(date.format()) : ''
  }
}

export interface IDateRange {
  startDate: Moment;
  endDate: Moment;
}