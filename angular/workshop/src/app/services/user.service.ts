import { HttpResponse } from '@angular/common/http';
import { ServiceResult } from './../entity/service-result';
import { User } from './../entity/user';
import { Api } from './api';
import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { BaseService } from './base.service';

@Injectable()
export class UserService extends BaseService<User> {
    constructor(api: Api) {
        super(api, "/api/user");
     }

    getOwnerPairs(): Observable<Object> {
        return this.api.get("/api/user/ownerPairs");
    }

    getUserPairs(): Observable<Object> {
        return this.api.get("/api/user/userPairs");
    }
}