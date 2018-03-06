import { ServiceResult } from './../entity/service-result';
import { Pair } from './../entity/pair';
import { Observable } from 'rxjs/Observable';
import { Api } from './api';
import { Injectable } from '@angular/core';

import { Task } from '../entity/task';
import { BaseService } from './base.service';

@Injectable()
export class TaskService extends BaseService<Task> {
  constructor(api: Api) { 
    super(api, "/api/task");
  }

  getTaskPairs(teamId: string): Observable<Pair<string, string>[]> {
    return this.api.get("/api/task/taskPairs/" + teamId || "");
  }

  updatePhase(task: Task): Observable<ServiceResult<Task>> {
    return this.api.post("/api/task/updatePhase", task);
  }
}