import { HttpResponse } from '@angular/common/http';
import { ServiceResult } from './../entity/service-result';
import { User } from './../entity/user';
import { Api } from './api';
import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';

@Injectable()
export class UserService {
    public isLoggedIn: boolean = false;
    public authorizationToken: string;

    //当前登录用户
    public user: User;

    // store the URL so we can redirect after logging in
    public redirectUrl: string;

    constructor(private api: Api, private router: Router) { }

    logIn(user: User): Observable<HttpResponse<Object>> {
        this.resetAuth();

        let seq = this.api.httpClient.post(Api.SERVER_URL + "/api/user/logIn", {
            username: user.id,
            password: user.password
        }, { observe: "response" }).share();

        seq.subscribe(res => {
            if (res.status === 200) {
                this.api.authorizationToken = res.headers.get(Api.AUTH_HEADER);

                this.isLoggedIn = true;
                this.user = user;
                this.redirect();
            }
        }, err => {
            console.error("error: " + JSON.stringify(err.error));
        });

        return seq;
    }

    signUp(user: User): Observable<HttpResponse<ServiceResult<User>>> {
        this.resetAuth();

        let seq = this.api.httpClient.post<ServiceResult<User>>(
            Api.SERVER_URL + "/api/user/signUp",
            user, 
            { observe: "response" }).share();

        seq.subscribe(res => {
            if (res.body.isSuccessful) {
                this.api.authorizationToken = res.headers.get(Api.AUTH_HEADER);

                this.isLoggedIn = true;
                this.user = user;
                this.redirect();
            }
        }, err => {
            console.error("error: " + JSON.stringify(err.error));
        });

        return seq;
    }

    private resetAuth(): void {
        this.user = null;
        this.api.authorizationToken = null;
        this.isLoggedIn = false;
    }

    private redirect(): void {
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        let redirect = this.redirectUrl ? this.redirectUrl : '/home';

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
        this.isLoggedIn = false;
        this.user = null;
        this.authorizationToken = null;
        this.router.navigate(['/home']);
    }

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