import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeaveApplicationComponent } from './leave-application.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LeaveTableComponent } from 'src/app/shared/components/leave-table/leave-table.component';
import { error } from '@angular/compiler/src/util';
import { ILogin } from 'src/app/shared/entities/login.entity';
import { AuthService } from 'src/app/core/service/crud/auth/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('LeaveApplicationComponent', () => {
  let component: LeaveApplicationComponent;
  let fixture: ComponentFixture<LeaveApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveApplicationComponent, LeaveTableComponent ],
      imports:[ReactiveFormsModule, FormsModule, HttpClientModule, RouterModule , RouterTestingModule.withRoutes([]), HttpClientTestingModule],
      providers: [AuthService]
      
    })
    .compileComponents();
    // let loginInfo: ILogin = {email:'anne@gmail.com', password: '1234'};
    // AuthService.(loginInfo);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check form controls inside form group leaveApplicationForm', 
  // waitForAsync(
    (done) => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      // try{
        let fromDate: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#fromDate')!;
        // let toDate: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#toDate')!;
        let reason: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#reason')!;
  
        fromDate.value = '2023-02-15T00:00:00.000+00:00'
        // toDate.value = '2023-02-15T00:00:00.000+00:00'
        reason.value = 'Out of station'
        console.log(fromDate.value, 'value')
        //generate events to update or map the values given here with the inputs in html
        fromDate.dispatchEvent(new Event('input'));
        // toDate.dispatchEvent(new Event('input'));
        reason.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(component.leaveApplicationForm.value['leaveData'].fromDate).toBeInstanceOf(String);

          console.log("here::",component.leaveApplicationForm.value['leaveData'].fromDate)
          // expect(component.leaveApplicationForm.value['leaveData'].value).toEqual({
          //   fromDate: '2023-02-15T00:00:00.000+00:00',
          //   toDate: '2023-02-15T00:00:00.000+00:00',
          //   reason: 'Out of station'
          // });
        });
      // }
      // catch(error){
        // console.log(error)
      // }
    });
    done();
  })
  // )
  ;
});
