import { Injectable } from '@angular/core';
import { AppSettings } from '../../apiUrl';
import { HttpClient } from '@angular/common/http';
import { Http, Response, RequestOptions } from '@angular/http';
import { Router, CanActivate } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import 'rxjs/add/operator/map';

@Injectable()
export class SignInService implements CanActivate {

  constructor(private httpClient: HttpClient, private router: Router, private cookieService: CookieService) { }
/**
 * To signin for current user, if successfull navigate to dashboard page
 * @param {any} requestData - current login user data
 * @returns {}
 * {
 * "status": "success","data": {
 * "id": "KfAeuHuuYAnwKZ3BbZGN8qk2LskKl00Zc88yN2Ih8yyKZYKA8miKnqLALNsOJPbf",
 * "ttl": 1209600,
 * "created": "2018-05-30T06:19:25.344Z",
 * "userId": "5b0d44052e36437dfadbed31",
 * "superVisor": {
 *   "username": "123456",
 *   "id": "5b0d44052e36437dfadbed31"
 *  },
 * role:"SUPERADMIN" or role:"ADMIN"
  }}
 * @memberof SignInService
 */
signIn(requestData) {
  return this.httpClient.post(AppSettings.API_ENDPOINT + `SuperVisors/login`, requestData)
  .map((res: Response) => res);
}

finishAuthentication(token, loginResponce): void {
  this.cookieService.putObject('token', token);
  if (loginResponce.data.role === 'SUPERADMIN') {
    this.router.navigate(['superAdmin/dashboard']);
  } else if (loginResponce.data.role === 'ADMIN') {
    this.router.navigate(['admin/dashboard']);
  }
}

isAuthenticated(): boolean {
  // return tokenNotExpired('token');
  if (this.cookieService.getObject('token')) {
    return true;
  } else {
    return false;
  }
}

canActivate() {
  // if (localStorage.getItem('token')) {
  if (this.isAuthenticated()) {
    return true;
  } else {
    this.router.navigate(['login']);
  }
}

getLoginData() {
  return this.cookieService.getObject('loginResponce');
}

logout(): void {
  // localStorage.removeItem('token');
  this.cookieService.remove('token');
  this.cookieService.removeAll();
}

}
