import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Pair } from './../entity/pair';
import { User } from './../entity/user';
import { Api } from './api';
import { BaseService } from './base.service';

@Injectable()
export class UserService extends BaseService<User> {
    userPairs: Pair<string, string>[];

    constructor(api: Api) {
        super(api, "/api/user");
        this.userPairs = [];
        this.getUserPairs().subscribe(res => {
            res.forEach(item => {
                let key = Object.keys(item)[0];
                this.userPairs.push(
                    {
                        key: key,
                        value: item[key]
                    }
                );
            });
        });
    }

    getOwnerPairs(): Observable<Pair<string, string>[]> {
        return this.api.get("/api/user/ownerPairs");
    }

    getUserPairs(): Observable<Pair<string, string>[]> {
        return this.api.get("/api/user/userPairs");
    }

    getUserPairsByTeamId(teamId: string): Observable<Pair<string, string>[]> {
        return this.api.get("/api/user/userPairs/" + teamId);
    }

    getDisplayNameByUserId(userId: string): string {
        if (this.userPairs) {
            return this.userPairs.find(o => o.key === userId).value
        }

        return "";
    }
}