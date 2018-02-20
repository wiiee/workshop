import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  public static readonly SERVER_URL: string = 'http://localhost:8080';
  public static readonly AUTH_HEADER: string = "Authorization";

  public static JSON_HTTP_OPTIONS = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  
  public authorizationToken: string;

  constructor(public httpClient: HttpClient) {
  }

  get(endpoint: string, params?: any, reqOpts?: any) {
    reqOpts = reqOpts || {};

    // Support easy query params for GET requests
    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        reqOpts.params = reqOpts.params.set(k, params[k]);
      }
    }

    return this.httpClient.get(Api.SERVER_URL + '/' + endpoint, reqOpts);
  }

  post(endpoint: string, body: any, reqOpts?: any) {
    if (this.authorizationToken) {
      reqOpts = reqOpts || {};
      reqOpts.headers = new HttpHeaders().append(Api.SERVER_URL, this.authorizationToken)
    }

    return this.httpClient.post(Api.SERVER_URL + '/' + endpoint, body, reqOpts);
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    return this.httpClient.put(Api.SERVER_URL + '/' + endpoint, body, reqOpts);
  }

  delete(endpoint: string, reqOpts?: any) {
    return this.httpClient.delete(Api.SERVER_URL + '/' + endpoint, reqOpts);
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    return this.httpClient.put(Api.SERVER_URL + '/' + endpoint, body, reqOpts);
  }

  public handleError(error: HttpErrorResponse): ErrorObservable {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      'Something bad happened; please try again later.');
  };
}