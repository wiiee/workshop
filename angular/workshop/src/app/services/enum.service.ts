import { Observable } from 'rxjs';
import { Pair } from './../entity/pair';
import { Api } from './api';
import { Injectable } from '@angular/core';

import { Task } from '../entity/task';

@Injectable()
export class EnumService {

  constructor(private api: Api) { }

  getOptions(name: string): Observable<Pair<string, string>[]> {
    return this.api.get<Pair<string, string>[]>("/api/enum/" + name);
  }
}