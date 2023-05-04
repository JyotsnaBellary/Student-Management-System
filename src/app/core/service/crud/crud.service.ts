import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, catchError, map, throwError } from 'rxjs';
import { Entity } from 'src/app/shared/entities/Entity.entity';
import { ILogin } from 'src/app/shared/entities/login.entity';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  REST_API: string = 'http://localhost:8880';
  
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  token!: string | null;
  isAuthenticated!: boolean;
  private userDetailsListener = new Subject<Entity>();
  constructor(private http: HttpClient, private router: Router) {}

  getUserDetails(): Observable<any> {
    let API_URL = `${this.REST_API}/userDetails`;
    return this.http
      .get(API_URL)
      .pipe(
        map((res: any) => {
          return res || {};
        })
        
        );
  }

  getParentDetails(id:string): Observable<any>{
    console.log(id);
    let API_URL = `${this.REST_API}/parentDetails/${id}`;
    return this.http
      .get(API_URL)
      .pipe(
        map((res: any) => {
          return res || {};
        })
        );
  }

  setDetailsListener(details: Entity) 
  {
    this.userDetailsListener.next(details);    
  }

  getDetailsofUser()
  {
    return this.userDetailsListener.asObservable();
  }
}
