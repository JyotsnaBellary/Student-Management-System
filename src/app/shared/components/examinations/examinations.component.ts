import { Component, OnInit } from '@angular/core';
import { IEntity } from '../../entities/Entity.entity';
import { Iday, Iexamination, Iinvigilation } from '../../entities/examination.entity';

@Component({
  selector: 'app-examinations',
  templateUrl: './examinations.component.html',
  styleUrls: ['./examinations.component.css']
})
export class ExaminationsComponent implements OnInit {

  constructor() { }
  isUser!: string | null;
  details: IEntity | undefined;
  examList!: Iexamination[];
  examInvigilations!: Iinvigilation[];
  examschedule!: Iday[];
  ngOnInit(): void {
    this.isUser = localStorage.getItem("user")
    if(this.isUser === "student"){
      this.examList = JSON.parse(localStorage.getItem("StudentExams")!);
      this.details = JSON.parse(localStorage.getItem("studentDetails")!);
      for(var t of this.examList){
        if(t.Class === this.details?.studentDetails?.class){
            this.examschedule = t.schedule
        }
      }
    }
    else if(this.isUser === "teacher"){
      this.examInvigilations = JSON.parse(localStorage.getItem("ExamInvigilation")!);
      this.details = JSON.parse(localStorage.getItem("teacherDetails")!);
    }
  }

}
