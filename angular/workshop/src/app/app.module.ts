import { httpInterceptorProviders } from './services/http-interceptors/index';
import { EnumService } from './services/enum.service';
import { TaskService } from './services/task.service';
import { Api } from './services/api';
import { JiraService } from './services/jira.service';
import { MetricService } from './services/metric.service';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { PagesModule } from './pages/pages.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from './services/user.service';
import { TeamService } from './services/team.service';
import { SprintService } from './services/sprint.service';
import { RequestCache, RequestCacheWithMap } from './services/request-cache.service';
import { TimeSheetService } from './services/timeSheet.service';
import { LocalStorageService } from './services/local-storage.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    PagesModule
  ],
  providers: [
    Api,
    AuthService,
    AuthGuard,
    UserService,
    TaskService,
    TeamService,
    EnumService,
    SprintService,
    MetricService,
    JiraService,
    TimeSheetService,
    LocalStorageService,
    { provide: RequestCache, useClass: RequestCacheWithMap },
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
