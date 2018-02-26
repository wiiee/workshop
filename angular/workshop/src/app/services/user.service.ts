import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Pair } from './../entity/pair';
import { User } from './../entity/user';
import { Api } from './api';
import { BaseService } from './base.service';

@Injectable()
export class UserService extends BaseService<User> {
    constructor(api: Api) {
        super(api, "/api/user");
     }

    getOwnerPairs(): Observable<Pair<string, string>[]> {
        return this.api.get("/api/user/ownerPairs");
    }

    getUserPairs(): Observable<Pair<string, string>[]> {
        return this.api.get("/api/user/userPairs");
    }
}