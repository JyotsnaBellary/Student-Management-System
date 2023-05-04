import { Component } from '@angular/core';
// import { AuthService } from './core/service/auth/auth.service';
import users from 'src/assets/Dummy Data/User.json'
import { User } from './shared/entities/user.entity';
import { LeaveApplication } from './shared/entities/LeaveApplication.entity';
// import { AuthService } from './core/service/auth/auth.service';
import { AuthService } from './core/service/crud/auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Student-Management-System';
  UserList: User[] = [];
  LeavesList: LeaveApplication[] = [];
  constructor(public authService:AuthService){}
  ngOnInit(): void {
    // this.UserList = users;
    // localStorage.setItem("UserList", JSON.stringify(this.UserList))
    // let date1: Date = new Date("2023-01-16");  
    // let leave1 = new LeaveApplication("1A001", "Anne" ,date1, "Out of station", "Approved");
    // let date2: Date = new Date("2023-02-06");  
    // let leave2 = new LeaveApplication("1B005", "Carl" ,date2, "sick leave", "Applied");
    // let date3: Date = new Date("2019-01-16");  
    // let leave3 = new LeaveApplication("2B003", "Ben" ,date3, "sick leave", "Approved");
    // this.LeavesList.push(leave1);
    // this.LeavesList.push(leave2);
    // this.LeavesList.push(leave3);
    // localStorage.setItem("LeaveList", JSON.stringify(this.LeavesList));

  }
  getIsAuth(){
    console.log("checking")

    return this.authService.getAuthStatusListener()
          .subscribe(res => 
            {
              console.log(res)
            //   if(res) {
            //   return true;
            // }else {
            //   return false;
            // }
          }
        );

  }
}
