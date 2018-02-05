import { Api } from './api';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Task } from '../entity/task';

@Injectable()
export class SprintService {

  constructor(private api: Api) { }

  getTasks(): Observable<Task[]> {
    return of([]);
  }

  getTask(id: number): Observable<Task> {
    // Todo: send the message _after_ fetching the hero
    return of();
  }
}