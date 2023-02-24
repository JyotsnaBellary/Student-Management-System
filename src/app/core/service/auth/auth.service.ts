import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Entity } from 'src/app/shared/entities/Entity.entity';
import { ILogin } from 'src/app/shared/entities/login.entity';
import { IStudentTimeTable, ITeacherTimeTable } from 'src/app/shared/entities/schedule.entity';
import { User } from 'src/app/shared/entities/user.entity';
import entities from 'src/assets/Dummy Data/Entity.json'
import timeTable from 'src/assets/Dummy Data/Student-time-table.json'
import studentExams from 'src/assets/Dummy Data/Examinations.json'
import holidays from 'src/assets/Dummy Data/Holidays.json'
import Teacherschedule from 'src/assets/Dummy Data/teacher-time-table.json'
import { Iexamination, Iinvigilation } from 'src/app/shared/entities/examination.entity';
import { IHoliday } from 'src/app/shared/entities/holiday.entity';
import  InvigilationList  from 'src/assets/Dummy Data/Invigilation.json'
import storedParents from "src/assets/Dummy Data/Parent.json"
import { Parents } from 'src/app/shared/entities/Parent.entity';
import { Teacher } from 'src/app/shared/entities/Teacher.entity';
import { Attendance, attendanceStatus, Studentattendance } from 'src/app/shared/entities/Attendence.entity';
import { Student } from 'src/app/shared/entities/Student.entity';
import { AttendanceService } from '../attendence/attendance.service';
import { Book, BooksBorrowed } from 'src/app/shared/entities/Library.entity';
import library from 'src/assets/Dummy Data/BookList.json'
import { LibraryService } from '../library/library.service';
  @Injectable({
    providedIn: 'root'
  })
  export class AuthService {

    constructor(private router:Router, private attendanceService: AttendanceService, private libraryService:LibraryService) { 

    }
    isUser!: string | null;
    storedUsers:User[] = [];
    storedEntitiess:Entity[] = []
    TimeTableList: IStudentTimeTable[] = [];
    StudentExamList: Iexamination[] = []
    Holidays: IHoliday[] = [];
    TeacherTimeTableList: ITeacherTimeTable[] = [];
    ExamInvigilationList: Iinvigilation[] = []
    storedParents: Parents[] = []
    teacher!: Teacher;
    classStudents: Student[] = []
    studentAttendance:attendanceStatus[] = [];
    library:Book[] = [];
    //checks if a user has logged in
    checkUser(){
      if(localStorage.getItem("user") == "student" || localStorage.getItem("user") == "teacher" || localStorage.getItem("user") == "admin"){
        // alert(localStorage.getItem("user"))
        return true;
      }else{
        return false;
      }
    }

    getDetails(user:string){
      if (user ==="student"){
        return JSON.parse(localStorage.getItem("studentDetails")!)
      } else if(user === "teacher"){
        return JSON.parse(localStorage.getItem("teacherDetails")!);
      }
    }

    
    getEmailId():string{
      return localStorage.getItem("userEmail")!;
    }
    getUser():string{
    return localStorage.getItem("user")!;
    }
   //login function for any user
    login(loginInfo:ILogin):boolean
    {
      //accessing user list from local storage
      this.storedUsers = JSON.parse(localStorage['UserList']);
      for(let i=0; i<this.storedUsers.length; i++)
      {
        if(this.storedUsers[i].email === loginInfo.email)
        {
          if(this.storedUsers[i].password === loginInfo.password)
          {
            console.log(this.storedUsers[i].email)
            localStorage.setItem("userEmail", this.storedUsers[i].email);
            this.storedEntitiess = entities;
            this.Holidays = holidays;
            localStorage.setItem("HolidayList", JSON.stringify(this.Holidays));
            this.library = library;
            localStorage.setItem("library", JSON.stringify(this.library));
            localStorage.setItem("BorrowedBooks", JSON.stringify(this.libraryService.getBorrowedBooks(this.storedUsers[i].id)))
            // localStorage.setItem("borrowedBooksData", JSON.stringify(this.libraryService.getBorrowedBooks(this.storedUsers[i].id)))
            //if the user accessing is a teacher, load invigilations, Weekly Schedules, userDetails
            if(this.storedUsers[i].role === 'teacher'){
              // alert("Teacher");
              localStorage.setItem("user", "teacher");
              
              this.TeacherTimeTableList = Teacherschedule;
              localStorage.setItem("TeacherSchedule", JSON.stringify(this.TeacherTimeTableList));
              
              this.ExamInvigilationList = InvigilationList;
              localStorage.setItem("ExamInvigilation", JSON.stringify(this.ExamInvigilationList));
              
              console.log(this.storedEntitiess)
              for(var s of this.storedEntitiess){
                if (s.Id === this.storedUsers[i].id){
                localStorage.setItem("teacherDetails", JSON.stringify(s))
                  this.teacher = new Teacher(s.Id, s.firstName, s.lastName, s.teacherDetails?.dept!, s.teacherDetails?.specialization!, s.teacherDetails?.class!, s.teacherDetails?.section!);
                  localStorage.setItem("teacher", JSON.stringify(this.teacher))
                }
              }
              //creating a list of the students of the class assigned to teacher 
              for(var s of this.storedEntitiess){
                if(s.studentDetails?.class === this.teacher.Class && s.studentDetails.section === this.teacher.section){
                  this.studentAttendance = this.attendanceService.getStudentattendance(s.studentDetails.class, s.studentDetails.section, s.Id)!;
                  var percentage:string = String(this.attendanceService.calculatePercentage(this.studentAttendance))
                  var student = new Student(s.Id, s.firstName, s.lastName,this.studentAttendance,percentage,s.studentDetails.section,s.studentDetails.class,s.studentDetails.parentId)
                  this.classStudents.push(student);
                  localStorage.setItem("ClassStudents", JSON.stringify(this.classStudents));
                }
              }

            }

            //if the user accessing is a student, load invigilations, Weekly Schedules, userDetails
            else if(this.storedUsers[i].role === 'student'){

              // localStorage.setItem("student", JSON.stringify(this.storedUsers[i]));
              localStorage.setItem("user", "student");
              this.TimeTableList = timeTable;
              localStorage.setItem("TimeTableList", JSON.stringify(this.TimeTableList));
              this.StudentExamList = studentExams;
              localStorage.setItem("StudentExams", JSON.stringify(this.StudentExamList));
              this.storedParents = storedParents;
              for(var s of this.storedEntitiess)
              {
                if (s.Id === this.storedUsers[i].id)
                {
                  this.studentAttendance = this.attendanceService.getStudentattendance(s.studentDetails?.class!, s.studentDetails?.section! , s.Id)!;
                  var percentage:string = String(this.attendanceService.calculatePercentage(this.studentAttendance))
                  var student = new Student(s.Id, s.firstName, s.lastName,this.studentAttendance,percentage,s.studentDetails?.section!,s.studentDetails?.class!,s.studentDetails?.parentId!)
                localStorage.setItem("student", JSON.stringify(student))
                localStorage.setItem("studentDetails", JSON.stringify(s))
                for(var p of this.storedParents){
                  if(s.studentDetails?.parentId == p.parentId){
                    localStorage.setItem("parentDetails", JSON.stringify(p))
                    console.log(localStorage.getItem("parentDetails"));
                    break;
                  }
                }
                // console.log(localStorage.getItem("studentDetails"));
                }
                
              }

            //AdminLogin, implemented later
            }else if(this.storedUsers[i].role === 'admin'){
              localStorage.setItem("adminDetails", JSON.stringify(this.storedUsers[i]));
            localStorage.setItem("user", "admin");
            }
            // alert(localStorage.getItem("student"));
            return true;
          }
        }
      }
      return false;
    }

    saveAdmin(AdminClass: Object): any {
      // return this.http.post(`${this.baseUrl}`, AdminClass);
    }






    logout(){
        // alert("inside logout")
        //checking to see if a student, admin or teacher has logged in
        this.isUser = localStorage.getItem("user")
        if(this.isUser === "student"){
          localStorage.removeItem("studentDetails");
          localStorage.removeItem("student");
          localStorage.removeItem("parentDetails");
          localStorage.removeItem("StudentExams");
          localStorage.removeItem("TimeTableList");
        }else if(this.isUser === "teacher"){
          localStorage.removeItem("teacherDetails");
          localStorage.removeItem("TeacherSchedule");
          localStorage.removeItem("ExamInvigilation");
          localStorage.removeItem("ClassStudents")
          localStorage.removeItem("teacher")
        }
      else if(this.isUser === "admin"){
        localStorage.removeItem("adminDetails");
      }
        localStorage.removeItem("user");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("HolidayList");
        localStorage.removeItem("library")
        localStorage.removeItem("BorrowedBooks")
        this.router.navigate(['/sign_in']);
    
      }
    }

