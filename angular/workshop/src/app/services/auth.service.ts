import { UserService } from './user.service';
import { LocalStorageService } from './local-storage.service';
import { HttpResponse } from '@angular/common/http';
import { ServiceResult } from './../entity/service-result';
import { User } from './../entity/user';
import { Api } from './api';
import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import { Constant } from '../entity/constant';
import { Role } from '../entity/role';

@Injectable()
export class AuthService {
    isLoggedIn: boolean = false;
    user: User;

    // store the URL so we can redirect after logging in
    redirectUrl: string;

    constructor(private api: Api,
        private router: Router,
        private userService: UserService,
        private localStorageService: LocalStorageService) { }

    logIn(user: User): Observable<HttpResponse<Object>> {
        this.clearAuthorization();

        let seq = this.api.httpClient.post(Api.SERVER_URL + "/api/user/logIn", {
            username: user.id,
            password: user.password
        }, { observe: "response" }).share();

        seq.subscribe(res => {
            if (res.status === 200) {
                this.userService.getOne(user.id).subscribe(result => {
                    this.user = result.data;
                    this.successAuthorization(this.user, res.headers.get(Constant.AUTHORIZATION_HEADER));
                });
            }
        }, err => {
            console.error("error: " + JSON.stringify(err.error));
        });

        return seq;
    }

    signUp(user: User): Observable<HttpResponse<ServiceResult<User>>> {
        this.clearAuthorization();

        let seq = this.api.httpClient.post<ServiceResult<User>>(
            Api.SERVER_URL + "/api/user/signUp",
            user,
            { observe: "response" }).share();

        seq.subscribe(res => {
            if (res.body.isSuccessful) {
                this.successAuthorization(user, res.headers.get(Constant.AUTHORIZATION_HEADER));
            }
        }, err => {
            console.error("error: " + JSON.stringify(err.error));
        });

        return seq;
    }

    private successAuthorization(user: User, authorizationToken: string): void {
        this.localStorageService.storeAuthorization(user, authorizationToken);
        this.isLoggedIn = true;
        this.user = user;
        this.redirect();
    }

    private clearAuthorization(): void {
        this.localStorageService.clear();
        this.isLoggedIn = false;
        this.user = null;
    }

    private redirect(): void {
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        // let redirect = this.redirectUrl ? this.redirectUrl : '/home';
        let redirect = this.redirectUrl || "/home";

        // Set our navigation extras object
        // that passes on our global query params and fragment
        let navigationExtras: NavigationExtras = {
            queryParamsHandling: 'preserve',
            preserveFragment: true
        };

        // Redirect the user
        this.router.navigate([redirect], navigationExtras);
    }

    logOut(): void {
        this.clearAuthorization();
        this.router.navigate(['/home']);
    }

    getUserId(): string {
        return this.user ? this.user.id : null;
    }

    getRole(): Role {
        if (!this.isLoggedIn) {
            return Role.Anonym;
        }

        return Role[this.user.role];
    }

    isAdmin(): boolean {
        return this.getRole() === Role.Admin;
    }
}