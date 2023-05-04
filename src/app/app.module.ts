import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';
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
import { DailyScheduleComponent } from './shared/components/daily-schedule/daily-schedule.component';
import { AttendenceComponent } from './pages/components/attendence/attendence.component';
import { AttendanceHeaderComponent } from './pages/components/attendence/attendance-header/attendance-header.component';
import { AttendanceContentComponent } from './pages/components/attendence/attendance-content/attendance-content.component';
import { NavigateAttendanceComponent } from './pages/components/attendence/navigate-attendance/navigate-attendance.component';
import { LibraryComponent } from './shared/components/library/library.component';
import { BooksComponent } from './shared/components/library/books/books.component';
import { LibraryProfileComponent } from './shared/components/library/library-profile/library-profile.component';
import { BorrowCartComponent } from './shared/components/library/borrow-cart/borrow-cart.component';
import { LibraryOverviewComponent } from './shared/components/library/library-overview/library-overview.component';
import { PreBookListComponent } from './shared/components/library/pre-book-list/pre-book-list.component';
import { SearchComponent } from './core/components/search/search.component';
import { AuthInterceptor } from './core/service/crud/auth/auth-interceptor';

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
    ProfileComponent,
    DailyScheduleComponent,
    AttendenceComponent,
    AttendanceHeaderComponent,
    AttendanceContentComponent,
    NavigateAttendanceComponent,
    LibraryComponent,
    BooksComponent,
    LibraryProfileComponent,
    BorrowCartComponent,
    LibraryOverviewComponent,
    PreBookListComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule
    // RouterModule.forRoot(routes),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
