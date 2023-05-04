import { Component, OnInit } from '@angular/core';
import { IEntity } from '../../entities/Entity.entity';
import { Iday, Iexamination, Iinvigilation } from '../../entities/examination.entity';
import { ExaminationsService } from 'src/app/core/service/crud/examinations/examinations.service';

@Component({
  selector: 'app-examinations',
  templateUrl: './examinations.component.html',
  styleUrls: ['./examinations.component.css']
})
export class ExaminationsComponent implements OnInit {

  constructor(private examinationService:ExaminationsService) { }
  isUser!: string | null;
  details: IEntity | undefined;
  examList!: Iexamination[];
  examInvigilations!: Iinvigilation[];
  examschedule!: Iday[];

  ngOnInit(): void {

    this.examinationService.getExaminationDetails().subscribe(res => {
      console.log(res)
      this.examInvigilations=[];
      if(res.InvigilationDetails){
        for(let i = 0; i < res.InvigilationDetails.length; i++)
          {
            this.examInvigilations.push({teacherId: res.InvigilationDetails[i].teacherId, Class: res.InvigilationDetails[i].Class, Section:res.InvigilationDetails[i].section, schedule: { day:res.InvigilationDetails[i].day, date : res.InvigilationDetails[i].date, subject:res.InvigilationDetails[i].subject} as Iday} as Iinvigilation);
        } 
      
      // console.log(this.examInvigilations)
      // return invigilationSchedule;

      }else if(res.ExaminationDetails){
        this.examschedule = [];
          for(let i = 0; i < res.ExaminationDetails.length; i++)
          {
      //       // console.log(res.ExaminationDetails[i].day)
            this.examschedule.push({day:res.ExaminationDetails[i].day, date : res.ExaminationDetails[i].date, subject:res.ExaminationDetails[i].subject} as Iday);
        }
      }
    });
  }

}
