import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, catchError, map, throwError } from 'rxjs';
import { ILogin } from 'src/app/shared/entities/login.entity';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  REST_API: string = 'http://localhost:8880';
  
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  token!: string | null;
  isAuthenticated!: boolean;
  private tokenTimer!: any;
  private authStatusListener = new Subject<boolean>();
  constructor(private http: HttpClient, private router: Router) {}

  getScheduleDetails(): Observable<any> {
    let API_URL = `${this.REST_API}/schedule/`;
    return this.http
      .get(API_URL)
      .pipe(
        map((res: any) => {
          return res || {};
        })
      );
  }
  getScheduleDetailsOfClass(Class: string, section: string): Observable<any> {
    let API_URL = `${this.REST_API}/schedule/${Class}/${section}`;
    return this.http
      .get(API_URL)
      .pipe(
        map((res: any) => {
          return res || {};
        })
      );
  }
}
