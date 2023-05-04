import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, map, throwError } from 'rxjs';
import { ILogin } from 'src/app/shared/entities/login.entity';

@Injectable(
  {
  providedIn: 'root'
}
)
export class AuthService {

  REST_API: string = 'http://localhost:8880';
  
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  token!: string | null;
  isAuthenticated: boolean = false;
  private userId!: string;
  private userEmail!: string;
  private tokenTimer!: any;
  private role!: string;
  private authStatusListener = new Subject<boolean>();
  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    if(localStorage.getItem("token")){
      return true;
    }
    return false;
  }
  
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  setAuthStatusListener() {
  this.authStatusListener.next(true);    
  }

  setUserInfo(userId : string, userEmail:string, role:string){
    this.userId = userId;
    this.role = role;
    this.userEmail = userEmail;
  }

  getUserId(){
    return this.userId;
  }

  getUserRole(){
    return this.role;
  }

  getUserEmail(){
    return this.userEmail;
  }

  login(loginInformation: ILogin){
    let API_URL = `${this.REST_API}/login`;
    return this.http
      .post<{
        email: string;
        userId: string;
        role: any; token: string; expiresIn: number 
}>(
        API_URL,
        loginInformation
      )  
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    return "logged out"
  }
  

  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  public saveAuthData(token: string, expirationDate?: Date) {
    localStorage.setItem("token", token);
    this.token = token;
    // console.log(localStorage.getItem("token"));
    // console.log(expirationDate)
    // localStorage.setItem("expiration", expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    }
  }


  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      errorMessage;
    });
  }
}
