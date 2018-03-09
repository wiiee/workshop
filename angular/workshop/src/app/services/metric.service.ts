import { TaskMetric } from './../entity/task-metric';
import { Pair } from './../entity/pair';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { Api } from './api';
import { Team } from './../entity/team';
import { BaseService } from './base.service';

@Injectable()
export class MetricService {
  constructor(private api: Api) {

  }

  getByUserId(userId: string): Observable<TaskMetric> {
    return this.api.get("/api/metric/user/" + userId);
  }

  getByTeamId(teamId: string): Observable<TaskMetric> {
    return this.api.get("/api/metric/team/" + teamId);
  }
}