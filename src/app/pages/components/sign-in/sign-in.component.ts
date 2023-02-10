import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth/auth.service';
import { Login } from 'src/app/shared/entities/login.entity';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  email!: string;
  password!:string;
  loginSuccess = false;
  successMessage!: string;

  constructor(
    private router:Router,
    private authService: AuthService
  ) { }
  
  ngOnInit(): void {

  }

  checkLogin() {
    let loginInformation = new Login(this.email, this.password);
    this.loginSuccess = this.authService.login(loginInformation);
    if(this.loginSuccess == true){
      this.successMessage = "Logged in"
      this.router.navigate(['/Dashboard']);
    }  
  }

}
