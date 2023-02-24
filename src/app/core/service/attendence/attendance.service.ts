import { Injectable } from '@angular/core';
import { Attendance, attendanceStatus, iattendanceStatus, iStudentattendance, Studentattendance } from 'src/app/shared/entities/Attendence.entity';
import attendance from 'src/assets/Dummy Data/Attendence.json'
import moment, { Moment } from 'moment';
import { Student } from 'src/app/shared/entities/Student.entity';
import { BehaviorSubject, last } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

 private date = new BehaviorSubject(moment());
 currentDate = this.date.asObservable();

  constructor() { }
  attendanceList: Attendance[] = attendance;
  status!: attendanceStatus;
  getStudentattendance(Class:string, section:string, studentId:string){
  var studentAttendance: attendanceStatus[] = [];

    for(var classList of this.attendanceList){
      if(classList.Class === Class && classList.section === section){
        for(var each of classList.students){
          if(each.studentId === studentId){
            for(var statuses of each.attendance){
              studentAttendance.push(new attendanceStatus(statuses.date, statuses.status));
            }
            break;
          }
        } break;
      }
  } 
  return studentAttendance;
}

  updateApprovalMessage(date: Moment) {
    this.date.next(date)
  }

  calculatePercentage(attendance?:attendanceStatus[], studentsOfClass?: Student[]){
    var count:number = 0;
    var percentage: number = 0;
    if(attendance){
    for(var each of attendance){
      if(each.status === 1){
        percentage += each.status
        count += 1;
      }else if(each.status === 3){
        continue
      }else{
        count += 1;
      }
    }
    return  parseFloat(String(percentage/count * 100)).toFixed(2);}
    else if(studentsOfClass) {
      for (var student of studentsOfClass){
        var percenetage = this.calculatePercentage(student.attendanceList)
      }
    }
    return '';
  }

  getStartOfWeek(){
    var now = moment();
    return now.clone().weekday(0);
  }


  getEndOfWeek(){
    var now = moment();
    return now.clone().weekday(5);
  }

  getNextWeekStart(currentWeekStart:Moment) {
    let nextWeekstart =  moment(currentWeekStart.add(7, 'days'));
    return nextWeekstart;
  }

 getNextWeekEnd(currentWeekEnd: Moment) {
  let lastWeekEnd = moment(currentWeekEnd.add(7, 'days'));
  return lastWeekEnd;
}


getLastWeekStart(currentWeekStart:Moment) {
  let lastWeekstart =  moment(currentWeekStart.subtract(7, 'days'));
  return lastWeekstart;

}

getLastWeekEnd(currentWeekEnd: Moment) {
  let lastWeekEnd = moment(currentWeekEnd.subtract(7, 'days'));
  return lastWeekEnd;
}

  getWeeklyStudentAttendence(student:Student, weekStart:any, weekEnd:any){
    var now = moment();
    var studentAttendanceThisWeek: Studentattendance[] = [];
    var thisWeek:attendanceStatus[] = [];
  for(var status of student.attendanceList){
    if(moment(status.date).isBetween(weekStart, weekEnd) || moment(status.date) === weekStart || moment(status.date) === weekEnd){
      thisWeek.push(status);
    } 
    if(thisWeek.length==5){
      break;
    }
  }
  studentAttendanceThisWeek.push(new Studentattendance(student.studentId, thisWeek))
  return studentAttendanceThisWeek;

  }

  GetWeeksAttendance(studentsOfClass: Student[], monday:any, friday:any){
    var now = moment();
    var isNowWeekday = now.isBetween(monday, friday, null, '[]');
var studentAttendanceThisWeek: Studentattendance[] = [];
for(var each of studentsOfClass){
var thisWeek:attendanceStatus[] = [];
  for(var status of each.attendanceList){
    if(moment(status.date).isBetween(monday, friday)){
      thisWeek.push(status);
    }
    if(thisWeek.length==5){
      break
    }
  }
  studentAttendanceThisWeek.push(new Studentattendance(each.studentId, thisWeek))
}

return studentAttendanceThisWeek;

}
}
