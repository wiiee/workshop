import { JiraService } from './services/jira.service';
import { MetricService } from './services/metric.service';
import { SprintService } from './services/sprint.service';
import { LocalStorageService } from './services/local-storage.service';
import { TeamService } from './services/team.service';
import { httpInterceptorProviders } from './services/http-interceptors/index';
import { Api } from './services/api';
import { TaskService } from './services/task.service';
import { AuthGuard } from './services/auth-guard.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { EnumService } from './services/enum.service';
import { RequestCache, RequestCacheWithMap } from './services/request-cache.service';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PagesModule,
    HttpClientModule
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
    LocalStorageService,
    { provide: RequestCache, useClass: RequestCacheWithMap },
    httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
