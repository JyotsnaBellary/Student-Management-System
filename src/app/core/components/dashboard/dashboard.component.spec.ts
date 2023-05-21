import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DetailsComponent } from 'src/app/shared/components/details/details.component';
import { LeaveTableComponent } from 'src/app/shared/components/leave-table/leave-table.component';
import { HolidayTableComponent } from '../holiday-table/holiday-table.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent, DetailsComponent, HolidayTableComponent, LeaveTableComponent ],
      imports:[ RouterTestingModule, RouterTestingModule.withRoutes([]),
               RouterModule, FormsModule, HttpClientModule,
              ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
