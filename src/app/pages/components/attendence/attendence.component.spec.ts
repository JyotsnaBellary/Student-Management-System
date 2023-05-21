import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import moment from 'moment';
import { AttendanceService } from 'src/app/core/service/attendence/attendance.service';
import { AuthService } from 'src/app/core/service/auth/auth.service';
import { AttendanceContentComponent } from 'src/app/pages/components/attendence/attendance-content/attendance-content.component';
import { AttendanceHeaderComponent } from 'src/app/pages/components/attendence/attendance-header/attendance-header.component';
import { DetailsComponent } from 'src/app/shared/components/details/details.component';
import { NavigateAttendanceComponent } from 'src/app/pages/components/attendence/navigate-attendance/navigate-attendance.component';
import { ILogin } from 'src/app/shared/entities/login.entity';
import { HttpClientModule } from '@angular/common/http';

import { AttendenceComponent } from './attendence.component';

describe('AttendenceComponent', () => {
  let component: AttendenceComponent;
  let fixture: ComponentFixture<AttendenceComponent>;
  let authService: AuthService;
  let attendanceService: AttendanceService;
  let startDate: string = "2023-02-12T00:00:00.000Z";
  let endDate: string = "2023-02-25T00:00:00.000Z";
  
  let mockRouter:any;
    class MockRouter {
        //noinspection TypeScriptUnresolvedFunction
        navigate = jasmine.createSpy('navigate');
    }

    beforeAll(async () => {
    await TestBed.configureTestingModule({
      // declarations: [ AttendenceComponent, AttendanceHeaderComponent , NavigateAttendanceComponent, AttendanceContentComponent ],
      declarations: [ AttendenceComponent, AttendanceHeaderComponent , NavigateAttendanceComponent, AttendanceContentComponent],
      imports:[RouterTestingModule, RouterTestingModule.withRoutes([]), HttpClientModule],
      providers: [AttendenceComponent, { provide: AuthService }, {provide:AttendanceService}]
    })
    .compileComponents();

    
  });


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendenceComponent, AttendanceHeaderComponent , NavigateAttendanceComponent],
      imports:[RouterTestingModule.withRoutes([]), HttpClientModule],
      providers: [AttendenceComponent, { provide: AuthService }, {provide:AttendanceService}]
    })
    .compileComponents();
    fixture = TestBed.createComponent(AttendenceComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    attendanceService = TestBed.inject(AttendanceService);
    let loginInfo: ILogin = {email:'anne@gmail.com', password: '1234'};
    authService.login(loginInfo);
  });

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(AttendenceComponent);
  //   component = fixture.componentInstance;
  //   authService = TestBed.inject(AuthService);
  //   attendanceService = TestBed.inject(AttendanceService);
  //   let loginInfo: ILogin = {email:'anne@gmail.com', password: '1234'};
  //   authService.login(loginInfo);
  // });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
  
  // it('check end date', () => {
  //   component.getEndDateEmit(moment(endDate))
  //   expect(component.endDate).toEqual(moment(endDate))
  // });

  // it('check start date', () => {
  //   component.getEndDateEmit(moment(startDate))
  //   expect(component.endDate).toEqual(moment(startDate))
  // });

  // it('getWeeklyAttendance method check', () => {
  //   // let attendance = 
  // });

  // it('display class students', () =>{
  //   component.displayClass("1");
  //   fixture.detectChanges();
  //   fixture.whenStable().then(() => {
  //     expect(component.displayAttendence).toBeTruthy();
  //     expect(component.displayAttendence).not.toBeFalsy();
  //     expect(component.studentsOfClass).toEqual(JSON.parse(localStorage.getItem("ClassStudents")!));
  //   });  
  // });
  // it('Getting attedence', () => {

  // })
});
