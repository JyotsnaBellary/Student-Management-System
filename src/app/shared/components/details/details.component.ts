import { Component, OnInit } from '@angular/core';
import { IEntity } from '../../entities/Entity.entity';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor() { }
  isUser!: string | null;
  // @Input() details: IEntity | undefined;
   details: IEntity | undefined;

  ngOnInit(): void {
    this.isUser = localStorage.getItem("user")
    if(this.isUser === "student"){
    this.details = JSON.parse(localStorage.getItem("studentDetails")!);
    }if(this.isUser === "teacher"){
    this.details = JSON.parse(localStorage.getItem("teacherDetails")!);

    }
  }
}
