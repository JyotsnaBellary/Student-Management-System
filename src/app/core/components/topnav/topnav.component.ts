import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit {
  constructor(public loginService:AuthService){}
  emailId!: string;
  ngOnInit(): void {
  this.emailId = this.loginService.getEmailId();

  }
  logout(){
    this.loginService.logout();
  }
}
