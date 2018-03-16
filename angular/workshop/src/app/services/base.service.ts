import { Entity } from "../entity/entity";
import { Injectable } from '@angular/core';

import { Api } from './api';
import { ServiceResult } from './../entity/service-result';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

export abstract class BaseService<T extends Entity>{
    constructor(public api: Api, public endpoint: string) {
    }

    getAll(): Observable<ServiceResult<T>> {
        return this.api.get(this.endpoint);
    }

    getOne(id: string | number, containerId: string = null): Observable<ServiceResult<T>> {
        if (containerId) {
            return this.api.get(this.endpoint + "/item/" + id);
        }

        return this.api.get(this.endpoint + "/" + id);
    }

    getByIds(ids: Array<string | number>): Observable<ServiceResult<T>> {
        return this.api.post(this.endpoint + "/items", ids);
    }

    update(item: T, containerId: string = null): Observable<ServiceResult<T>> {
        if (containerId) {
            return this.api.post(this.endpoint + "/item", item);
        }

        return this.api.post(this.endpoint, item);
    }

    add(item: T, containerId: string = null): Observable<ServiceResult<T>> {
        if (containerId) {
            return this.api.put(this.endpoint + "/item/" + containerId, item);
        }

        return this.api.put(this.endpoint, item);
    }

    delete(id: string | number, containerId: string = null): Observable<ServiceResult<T>> {
        if (containerId) {
            return this.api.delete(this.endpoint + "/item/" + id);
        }

        return this.api.delete(this.endpoint + "/" + id);
    }
}