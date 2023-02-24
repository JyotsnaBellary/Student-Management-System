import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Moment } from 'moment';
import { AttendanceService } from 'src/app/core/service/attendence/attendance.service';
import { AuthService } from 'src/app/core/service/auth/auth.service';
import { IDateRange } from 'src/app/shared/components/navigate-attendance/navigate-attendance.component';
import { Studentattendance } from 'src/app/shared/entities/Attendence.entity';
import { IEntity } from 'src/app/shared/entities/Entity.entity';
import { Student } from 'src/app/shared/entities/Student.entity';

@Component({
  selector: 'app-attendence',
  templateUrl: './attendence.component.html',
  styleUrls: ['./attendence.component.css']
})
export class AttendenceComponent implements OnInit, OnChanges {

  constructor(private authService: AuthService, private attendanceService: AttendanceService) { }
  
  // @Input() details: IEntity | undefined;
  isUser!: string | null;
  details: IEntity | undefined;
  displayAttendence: boolean = false;
  startDate!:Moment;
  endDate!:Moment;
  studentsOfClass!: Student[];
  student!: Student;
  attendance!:Studentattendance[];
  attendanceThisWeek: Studentattendance[] = [];
  attendancePercentage!:string;
  ngOnInit(): void {
    this.isUser = localStorage.getItem("user")
    if(this.isUser === "student"){
    this.details = JSON.parse(localStorage.getItem("studentDetails")!);
    this.student = JSON.parse(localStorage.getItem('student')!)
    this.displayAttendence = true

    }else if(this.isUser === "teacher"){
      this.details = JSON.parse(localStorage.getItem("teacherDetails")!);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // this.getWeeklyAttendance()
  }
  getWeeklyAttendance(attendance:Studentattendance[]){
    this.attendance = attendance;
    // console.log(this.attendance)
  }
  displayClass(Class:string){
    this.displayAttendence = true
    this.studentsOfClass = JSON.parse(localStorage.getItem("ClassStudents")!)
  }
 
  
  getStartDateEmit(startDate:Moment){
    console.log("inside attendence component, date changed:  ", startDate.calendar())
    // console.log("heyy")
    this.startDate = startDate;

  }
  getEndDateEmit(endDate:Moment){
    this.endDate = endDate
  }
  displaySection(section:string){}

  public getDataWithDateRange (dateRange: IDateRange) {
    if(this.authService.getUser() === "teacher"){
      this.attendanceThisWeek = this.attendanceService.GetWeeksAttendance(this.studentsOfClass, dateRange.startDate, dateRange.endDate)!;
      } else if(this.authService.getUser() === "student")
      { 
        this.attendanceThisWeek = this.attendanceService.getWeeklyStudentAttendence(this.student, dateRange.startDate, dateRange.endDate);
        this.attendancePercentage = this.attendanceService.calculatePercentage(this.student.attendanceList)!
      }
  }
}
