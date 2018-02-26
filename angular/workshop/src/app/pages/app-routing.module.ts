import { WeeklyComponent } from './report/weekly/weekly.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { TeamComponent } from './team/team.component';
import { TaskComponent } from './task/task.component';
import { AuthGuard } from './../services/auth-guard.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SprintComponent } from './sprint/sprint.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { PageNotFoundComponent } from './not-found.component';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import { PerformanceComponent } from './report/performance/performance.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: 'home', component: HomeComponent },
  {
    path: 'user',
    // canActivate: [AuthGuard],
    component: UserComponent
  },
  {
    path: 'user/:id',
    // canActivate: [AuthGuard],
    component: UserDetailComponent
  },
  {
    path: 'team',
    // canActivate: [AuthGuard],
    component: TeamComponent
  },
  {
    path: 'team/:id',
    // canActivate: [AuthGuard],
    component: TeamDetailComponent
  },
  { path: 'logIn', component: LoginComponent },
  { path: 'signUp', component: SignupComponent },
  { path: 'task', component: TaskComponent },
  { path: 'task/:id', component: TaskDetailComponent },
  { path: 'sprint', component: SprintComponent },
  { path: 'weekly', component: WeeklyComponent },
  { path: 'performance', component: PerformanceComponent }, 
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
