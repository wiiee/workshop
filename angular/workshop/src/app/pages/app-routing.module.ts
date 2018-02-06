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

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: 'home', component: HomeComponent },
  {
    path: 'user',
    canActivate: [AuthGuard],
    component: UserComponent
  },
  { path: 'logIn', component: LoginComponent },
  { path: 'signUp', component: SignupComponent },
  { path: 'tasks', component: TaskComponent },
  { path: 'task/:id', component: TaskDetailComponent },
  { path: 'sprints', component: SprintComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
