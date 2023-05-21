import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AttendanceHeaderComponent } from './attendance-header.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AttendanceHeaderComponent', () => {
  let component: AttendanceHeaderComponent;
  let fixture: ComponentFixture<AttendanceHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule.withRoutes([])],

      declarations: [ AttendanceHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
