import { Component, Input, OnInit, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup,  ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Moment } from 'moment';
// import { AttendanceService } from 'src/app/core/service/attendence/attendance.service';
import { AuthService } from 'src/app/core/service/auth/auth.service';
import { AttendanceStatus, Studentattendance } from '../../../../shared/entities/Attendence.entity';
import { IEntity } from '../../../../shared/entities/Entity.entity';
import { Student } from '../../../../shared/entities/Student.entity';
import { AttendanceService } from 'src/app/core/service/crud/attendance/attendance.service';
@Component({
  selector: 'app-attendance-content',
  templateUrl: './attendance-content.component.html',
  styleUrls: ['./attendance-content.component.css']
})
export class AttendanceContentComponent implements OnInit, OnChanges {

  constructor(private attendanceService: AttendanceService,
              private authService: AuthService, ) { }
  
  @Input() attendanceData: Studentattendance[] = [];
  @Input() filter: string = '';
  @Input() role: string = '';
  
  form!: FormGroup;
  checked: boolean = true;
  date! : Date;
  startOfWeek!:Date;
  endOfWeek!:Date;
  attendance: Studentattendance[] = [];
  toUpdate: Studentattendance[] = [];
  ngOnInit(): void {
    this.date = new Date();
    this.attendance = this.attendanceData;
    // console.log(this.attendanceData);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.attendance = this.attendanceData
    // console.log(this.filter);
  }

  save(){
    console.log("saving")
    this.attendanceService.save(this.toUpdate)
  }
  disable(d:Date) : boolean{
    d = new Date(d)
    if(d.toLocaleDateString() < this.date.toLocaleDateString() || d.toLocaleDateString() > this.date.toLocaleDateString()){
      return true;
    }else if(this.role === "student"){
      return true;
    }
    else{
      return false;  
    }
  }
  
  isPresent(status:number){
    if(status == 1){
      return true;
    }
    return false;
  }
  calculateAttendance(attendance: AttendanceStatus[]){
    return this.attendanceService.calculatePercentage(attendance);
  }
  onCheckboxChange(e: Event, id:string ,date:Date){
    let attendanceStatus: AttendanceStatus[] = [];
    if((<HTMLInputElement>e.target).checked){
      console.log(date)
      if(this.toUpdate.findIndex(e => e.studentId === id) >= 0){
        this.toUpdate[this.toUpdate.findIndex(each => each.studentId === id)]
      .attendance[0].status = 1;
      }
      else{
        console.log("index not found")
        this.attendanceData[this.attendanceData.findIndex(each => each.studentId === id)]
        .attendance[this.attendanceData[this.attendanceData.findIndex(each => each.studentId === id)]
        .attendance.findIndex(each => each.date === date)].status = 1;
        attendanceStatus.push(new AttendanceStatus(date.toString(), 1 ))
        this.toUpdate.push(new Studentattendance(id, attendanceStatus))
      }
    }else{
      if(this.toUpdate.findIndex(e => e.studentId === id) >= 0){
        this.toUpdate[this.toUpdate.findIndex(each => each.studentId === id)]
      .attendance[0].status = 2;
      }
      else{
        this.attendanceData[this.attendanceData.findIndex(each => each.studentId === id)]
        .attendance[this.attendanceData[this.attendanceData.findIndex(each => each.studentId === id)]
        .attendance.findIndex(each => each.date === date)].status = 2;
        attendanceStatus.push(new AttendanceStatus(date.toString(), 2 ))
        this.toUpdate.push(new Studentattendance(id, attendanceStatus))
      }
      
    }
  }

 

}
