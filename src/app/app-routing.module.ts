import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './pages/components/sign-in/sign-in.component';
import { DashboardComponent } from './core/components/dashboard/dashboard.component';
import { HolidaysComponent } from './pages/components/holidays/holidays.component';
import { ScheduleComponent } from './shared/components/schedule/schedule.component';
import { ExaminationsComponent } from './shared/components/examinations/examinations.component';
import { LeaveApplicationComponent } from './pages/components/leave-application/leave-application.component';
import { ProfileComponent } from './pages/components/profile/profile.component';
import { AttendenceComponent } from './pages/components/attendence/attendence.component';
import { LibraryComponent } from './shared/components/library/library.component';
import { BooksComponent } from './shared/components/library/books/books.component';
import { LibraryProfileComponent } from './shared/components/library/library-profile/library-profile.component';
import { LibraryOverviewComponent } from './shared/components/library/library-overview/library-overview.component';
const routes: Routes = [
  {path: 'sign_in', component: SignInComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'holidays', component: HolidaysComponent},
  {path: 'schedule', component: ScheduleComponent},
  {path: 'examinations', component:ExaminationsComponent},
  {path: 'leaveApplication', component:LeaveApplicationComponent},
  {path: 'profile', component:ProfileComponent},
  {path: 'attendance', component:AttendenceComponent},
  {path: 'library', component: LibraryComponent,
   children: [
    {
      path: '',
      redirectTo: 'overview',
      pathMatch: 'full'
    },
    {
      path: 'overview',
      component: LibraryOverviewComponent,
    },
    {
      path: 'myProfile', // child route path
      component: LibraryProfileComponent, // child route component that the router renders
    },
    {
      path: 'books',
      component: BooksComponent, // another child route component that the router renders
    },
  ],},
  {path: '', component: SignInComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
