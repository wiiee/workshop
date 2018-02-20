import { Api } from './../api';
import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private api: Api) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        /*
        * The verbose way:
        // Clone the request and replace the original headers with
        // cloned headers, updated with the authorization.
        const authReq = req.clone({
          headers: req.headers.set('Authorization', authToken)
        });
        */
        // Clone the request and set the new header in one step.
        if (this.api.authorizationToken) {
            // const authReq = req.clone({
            //     headers: new HttpHeaders().append(Api.AUTH_HEADER, this.api.authorizationToken)
            // });
            const authReq = req.clone({
                headers: req.headers.set(Api.AUTH_HEADER, this.api.authorizationToken)
            });
            return next.handle(authReq);
        }

        return next.handle(req);
    }
}