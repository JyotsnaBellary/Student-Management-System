import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, catchError, map, throwError } from 'rxjs';
import { Iday, Iinvigilation } from 'src/app/shared/entities/examination.entity';
import { ILogin } from 'src/app/shared/entities/login.entity';

@Injectable({
  providedIn: 'root'
})
export class ExaminationsService {

  REST_API: string = 'http://localhost:8880';
  
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  token!: string | null;
  isAuthenticated!: boolean;
  private tokenTimer!: any;
  private authStatusListener = new Subject<boolean>();
  constructor(private http: HttpClient, private router: Router) {}

  getExaminationDetails() {
      let API_URL = `${this.REST_API}/examinations/`;
      let examschedule : Iday[] = [];
      return this.http
      .get(API_URL)
      .pipe(
        map((res: any) => {
          return res || {};
        })
        )
         
  }

  // getInvigilationInfo(teacherId: string){
  //   let API_URL = `${this.REST_API}/invigilation/${teacherId}`;
  //     let invigilationSchedule : Iinvigilation[] = [];
  //     return this.http
  //     .get(API_URL)
  //     .pipe(
  //       map((res: any) => {
  //         return res || {};
  //       })
  //       )
  // }
}

