import { HttpResponse } from '@angular/common/http';
import { ServiceResult } from './../entity/service-result';
import { User } from './../entity/user';
import { Api } from './api';
import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
    constructor(private api: Api) { }

    getUsers(): Observable<ServiceResult<User>> {
        return this.api.get<ServiceResult<User>>("/api/user");
    }

    getUser(id: string): Observable<ServiceResult<User>> {
        return this.api.get<ServiceResult<User>>("/api/user/" + id);
    }

    getOwnerPairs(): Observable<Object> {
        return this.api.get("/api/user/ownerPairs");
    }

    getUserPairs(): Observable<Object> {
        return this.api.get("/api/user/userPairs");
    }

    updateUser(user: User): Observable<ServiceResult<User>> {
        return this.api.post<ServiceResult<User>>("/api/user", user);
    }

    addUser(user: User): Observable<ServiceResult<User>> {
        return this.api.put<ServiceResult<User>>("/api/user", user);
    }

    deleteUser(id: string): Observable<ServiceResult<User>> {
        return this.api.delete<ServiceResult<User>>("/api/user/" + id);
    }
}