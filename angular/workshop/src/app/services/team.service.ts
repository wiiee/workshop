import { Injectable } from '@angular/core';

import { Api } from './api';
import { Team } from './../entity/team';
import { ServiceResult } from './../entity/service-result';

import { Observable } from 'rxjs/Observable';
import { BaseService } from './base.service';

@Injectable()
export class TeamService extends BaseService<Team> {
  constructor(api: Api) { 
    super(api, "/api/team");
  }
}
