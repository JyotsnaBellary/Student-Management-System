import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, catchError, map, throwError } from 'rxjs';
import { iLeave } from 'src/app/shared/entities/LeaveApplication.entity';
import { ILogin } from 'src/app/shared/entities/login.entity';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  REST_API: string = 'http://localhost:8880';
  
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  token!: string | null;
  isAuthenticated!: boolean;
  private tokenTimer!: any;
  private authStatusListener = new Subject<boolean>();
  constructor(private http: HttpClient, private router: Router) {}

  getLeaveDetails(): Observable<any> {
    let API_URL = `${this.REST_API}/leaves/`;
    return this.http
      .get(API_URL)
      .pipe(
        map((res: any) => {
          return res || {};
        })
        
      );
  }

  approveLeave(userId:string, fromDate:Date, toDate:Date): Observable<any> {
    let API_URL = `${this.REST_API}/approveLeave/`;
    return this.http.put<{
      fromDate:string;
      userId:string;
      toDate:string;
    }>(API_URL, {
      fromDate: fromDate,
      userId: userId,
      toDate: toDate
      // returnDate: new Date(this.getReturnDate().toISOString())
    });
  }

  postLeaveDetails(leaveData: iLeave){
    let API_URL = `${this.REST_API}/leave/`;
    return this.http.post<{
      fromDate:string;
      reason:string;
      toDate:string;
    }>(API_URL, {
      fromDate: leaveData.fromDate,
      reason: leaveData.reason,
      toDate:leaveData.toDate!
      // returnDate: new Date(this.getReturnDate().toISOString())
    }).subscribe(res => console.log(res));
  }


}
