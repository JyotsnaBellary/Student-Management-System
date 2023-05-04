import { Component, OnInit } from '@angular/core';
import { IEntity } from '../../entities/Entity.entity';
import { LeaveApplication } from '../../entities/LeaveApplication.entity';
import { Student } from '../../entities/Student.entity';
import { User } from '../../entities/user.entity';
import { LeaveService } from 'src/app/core/service/crud/leave/leave.service';

@Component({
  selector: 'app-leave-table',
  templateUrl: './leave-table.component.html',
  styleUrls: ['./leave-table.component.css']
})
export class LeaveTableComponent implements OnInit {

  constructor(private leaveService:LeaveService) { }
  storedLeaves: LeaveApplication[] = [];
  student!: IEntity;
  userIn!: Student; 
  issuer!: string | null;
  userId!: string | null;
  ngOnInit(): void {
    // this.userIn = JSON.parse(localStorage.getItem("student")!);
    // this.issuer = localStorage.getItem("user")
    // this.storedLeaves = JSON.parse(localStorage.getItem("LeaveList")!);
    // this.student = JSON.parse(localStorage.getItem("studentDetails")!);
    // console.log(this.storedLeaves[0].studentId)
    this.leaveService.getLeaveDetails().subscribe(res => {
      // this.Books =res;
      console.log(res);
      this.storedLeaves = res.Leaves;
      this.issuer = res.issuer;
      this.userId = res.userId;
    });
  }

  approveOfLeave(userId: string, fromDate: Date, toDate:Date){
    console.log(userId, fromDate, toDate);
    let index = this.storedLeaves.findIndex(each => each.userId === userId && each.fromDate === fromDate);
    this.storedLeaves[index].status = 'Approved';
      this.leaveService.approveLeave(userId, fromDate, toDate)
      .subscribe(result => {
        console.log(result, this.issuer, this.userId)
      } );
  }
}
