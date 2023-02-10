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

  @Injectable({
    providedIn: 'root'
  })
  export class AuthService {

    constructor(private router:Router) { }
    isUser!: string | null;
    storedUsers:User[] = [];
    storedEntitiess:Entity[] = []
    TimeTableList: IStudentTimeTable[] = [];
    StudentExamList: Iexamination[] = []
    Holidays: IHoliday[] = [];
    TeacherTimeTableList: ITeacherTimeTable[] = [];
    ExamInvigilationList: Iinvigilation[] = []

    //checks if a user has logged in
    checkUser(){
      if(localStorage.getItem("user") == "student" || localStorage.getItem("user") == "teacher" || localStorage.getItem("user") == "admin"){
        // alert(localStorage.getItem("user"))
        return true;
      }else{
        return false;
      }
    }

   //login function for any user
    login(loginInfo:ILogin):boolean
    {
      alert("inside login srvice " + loginInfo.email)
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
            console.log(this.storedEntitiess[0].HomeAddress)

            this.Holidays = holidays;
            localStorage.setItem("HolidayList", JSON.stringify(this.Holidays));


            //if the user accessing is a teacher, load invigilations, Weekly Schedules, userDetails
            if(this.storedUsers[i].role === 'teacher'){
              alert("Teacher");
            // localStorage.setItem("teacher", JSON.stringify(this.storedUsers[i]));
            localStorage.setItem("user", "teacher");
            
            this.TeacherTimeTableList = Teacherschedule;
            localStorage.setItem("TeacherSchedule", JSON.stringify(this.TeacherTimeTableList));
            
            this.ExamInvigilationList = InvigilationList;
            localStorage.setItem("ExamInvigilation", JSON.stringify(this.ExamInvigilationList));
            
            this.storedEntitiess = JSON.parse(localStorage["StudentList"]);
            for(var s of this.storedEntitiess){
              if (s.Id === this.storedUsers[i].id){
              localStorage.setItem("teacherDetails", JSON.stringify(s))
              console.log(localStorage.getItem("teacherDetails"));
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
              
              
              for(var s of this.storedEntitiess)
              {
                if (s.Id === this.storedUsers[i].id)
                {
                localStorage.setItem("studentDetails", JSON.stringify(s))
                // console.log(localStorage.getItem("studentDetails"));
                }
              }

            //AdminLogin, implemented later
            }else if(this.storedUsers[i].role === 'admin'){
              localStorage.setItem("admin", JSON.stringify(this.storedUsers[i]));
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
        alert("inside logout")
        //checking to see if a student, admin or teacher has logged in
        this.isUser = localStorage.getItem("user")
        localStorage.removeItem("TimeTableList");
        if(this.isUser === "student"){
          localStorage.removeItem("studentDetails");
          // alert(this.timeTable[0].schedule.Friday);
          
        }else if(this.isUser === "teacher"){
          localStorage.removeItem("teacherDetails");
        }
      else if(this.isUser === "admin"){
        localStorage.removeItem("adminDetails");
      }
        localStorage.removeItem("user");
        this.router.navigate(['/sign_in']);
    
      }
    }

