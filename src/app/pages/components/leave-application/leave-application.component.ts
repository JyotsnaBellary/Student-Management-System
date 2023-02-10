import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { appConstants } from 'src/app/shared/constants/constants';
import { IEntity } from 'src/app/shared/entities/Entity.entity';
import { LeaveApplication } from 'src/app/shared/entities/LeaveApplication.entity';
import { LeaveApplicationStatus } from 'src/app/shared/enums/leave-application.enum';

@Component({
  selector: 'app-leave-application',
  templateUrl: './leave-application.component.html',
  styleUrls: ['./leave-application.component.css']
})
export class LeaveApplicationComponent implements OnInit {

  storedLeaves: LeaveApplication[] = [];
  form!: FormGroup;
  oneDay=false;
  moreDays=false;
  student!: IEntity;
  constructor() { }
  fromDate!: Date;
  toDate !: Date;
  reason!: string;
  successMessage!: string;
  ngOnInit(): void {
    if(this.oneDay==true){
      alert(this.oneDay)
    }
  }
  submit(){}
  onCheckboxChange(e: Event){
    if((<HTMLInputElement>e.target).checked){
      this.moreDays=true;
    }else{
      this.moreDays=false;
    }
  }
save(){
  this.student = JSON.parse(localStorage.getItem("studentDetails")!);
  if(this.moreDays === true){
    let leaveApplication = new LeaveApplication(this.student.Id, this.student.firstName, this.fromDate, this.reason, LeaveApplicationStatus.Applied ,this.toDate);
    // alert(leaveApplication.fromDate+ leaveApplication.reason+ leaveApplication.studentId+leaveApplication.toDate)
    this.storedLeaves = JSON.parse(localStorage.getItem("LeaveList")!);
  this.storedLeaves.push(leaveApplication)
  localStorage.setItem("LeaveList", JSON.stringify(this.storedLeaves));
  this.successMessage = appConstants.messages.leaveApplicationSuccessMsg;

  }else{
  let leaveApplication = new LeaveApplication(this.student.Id,this.student.firstName,this.fromDate, this.reason);
  // alert(leaveApplication.fromDate+leaveApplication.reason+ leaveApplication.studentId);
  this.storedLeaves = JSON.parse(localStorage.getItem("LeaveList")!);
  this.storedLeaves.push(leaveApplication)
  localStorage.setItem("LeaveList", JSON.stringify(this.storedLeaves));
  this.successMessage = "Successfully applied leave"
  }
  
  
}

}
