import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/shared/entities/login.entity';
import { CrudService } from 'src/app/core/service/crud/crud.service';
import { AuthService } from 'src/app/core/service/crud/auth/auth.service';
// import { AuthService } from 'src/app/core/service/auth/auth.service';

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
    private authService: AuthService,
    private crudSService:CrudService
  ) { }
  
  ngOnInit(): void {
    if(localStorage.getItem('token')){
      this.router.navigate(['/dashboard']); 
    }
  }

  checkLogin() {
    let loginInformation = new Login(this.email, this.password);
    // this.loginSuccess = this.authService.login(loginInformation);
    this.authService.login(loginInformation).subscribe(
      response => {
        const token = response.token;
        // console.log(response.userId);
        // this.token = token;
        if (token) {
        //   const expiresInDuration = response.expiresIn;
        // this.setAuthTimer(expiresInDuration);
        this.authService.isAuthenticated = true;
        this.authService.setAuthStatusListener();
        // this.authService.setUserRole(response.role);
        // this.authService.setUserId(response.userId);
        this.authService.setUserInfo(response.userId, response.email, response.role)
        console.log(this.authService.getUserEmail())

        // const now = new Date();
        // const expirationDate = new Date(now.getTime() + 1 * 1000);
        // console.log(this.isAuthenticated);
        this.authService.saveAuthData(token);
        }
      }
    );
    // console.log(this.authService.getIsAuth());
    // this.successMessage = "Logged in"
    this.authService.getAuthStatusListener().subscribe(res => {
      if(res){
        console.log("here after login")
        this.router.navigate(['/dashboard']);
      }
    }) 
      // this.successMessage = "Logged in"
  }

}
