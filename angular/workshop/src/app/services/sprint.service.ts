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
}