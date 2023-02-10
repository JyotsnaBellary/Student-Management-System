import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopnavComponent } from './core/components/topnav/topnav.component';
import { SidenavComponent } from './core/components/sidenav/sidenav.component';
import { SignInComponent } from './pages/components/sign-in/sign-in.component';
import { DashboardComponent } from './core/components/dashboard/dashboard.component';
import { HolidaysComponent } from './pages/components/holidays/holidays.component';
import { DetailsComponent } from './shared/components/details/details.component';
import { HolidayTableComponent } from './core/components/holiday-table/holiday-table.component';
import { ScheduleComponent } from './shared/components/schedule/schedule.component';
import { ExaminationsComponent } from './shared/components/examinations/examinations.component';
import { LeaveApplicationComponent } from './pages/components/leave-application/leave-application.component';
import { LeaveTableComponent } from './shared/components/leave-table/leave-table.component';
import { DashboardContainerComponent } from './shared/components/dashboard-container/dashboard-container.component';
import { ProfileComponent } from './pages/components/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    TopnavComponent,
    SidenavComponent,
    SignInComponent,
    DashboardComponent,
    HolidaysComponent,
    DetailsComponent,
    HolidayTableComponent,
    ScheduleComponent,
    ExaminationsComponent,
    LeaveApplicationComponent,
    LeaveTableComponent,
    DashboardContainerComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
