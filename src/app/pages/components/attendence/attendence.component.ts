import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Moment } from 'moment';
import { AttendanceService } from 'src/app/core/service/crud/attendance/attendance.service';
// import { AttendanceService } from 'src/app/core/service/attendence/attendance.service';
import { AuthService } from 'src/app/core/service/crud/auth/auth.service';
import { CrudService } from 'src/app/core/service/crud/crud.service';
// import { AuthService } from 'src/app/core/service/auth/auth.service';
import { IDateRange } from 'src/app/pages/components/attendence/navigate-attendance/navigate-attendance.component';
import { Studentattendance } from 'src/app/shared/entities/Attendence.entity';
import { IEntity } from 'src/app/shared/entities/Entity.entity';
import { Student } from 'src/app/shared/entities/Student.entity';

@Component({
  selector: 'app-attendence',
  templateUrl: './attendence.component.html',
  styleUrls: ['./attendence.component.css'],
})
export class AttendenceComponent implements OnInit, OnChanges {
  constructor(
    private authService: AuthService,
    private attendanceService: AttendanceService,
    private detailsService: CrudService
  ) {}

  isUser!: string | null;
  details: IEntity | undefined;
  displayAttendence: boolean = false;
  startDate!: Moment;
  endDate!: Moment;
  studentsOfClass!: Student[];
  student!: Student;
  // attendance!:Studentattendance;
  attendance!: Studentattendance[];
  attendanceThisWeek: Studentattendance[] = [];
  attendancePercentage!: string;
  filter!: string;
  role!:string;
  ngOnInit(): void {
    this.detailsService.getUserDetails().subscribe((detailsResult) => {
      this.details = detailsResult.userDetails;
      if (this.details?.parentId) {
        this.displayAttendence = true;
        this.attendanceService.getAttendanceDetails().subscribe((res) => {
          console.log(res);
          this.role = "student";
          // this.student = new Student(this.details?.userId,this.details?.firstName, this.details?.lastName!, res.attendanceData[0]?.attendanceArray,'0', this.details?.section!, this.details?.Class!, this.details?.parentId!)
          let studentAttendance: Studentattendance = new Studentattendance(
            res.attendanceData[0]?.userId,
            res.attendanceData[0]?.attendanceArray
          );
          // console.log(this.student)
          // this.attendance = new Studentattendance(res.attendanceData[0]?.userId, res.attendanceData[0]?.attendanceArray);
          console.log(this.attendance);
          this.attendance = [];
          this.attendance.push(studentAttendance);
        });
      } else if (this.details?.specialization) {
        this.role = "teacher"
      }
    });
    // console.log(this.details)
    // this.isUser = localStorage.getItem("user")
    // if(this.authService.getUserRole() === "student"){
    //   this.detailsService.getDetailsofUser().subscribe(res => {
    //     // this.details = res;
    //   })
    // }
    // this.details = JSON.parse(localStorage.getItem("studentDetails")!);
    // this.student = JSON.parse(localStorage.getItem('student')!)
    // this.displayAttendence = true
    //   console.log('here')
    // }else if(this.isUser === "teacher"){
    //   this.details = JSON.parse(localStorage.getItem("teacherDetails")!);
    // }
  }

  ngOnChanges(changes: SimpleChanges): void {}

  // getWeeklyAttendance(attendance:Studentattendance[]){
  //   this.attendance = attendance;
  // }

  displayClass(Class: string) {
    this.displayAttendence = true;
    this.studentsOfClass = JSON.parse(localStorage.getItem('ClassStudents')!);
    console.log(this.displayAttendence);
  }

  getStartDateEmit(startDate: Moment) {
    this.startDate = startDate;
  }

  getEndDateEmit(endDate: Moment) {
    this.endDate = endDate;
  }

  searchBy(filter: string) {
    this.filter = filter;
  }

  displaySection(section: string) {}

  public getDataWithDateRange(dateRange: IDateRange) {
    console.log(dateRange, this.attendance, this.details);

    if (this.details?.specialization) {
      this.attendanceService
        .getAttendanceDetails()
        .subscribe((attendanceDetails) => {
          this.studentsOfClass = [];
          for (let i = 0; i < attendanceDetails.attendanceData.length; i++) {
            console.log(attendanceDetails.attendanceData[i]);
            let student: Student = new Student(
              attendanceDetails.attendanceData[i].userId,
              attendanceDetails.attendanceData[i].firstName,
              attendanceDetails.attendanceData[i].lastName,
              attendanceDetails.attendanceData[i].attendanceArray,
              '',
              attendanceDetails.attendanceData[i].section,
              attendanceDetails.attendanceData[i].Class,
              ''
            );
            this.studentsOfClass.push(student);
          }
          console.log(this.studentsOfClass);
          this.attendanceThisWeek = this.attendanceService.GetWeeksAttendance(
            this.studentsOfClass,
            dateRange.startDate,
            dateRange.endDate
          )!;
        });
    } else if (this.details?.parentId) {
      this.student = new Student(
        this.details?.userId,
        this.details?.firstName,
        this.details?.lastName!,
        this.attendance[0].attendance,
        '0',
        this.details?.section!,
        this.details?.Class!,
        this.details?.parentId!
      );
      // this.student = new Student(this.details?.userId,this.details?.firstName, this.details?.lastName!, this.attendance.attendance,'0', this.details?.section!, this.details?.Class!, this.details?.parentId!)
      console.log(this.student);
      this.attendanceThisWeek =
        this.attendanceService.getWeeklyStudentAttendence(
          this.student,
          dateRange.startDate,
          dateRange.endDate
        );
      // this.attendancePercentage = this.attendanceService.calculatePercentage(this.student.attendanceList)!
      //  this.attendanceThisWeek = this.attendanceService.getWeeklyStudentAttendence(this.attendance, dateRange.startDate, dateRange.endDate);
      // this.attendancePercentage = this.attendanceService.calculatePercentage(this.student.attendanceList)!
    }
    console.log(this.attendanceThisWeek);
  }
}
