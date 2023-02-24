import { Component, OnInit } from '@angular/core';
import { IEntity } from '../../entities/Entity.entity';
import { IStudentschedule, IStudentTimeTable, ITeacherschedule, ITeacherTimeTable } from '../../entities/schedule.entity';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  constructor() { }

  stimeTable: IStudentTimeTable[]=[];
  teacherSchedule: ITeacherTimeTable[]=[];
  isUser!: string | null;
  details: IEntity | undefined;
  weekSchedule!: IStudentschedule;
  teachClass!: ITeacherschedule;
  ngOnInit(): void {
    this.isUser = localStorage.getItem("user")
    if(this.isUser === "student"){
      this.stimeTable = JSON.parse(localStorage.getItem("TimeTableList")!);
      this.details = JSON.parse(localStorage.getItem("studentDetails")!);
      for(var t of this.stimeTable){
        if(t.Class === this.details?.studentDetails?.class){
          if(t.section === this.details.studentDetails.section){
            this.weekSchedule = t.schedule
          }
        }
      }
    }else if(this.isUser === "teacher"){
      // alert("teacher here")
      this.teacherSchedule = JSON.parse(localStorage.getItem("TeacherSchedule")!);
      this.details = JSON.parse(localStorage.getItem("teacherDetails")!);
      for(var ts of this.teacherSchedule){
        if(ts.specialization === this.details?.teacherDetails?.specialization){
          this.teachClass = ts.schedule;
        }

      }
    }
    
  }

}
