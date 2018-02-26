import { Api } from './api';
import { Injectable } from '@angular/core';

import { BaseService } from './base.service';
import { Sprint } from '../entity/sprint';

@Injectable()
export class SprintService extends BaseService<Sprint> {
  constructor(api: Api) { 
    super(api, "/api/team");
  }
}