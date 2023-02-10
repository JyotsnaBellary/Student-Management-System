import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './pages/components/sign-in/sign-in.component';
import { DashboardComponent } from './core/components/dashboard/dashboard.component';
import { HolidaysComponent } from './pages/components/holidays/holidays.component';
import { ScheduleComponent } from './shared/components/schedule/schedule.component';
import { ExaminationsComponent } from './shared/components/examinations/examinations.component';
import { LeaveApplicationComponent } from './pages/components/leave-application/leave-application.component';
import { ProfileComponent } from './pages/components/profile/profile.component';
const routes: Routes = [
  {path: 'sign_in', component: SignInComponent},
  {path: 'Dashboard', component: DashboardComponent},
  {path: 'Holidays', component: HolidaysComponent},
  {path: 'Schedule', component: ScheduleComponent},
  {path: 'examinations', component:ExaminationsComponent},
  {path: 'leaveApplication', component:LeaveApplicationComponent},
  {path: 'profile', component:ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
