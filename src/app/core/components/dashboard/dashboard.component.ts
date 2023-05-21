import { Component, OnInit } from '@angular/core';
import { IEntity } from 'src/app/shared/entities/Entity.entity';
import { LeaveApplication } from 'src/app/shared/entities/LeaveApplication.entity';
import { User } from 'src/app/shared/entities/user.entity';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  
  ngOnInit(): void {
    // console.log(localStorage.getItem("token"));
  }
  
}
