import { Pair } from './../entity/pair';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { Api } from './api';
import { Team } from './../entity/team';
import { BaseService } from './base.service';

@Injectable()
export class TeamService extends BaseService<Team> {
  constructor(api: Api) { 
    super(api, "/api/team");
  }

  getTeamPairs(): Observable<Pair<string, string>[]> {
    return this.api.get("/api/team/teamPairs");
}
}
