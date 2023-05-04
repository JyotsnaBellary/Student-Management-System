import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/service/crud/auth/auth.service';
import { CrudService } from 'src/app/core/service/crud/crud.service';
import { IEntity } from 'src/app/shared/entities/Entity.entity';
import { IParents, Iparent, Parents } from 'src/app/shared/entities/Parent.entity';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private crudService:CrudService, private authService:AuthService) { }
  details!: IEntity;
  // details: undefined;
  parentDetails!: IParents;
  emailId!: string;
  isUser!:string;
  role!: string;
  ngOnInit(): void {
    // this.isUser = localStorage.getItem("user")!;
    // if(this.isUser === "student"){
    // this.details = JSON.parse(localStorage.getItem("studentDetails")!);
    // this.parentDetails = JSON.parse(localStorage.getItem("parentDetails")!);
    // }if(this.isUser === "teacher"){
    // this.details = JSON.parse(localStorage.getItem("teacherDetails")!);
    // }
    // this.emailId = localStorage.getItem("userEmail")!;
    this.role = this.authService.getUserRole();
    this.crudService.getUserDetails().subscribe(res => {
      this.details = res.userDetails
      console.log(this.details);

      if(this.details?.parentId){
        this.crudService.getParentDetails(this.details?.parentId!).subscribe(Details => {
          this.role = 'student'
          this.parentDetails = Details.parentDetails;
        console.log(Details.parentDetails, this.parentDetails)

        })
      }
    })
    console.log(this.parentDetails)
  }

}
