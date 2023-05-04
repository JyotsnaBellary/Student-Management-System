import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LeaveService } from 'src/app/core/service/crud/leave/leave.service';
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
  leaveApplicationForm!: FormGroup;
  form: FormGroup = new FormGroup({});
  // oneDay=false;
  moreDays!:boolean;
  student!: IEntity;
  constructor(private leaveService: LeaveService, private changeDetector: ChangeDetectorRef) { }
  // fromDate!: Date;
  // toDate !: Date;
  // reason!: string;
  successMessage!: string;
  ngOnInit(): void {
    this.leaveApplicationForm = new FormGroup({
      leaveData: new FormGroup({
        fromDate: new FormControl(null, [
          Validators.required
        ]),
        toDate: new FormControl(null),
        reason: new FormControl(null, [
          Validators.required
        ]),
      })
    });
    this.leaveApplicationForm.statusChanges.subscribe((status) => console.log(status));

  }
  submit(){}
  onCheckboxChange(e: Event){
    // this.moreDays = !this.moreDays;
    if(!this.moreDays){
      this.moreDays=true;
      this.leaveApplicationForm.get('toDate')?.setValidators(Validators.required);
      this.leaveApplicationForm.updateValueAndValidity();
      console.log("here")
      this.changeDetector.detectChanges();
    }else{
      console.log("clear")
      this.moreDays=false;
      let fromDate = this.leaveApplicationForm.value['leaveData'].fromDate;
      let reason = this.leaveApplicationForm.value['leaveData'].reason;
      this.leaveApplicationForm.reset()
      this.leaveApplicationForm.get('toDate')?.clearValidators();
      this.leaveApplicationForm.updateValueAndValidity();
      this.changeDetector.detectChanges();
      this.leaveApplicationForm.patchValue({
        leaveData :{
          fromDate : fromDate,
          reason : reason,
          toDate: fromDate
        }
      })
      // this.leaveApplicationForm.setValue({leaveData : {fromDate:fromDate, reason:reason}})
      // this.leaveApplicationForm.get('toDate')?.disable();
    }
  }
  // onCheckboxChange(e: Event){
  //   // this.moreDays = !this.moreDays;
  //   if(!this.moreDays){
  //     this.moreDays=true;
  //     this.leaveApplicationForm.get('toDate')?.setValidators(Validators.required);
  //     this.leaveApplicationForm.updateValueAndValidity();
  //     console.log("here")
  //     this.leaveApplicationForm.reset()
  //   }else{
  //     console.log("clear todate")
  //     this.leaveApplicationForm.get('toDate')?.clearValidators();
  //     this.leaveApplicationForm.updateValueAndValidity();
  //     this.moreDays=false;
  //     let fromDate = this.leaveApplicationForm.value['leaveData'].fromDate;
  //     let reason = this.leaveApplicationForm.value['leaveData'].reason;
  //     this.leaveApplicationForm.reset()
  //     this.leaveApplicationForm.setValue({leaveData : {fromDate:fromDate, reason:reason}})

  //     // this.leaveApplicationForm.get('toDate')?.disable();
  //   }
  // }
save(){
  if(!this.moreDays){
    let fromDate = this.leaveApplicationForm.value['leaveData'].fromDate;
    this.leaveApplicationForm.patchValue({
      leaveData :{
        toDate: fromDate
      }
    })
  }
  if(this.leaveApplicationForm.value['leaveData'].fromDate > this.leaveApplicationForm.value['leaveData'].toDate){
    this.leaveApplicationForm.setErrors({ 'invalid' : true});
  }else{
  console.log(this.leaveApplicationForm.value['leaveData']);
  this.leaveService.postLeaveDetails(this.leaveApplicationForm.value['leaveData']);
  this.leaveApplicationForm.reset();

  }
  // console.log(this.leaveApplicationForm.value['leaveData'])
  // this.student = JSON.parse(localStorage.getItem("studentDetails")!);
  // if(this.moreDays === true){
  //   let leaveApplication = new LeaveApplication(this.student.Id, this.student.firstName,this.student.lastName, "1", "A", this.fromDate, this.reason, LeaveApplicationStatus.Applied, this.toDate);
  //   // alert(leaveApplication.fromDate+ leaveApplication.reason+ leaveApplication.studentId+leaveApplication.toDate)
  //   this.storedLeaves = JSON.parse(localStorage.getItem("LeaveList")!);
  // this.storedLeaves.push(leaveApplication)
  // localStorage.setItem("LeaveList", JSON.stringify(this.storedLeaves));
  // this.successMessage = appConstants.messages.leaveApplicationSuccessMsg;
  // }else{
  // let leaveApplication = new LeaveApplication(this.student.Id, this.student.firstName,this.student.lastName, "1", "A", this.fromDate, this.reason, LeaveApplicationStatus.Applied);
  // // alert(leaveApplication.fromDate+leaveApplication.reason+ leaveApplication.studentId);
  // this.storedLeaves = JSON.parse(localStorage.getItem("LeaveList")!);
  // this.storedLeaves.push(leaveApplication)
  // localStorage.setItem("LeaveList", JSON.stringify(this.storedLeaves));
  // this.successMessage = "Successfully applied leave"
  }
  
  
// }

}
