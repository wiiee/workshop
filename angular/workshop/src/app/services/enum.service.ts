import { Api } from './api';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Task } from '../entity/task';

@Injectable()
export class EnumService {

  constructor(private api: Api) { }

  getOptions(name: string): Observable<ArrayBuffer> {
    return this.api.get("api/enum/" + name);
  }
}