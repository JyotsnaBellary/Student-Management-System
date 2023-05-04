import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from '../../service/crud/auth/auth.service';
import { CrudService } from '../../service/crud/crud.service';
import { IEntity } from 'src/app/shared/entities/Entity.entity';
// import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit {
  constructor(public loginService:AuthService, private router:Router, private detailsService:CrudService){}
  emailId!: string;
  ngOnInit(): void {
  this.detailsService.getUserDetails().subscribe(userDetails => {
    let details: IEntity = userDetails.userDetails;
    this.emailId = details.email;
  });
  // this.emailId = this.loginService.getUserEmail();

  }
  logout(){
    let message:string = this.loginService.logout();
    if(message === 'logged out'){
      this.router.navigate(['/sign_in']);
    }
  }
}
