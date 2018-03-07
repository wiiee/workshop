import { PointList } from './../entity/point-list';
import { Pair } from './../entity/pair';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { Api } from './api';
import { Team } from './../entity/team';
import { BaseService } from './base.service';
import { MetricPoint } from '../entity/metric-point';

@Injectable()
export class MetricService {
  constructor(private api: Api) {

  }

  getByUserId(userId: string): Observable<PointList> {
    return this.api.get("/api/metric/user/" + userId);
  }

  getByTeamId(teamId: string): Observable<Map<string, PointList>> {
    return this.api.get("/api/metric/team/" + teamId);
  }
}