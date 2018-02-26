import { Api } from './api';
import { Injectable } from '@angular/core';

import { Task } from '../entity/task';
import { BaseService } from './base.service';

@Injectable()
export class TaskService extends BaseService<Task> {
  constructor(api: Api) { 
    super(api, "/api/task");
  }
}