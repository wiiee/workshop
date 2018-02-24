import { Entity } from "../entity/entity";
import { Injectable } from '@angular/core';

import { Api } from './api';
import { ServiceResult } from './../entity/service-result';

import { Observable } from 'rxjs/Observable';

export abstract class BaseService<T extends Entity>{
    constructor(public api: Api, private endpoint: string) {
    }

    getAll(): Observable<ServiceResult<T>> {
        return this.api.get<ServiceResult<T>>(this.endpoint);
    }

    getOne(id: string): Observable<ServiceResult<T>> {
        return this.api.get<ServiceResult<T>>(this.endpoint + "/" + id);
    }

    update(item: T): Observable<ServiceResult<T>> {
        return this.api.post<ServiceResult<T>>(this.endpoint, item);
    }

    add(item: T): Observable<ServiceResult<T>> {
        return this.api.put<ServiceResult<T>>(this.endpoint, item);
    }

    delete(id: string | number): Observable<ServiceResult<T>> {
        return this.api.delete<ServiceResult<T>>(this.endpoint + "/" + id);
    }
}