import { Injectable } from '@angular/core';

import { Api } from './api';
import { Team } from './../entity/team';
import { ServiceResult } from './../entity/service-result';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class TeamService {
  constructor(private api: Api) { }

  getTeams(): Observable<ServiceResult<Team>> {
    return this.api.get<ServiceResult<Team>>("/api/team");
  }

  getTeam(id: string): Observable<ServiceResult<Team>> {
    return this.api.get<ServiceResult<Team>>("/api/team/" + id);
  }
}
