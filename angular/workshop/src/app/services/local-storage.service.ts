import { Team } from './../entity/team';
import { User } from './../entity/user';
import { Injectable } from '@angular/core';
import { Constant } from '../entity/constant';

@Injectable()
export class LocalStorageService {
    private localStorage: Storage;

    constructor() { 
        this.localStorage = window.localStorage;
    }

    getItem(key: string): string {
        return this.localStorage.getItem(key);
    }

    setItem(key: string, data: string): void {
        this.localStorage.setItem(key, data);
    }

    clear(): void {
        this.localStorage.clear();
    }

    removeItem(key: string): void {
        this.localStorage.removeItem(key);
    }

    storeAuthorization(user: User, team: Team, authorizationToken: string){
        this.setItem(Constant.USER, JSON.stringify(user));
        this.setItem(Constant.TEAM, JSON.stringify(team));
        this.setItem(Constant.AUTHORIZATION_TOKEN, authorizationToken);
    }
}