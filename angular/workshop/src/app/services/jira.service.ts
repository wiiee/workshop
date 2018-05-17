import { Observable } from 'rxjs/Observable';
import { Api } from './api';
import { Injectable } from '@angular/core';

@Injectable()
export class JiraService {
  constructor(private api: Api) {
  }

  export(): Observable<void> {
    return this.api.get("/api/jira/export");
  }

  metric(): Observable<void> {
    return this.api.get("/api/jira/metric");
  }
}
