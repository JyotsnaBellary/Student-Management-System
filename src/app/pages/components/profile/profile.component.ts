import { Component, OnInit } from '@angular/core';
import { IEntity } from 'src/app/shared/entities/Entity.entity';
import { Iparent, Parents } from 'src/app/shared/entities/Parent.entity';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor() { }
  details: IEntity | undefined;
  parentDetails!: Parents;
  emailId!: string;
  isUser!:string;
  ngOnInit(): void {
    this.isUser = localStorage.getItem("user")!;
    if(this.isUser === "student"){
    this.details = JSON.parse(localStorage.getItem("studentDetails")!);
    this.parentDetails = JSON.parse(localStorage.getItem("parentDetails")!);
    }if(this.isUser === "teacher"){
    this.details = JSON.parse(localStorage.getItem("teacherDetails")!);
    }
    this.emailId = localStorage.getItem("userEmail")!;

  }

}
