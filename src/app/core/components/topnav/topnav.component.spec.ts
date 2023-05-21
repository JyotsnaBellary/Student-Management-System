import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TopnavComponent } from './topnav.component';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';
import { ILogin } from 'src/app/shared/entities/login.entity';
import { HttpClientModule } from '@angular/common/http';

describe('TopnavComponent', () => {
  let component: TopnavComponent;
  let fixture: ComponentFixture<TopnavComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopnavComponent ],
      imports:[RouterTestingModule.withRoutes([]), HttpClientModule],
      providers:[TopnavComponent, {provide:AuthService}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopnavComponent);
    // component = fixture.componentInstance;
    component = TestBed.inject(TopnavComponent)
    authService = TestBed.inject(AuthService);
    let loginInfo: ILogin = {email:'anne@gmail.com', password: '1234'};
    authService.login(loginInfo);
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  // it('check user email', () => {
  //   component.ngOnInit();
  //   expect(component.emailId).toEqual('anne@gmail.com');
  // });

  // it('user logout', () => {
  //   console.log(component.logout())
  //   expect(component.logout()).toEqual();
  // });
});
