import { Api } from './services/api';
import { TaskService } from './services/task.service';
import { AuthGuard } from './services/auth-guard.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { EnumService } from './services/enum.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PagesModule,
    HttpClientModule
  ],
  providers: [Api, AuthGuard, AuthService, TaskService, EnumService],
  bootstrap: [AppComponent]
})
export class AppModule { }
