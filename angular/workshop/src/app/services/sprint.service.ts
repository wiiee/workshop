import { AuthService } from './auth.service';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { Api } from './api';
import { Injectable } from '@angular/core';

import { Sprint } from '../entity/sprint';
import { BaseService } from './base.service';

@Injectable()
export class SprintService extends BaseService<Sprint> {
  constructor(api: Api, private authService: AuthService) { 
    super(api, "/api/sprint");
  }

  getContainerId(): Observable<string> {
    // return this.api.httpClient.get(Api.SERVER_URL + "/api/team/teamId/", { responseType: 'text' });
    return this.api.httpClient.get(Api.SERVER_URL + "/api/team/teamId/" + this.authService.getUserId(), { responseType: 'text' });
  }
}