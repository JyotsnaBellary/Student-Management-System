import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/core/service/auth/auth.service';
import { IEntity } from '../../entities/Entity.entity';
import { ILogin } from '../../entities/login.entity';

import { DetailsComponent } from './details.component';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let authService: AuthService;

  beforeAll(() => {
    
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsComponent ],
      imports:[RouterTestingModule.withRoutes([])],
      providers: [DetailsComponent, { provide:AuthService }]
      
    })
    .compileComponents();
    fixture = TestBed.createComponent(DetailsComponent);
    // component = fixture.componentInstance;
    component = TestBed.inject(DetailsComponent)
    authService = TestBed.inject(AuthService);
    let loginInfo: ILogin = {email:'anne@gmail.com', password: '1234'};
    authService.login(loginInfo);
  });

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(DetailsComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  //   // component.ngOnInit();
  // });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('check user', ()=>{
    component.ngOnInit();
    expect(component.isUser).toEqual('student');
    expect(component.details?.userId).toEqual('1A001');
  });

  
  it('Is user Teacher?', () => {
    let loginInfo: ILogin = {email:'John@gmail.com', password: 'T1234'};
    authService.login(loginInfo);
    component.ngOnInit();
    expect(component.isUser).toEqual('teacher');
  });

  it('Is user student?', () => {
    let loginInfo: ILogin = {email:'anne@gmail.com', password: '1234'};
    authService.login(loginInfo);
    component.ngOnInit();
    expect(component.isUser).toEqual('student');
  });
});
