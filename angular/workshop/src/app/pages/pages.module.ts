import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgMaterialModule } from '../ng-material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxEchartsModule } from 'ngx-echarts';

import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { UserComponent } from './user/user.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeComponent, UserComponent, LayoutComponent, LoginComponent, SignupComponent],
  imports: [
    BrowserAnimationsModule,
    NgMaterialModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    NgxEchartsModule,
    FormsModule
  ],
  exports: [HomeComponent, UserComponent, LayoutComponent, LoginComponent, SignupComponent]
})
export class PagesModule { }
