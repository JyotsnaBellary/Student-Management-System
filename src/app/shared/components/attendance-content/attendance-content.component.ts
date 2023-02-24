import { Component, Input, OnInit, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Moment } from 'moment';
import { AttendanceService } from 'src/app/core/service/attendence/attendance.service';
import { AuthService } from 'src/app/core/service/auth/auth.service';
import { attendanceStatus, Studentattendance } from '../../entities/Attendence.entity';
import { IEntity } from '../../entities/Entity.entity';
import { Student } from '../../entities/Student.entity';
@Component({
  selector: 'app-attendance-content',
  templateUrl: './attendance-content.component.html',
  styleUrls: ['./attendance-content.component.css']
})
export class AttendanceContentComponent implements OnInit, OnChanges {

  constructor(private attendanceService: AttendanceService,
              private authService: AuthService, ) { }
  
  @Input() attendanceData: Studentattendance[] = [];
  
  form!: FormGroup;
  checked: boolean = true;
  date!: Date;
  startOfWeek!:Date;
  endOfWeek!:Date;
  
  ngOnInit(): void {
    this.date = new Date();
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  disable(d:Date) : boolean{
    d = new Date(d)
    if(d.toLocaleDateString() < this.date.toLocaleDateString() || d.toLocaleDateString() > this.date.toLocaleDateString()){
      return true;
    }else{
      return false;  
    }
  }
  
  isPresent(status:number){
    if(status == 1){
      return true;
    }
    return false;
  }
  calculateAttendance(attendance: attendanceStatus[]){
    return this.attendanceService.calculatePercentage(attendance);
  }
  onCheckboxChange(e: Event, id:string ,date:Date){
    if((<HTMLInputElement>e.target).checked){
    }else{
    }
  }

}
