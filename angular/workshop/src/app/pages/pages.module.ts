import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgMaterialModule } from '../ng-material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxEchartsModule } from 'ngx-echarts';

import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { UserComponent } from './user/user.component';
import { LayoutComponent } from './layout/layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TaskComponent } from './task/task.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { SprintComponent } from './sprint/sprint.component';
import { SprintDetailComponent } from './sprint-detail/sprint-detail.component';
import { PageNotFoundComponent } from './not-found.component';


@NgModule({
  declarations: [
    HomeComponent,
    UserComponent,
    LayoutComponent,
    LoginComponent,
    SignupComponent,
    TaskComponent,
    TaskDetailComponent,
    SprintComponent,
    SprintDetailComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserAnimationsModule,
    NgMaterialModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    NgxEchartsModule,
    FormsModule,
    CommonModule
    // ReactiveFormsModule
  ],
  exports: [LayoutComponent]
})
export class PagesModule { }
