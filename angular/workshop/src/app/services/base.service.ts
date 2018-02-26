import { Entity } from "../entity/entity";
import { Injectable } from '@angular/core';

import { Api } from './api';
import { ServiceResult } from './../entity/service-result';

import { Observable } from 'rxjs/Observable';

export abstract class BaseService<T extends Entity>{
    constructor(public api: Api, private endpoint: string) {
    }

    getAll(): Observable<ServiceResult<T>> {
        return this.api.get(this.endpoint);
    }

    getOne(id: string | number): Observable<ServiceResult<T>> {
        return this.api.get(this.endpoint + "/" + id);
    }

    update(item: T): Observable<ServiceResult<T>> {
        return this.api.post(this.endpoint, item);
    }

    add(item: T): Observable<ServiceResult<T>> {
        return this.api.put(this.endpoint, item);
    }

    delete(id: string | number): Observable<ServiceResult<T>> {
        return this.api.delete(this.endpoint + "/" + id);
    }
}