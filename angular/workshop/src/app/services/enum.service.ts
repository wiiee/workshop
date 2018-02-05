import { Api } from './api';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Task } from '../entity/task';

@Injectable()
export class EnumService {

  constructor(private api: Api) { }

  getOptions(name: string): Observable<ArrayBuffer> {
    // Todo: send the message _after_ fetching the hero
    return this.api.get("api/enum/" + name);
  }
}