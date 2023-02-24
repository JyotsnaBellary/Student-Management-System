import { Component, OnInit } from '@angular/core';
import { IEntity } from '../../entities/Entity.entity';
import { LeaveApplication } from '../../entities/LeaveApplication.entity';
import { Student } from '../../entities/Student.entity';
import { User } from '../../entities/user.entity';

@Component({
  selector: 'app-leave-table',
  templateUrl: './leave-table.component.html',
  styleUrls: ['./leave-table.component.css']
})
export class LeaveTableComponent implements OnInit {

  constructor() { }
  storedLeaves: LeaveApplication[] = [];
  student!: IEntity;
  userIn!: Student; 
  issuer!: string | null;
  ngOnInit(): void {
    this.userIn = JSON.parse(localStorage.getItem("student")!);
    this.issuer = localStorage.getItem("user")
    this.storedLeaves = JSON.parse(localStorage.getItem("LeaveList")!);
    this.student = JSON.parse(localStorage.getItem("studentDetails")!);
    console.log(this.storedLeaves)
  }
}
