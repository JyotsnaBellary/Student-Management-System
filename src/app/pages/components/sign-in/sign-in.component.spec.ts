import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/core/service/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { SignInComponent } from './sign-in.component';
import { FormsModule } from '@angular/forms';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignInComponent ],
      imports:[RouterTestingModule.withRoutes([]), HttpClientModule, FormsModule],
      providers:[{provide:AuthService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check click event of login', () => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
        component.email = "anne@gmail.com"
        component.password = "12345"
        component.successMessage = ""
        console.log(component.successMessage, "here")
        // const element: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('#loginButton')
        // element.click();
        // expect(component.successMessage).toEqual('Logged in')
        console.log(component.successMessage)

    });
  });

  it('checking Login', () => {
      component.email = "anne@gmail.com"
      component.password = "1234"
  });
});
