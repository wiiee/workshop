import { ServiceResult } from './../entity/service-result';
import { HttpClient } from '@angular/common/http';
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

    constructor(private api: Api, private httpClient: HttpClient, private router: Router) { }

    logIn(user: User): Observable<ArrayBuffer> {
        this.user = null;
        let seq = this.api.post("login", {
            username: user.id,
            password: user.password
        }, { observe: 'response' }).share();

        seq.subscribe((res: any) => {
            if (res.status === 200) {
                this.api.authorizationToken = res.headers.get(this.api.authHeader);

                console.log(res);
                this.isLoggedIn = true;
                this.user = user;
                this.redirect();
            }
        }, err => {
            console.error("logIn error: " + err.error.errorMsg);
        });

        return seq;
    }

    signUp(user: User): Observable<ArrayBuffer> {
        this.user = null;
        let seq = this.api.post("api/user/signUp", user).share();

        seq.subscribe((res: any) => {
            this.isLoggedIn = res.isSuccessful;

            if (this.isLoggedIn) {
                this.user = user;
                this.redirect();
            }
        }, err => {
            console.error("ERROR", err);
        });

        return seq;
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
        console.log(this.api.url);
        return this.httpClient.get<ServiceResult<User>>(this.api.url + "/api/user");
    }

    getUser(id: string): Observable<ServiceResult<User>> {
        return this.httpClient.get<ServiceResult<User>>(this.api.url + "/api/user/" + id);
    }
}