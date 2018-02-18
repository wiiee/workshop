import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Api } from './api';
import { Team } from './../entity/team';
import { ServiceResult } from './../entity/service-result';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class TeamService {
  constructor(private api: Api, private httpClient: HttpClient) { }

  getTeams(): Observable<ServiceResult<Team>> {
    console.log(this.api.url);
    return this.httpClient.get<ServiceResult<Team>>(this.api.url + "/api/team");
  }

  getTeam(id: string): Observable<ServiceResult<Team>> {
    return this.httpClient.get<ServiceResult<Team>>(this.api.url + "/api/team/" + id);
  }
}
