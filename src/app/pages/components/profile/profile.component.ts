import { Component, OnInit } from '@angular/core';
import { IEntity } from 'src/app/shared/entities/Entity.entity';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor() { }
  details: IEntity | undefined;
  emailId!: string;
  ngOnInit(): void {
  this.details = JSON.parse(localStorage.getItem("teacherDetails")!);
  this.emailId = localStorage.getItem("userEmail")!;

  }

}
