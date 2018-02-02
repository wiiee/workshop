import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgMaterialModule } from '../ng-material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { UserComponent } from './user/user.component';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [HomeComponent, UserComponent, LayoutComponent],
  imports: [
    BrowserAnimationsModule,
    NgMaterialModule,
    AppRoutingModule,
    NgbModule.forRoot()
  ],
  exports: [HomeComponent, UserComponent, LayoutComponent]
})
export class PagesModule { }
