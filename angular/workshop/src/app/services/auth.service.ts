import { User } from './../entity/user';
import { Api } from './api';
import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/share';

@Injectable()
export class AuthService {
    isLoggedIn = false;

    // store the URL so we can redirect after logging in
    redirectUrl: string;

    constructor(private api: Api, private router: Router) { }

    logIn(user: User): Observable<ArrayBuffer> {
        let seq = this.api.post("api/auth/logIn", user).share();

        seq.subscribe((res: any) => {
            console.log(res);
            this.isLoggedIn = res.isSuccessful;

            if (this.isLoggedIn) {
                this.redirect();
            }
        }, err => {
            console.error("ERROR", err);
        });

        return seq;
    }

    signUp(user: User): Observable<ArrayBuffer> {
        let seq = this.api.post("api/auth/signUp", user).share();

        seq.subscribe((res: any) => {
            this.isLoggedIn = res.isSuccessful;

            if (this.isLoggedIn) {
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
    }
}