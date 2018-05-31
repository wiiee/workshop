import { AuthService } from './auth.service';
import { of ,  Observable } from 'rxjs';
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