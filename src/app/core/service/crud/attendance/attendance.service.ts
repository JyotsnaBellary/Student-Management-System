import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import moment from 'moment';
import { Observable, Subject, catchError, map, throwError } from 'rxjs';
import { Studentattendance, AttendanceStatus } from 'src/app/shared/entities/Attendence.entity';
import { Entity } from 'src/app/shared/entities/Entity.entity';
import { Student } from 'src/app/shared/entities/Student.entity';
import { ILogin } from 'src/app/shared/entities/login.entity';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  REST_API: string = 'http://localhost:8880';
  
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  token!: string | null;
  isAuthenticated!: boolean;
  private userDetailsListener = new Subject<Entity>();
  constructor(private http: HttpClient, private router: Router) {}

  getAttendanceDetails(): Observable<any> {
    console.log("getting attendance")
    let API_URL = `${this.REST_API}/attendance`;
    return this.http
      .get(API_URL)
      .pipe(
        map((res: any) => {
          return res || {};
        })    
    );
  }

  getAttendanceDetailsOfClass(Class: string, Section: string): Observable<any> {
    console.log("getting attendance")
    let API_URL = `${this.REST_API}/attendance/${Class}/${Section}`;
    return this.http
      .get(API_URL)
      .pipe(
        map((res: any) => {
          return res || {};
        })    
    );
  }

  getWeeklyStudentAttendence(student:Student, weekStart:any, weekEnd:any){
    console.log(moment(weekStart).date(), weekEnd);
    console.log(student)
    var now = moment();
    var studentAttendanceThisWeek: Studentattendance[] = [];
    var thisWeek:AttendanceStatus[] = [];
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

  GetWeeksAttendance(studentsOfClass: Student[], weekStart:any, weekEnd:any){
    var now = moment();
    var isNowWeekday = now.isBetween(weekStart, weekEnd, null, '[]');
    var studentAttendanceThisWeek: Studentattendance[] = [];
    for(var each of studentsOfClass){
    var thisWeek:AttendanceStatus[] = [];
      for(var status of each.attendanceList){
        if(moment(status.date).isBetween(weekStart, weekEnd)){
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

  updateAttendanceOfStudent(attendance:Studentattendance){
    let API_URL = `${this.REST_API}/attendance/`;
    return this.http.put<{
      userId:string;
      date:string;
      status:string;
    }>(API_URL, {
      userId: attendance.studentId,
      date: attendance.attendance[0].date,
      status:attendance.attendance[0].status
      // returnDate: new Date(this.getReturnDate().toISOString())
    }).subscribe(res => console.log(res));
  }

  save(attendance:Studentattendance[]){
    for(let i in attendance){
      // console.log(attendance[i])
      this.updateAttendanceOfStudent(attendance[i])
    }

  }

  calculatePercentage(attendance?:AttendanceStatus[], studentsOfClass?: Student[]){
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
}