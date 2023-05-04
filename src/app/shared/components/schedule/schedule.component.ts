import { Component, OnInit } from '@angular/core';
import { IEntity } from '../../entities/Entity.entity';
import { Idaily, IStudentschedule, IStudentTimeTable, ITeacherschedule, ITeacherTimeTable } from '../../entities/schedule.entity';
import { ScheduleService } from 'src/app/core/service/crud/schedule/schedule.service';
import { AuthService } from 'src/app/core/service/crud/auth/auth.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  constructor(private scheduleService: ScheduleService, private authService: AuthService) { }

  stimeTable: IStudentTimeTable[]=[];
  teacherSchedule: ITeacherTimeTable[]=[];
  isUser!: string | null;
  details: IEntity | undefined;
  weekSchedule!: IStudentschedule;
  teachClass!: ITeacherschedule;
  ngOnInit(): void {
    this.scheduleService.getScheduleDetails().subscribe(res => {
      console.log(res)
      if(res.userRole === 'teacher'){
          let Monday : Idaily[] = []
          let tuesday : Idaily[] = []
          let Wednesday : Idaily[] = []
          let Thursday : Idaily[] = []
          let Friday : Idaily[] = []
          for(let i = 0; i< 7; i++){
            let Mondayarr: Idaily = {Class: res.scheduleData[0].Monday[i].Class , section: res.scheduleData[0].Monday[i].section}
            Monday.push(Mondayarr);
            let Tuesdayarr: Idaily = {Class: res.scheduleData[0].Tuesday[i].Class , section: res.scheduleData[0].Tuesday[i].section}
            tuesday.push(Tuesdayarr);
            let Wednesdayarr: Idaily = {Class: res.scheduleData[0].Wednesday[i].Class , section: res.scheduleData[0].Wednesday[i].section}
            Wednesday.push(Wednesdayarr);
            let Thursdayarr: Idaily = {Class: res.scheduleData[0].Thursday[i].Class , section: res.scheduleData[0].Thursday[i].section}
            Thursday.push(Thursdayarr);
            let Fridayarr: Idaily = {Class: res.scheduleData[0].Friday[i].Class , section: res.scheduleData[0].Friday[i].section}
            Friday.push(Fridayarr);
      
          }
          this.teachClass = {Monday:Monday, Tuesday:tuesday, Wednesday:Wednesday, Thursday:Thursday, Friday:Friday}          
      }
      else if(res.userRole === 'student'){
          console.log(res.scheduleData[0].Monday)
          this.weekSchedule = {Monday : res.scheduleData[0].Monday, Tuesday : res.scheduleData[0].Tuesday, Wednesday : res.scheduleData[0].Wednesday, Thursday : res.scheduleData[0].Thursday, Friday : res.scheduleData[0].Friday}
      }
    
    });
    
    

    
    // this.isUser = localStorage.getItem("user")
    // if(this.isUser === "student"){
    //   this.stimeTable = JSON.parse(localStorage.getItem("TimeTableList")!);
    //   this.details = JSON.parse(localStorage.getItem("studentDetails")!);
    //   for(var t of this.stimeTable){
    //     if(t.Class === this.details?.studentDetails?.class){
    //       if(t.section === this.details.studentDetails.section){
    //         this.weekSchedule = t.schedule
    //       }
    //     }
    //   }
    // }else if(this.isUser === "teacher"){
    //   // alert("teacher here")
    //   this.teacherSchedule = JSON.parse(localStorage.getItem("TeacherSchedule")!);
    //   this.details = JSON.parse(localStorage.getItem("teacherDetails")!);
    //   for(var ts of this.teacherSchedule){
    //     if(ts.specialization === this.details?.teacherDetails?.specialization){
    //       this.teachClass = ts.schedule;
    //     }

    //   }
    // }
    
  }

}
