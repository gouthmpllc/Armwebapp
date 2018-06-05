import { Injectable, Injector } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpHeaders,
    HttpResponse,
    HttpErrorResponse
  } from '@angular/common/http';
import { CookieService } from 'angular2-cookie/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class  AuthorizationInterceptor implements HttpInterceptor {
  constructor(private cookieService: CookieService) {
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    /**
   * Will get the current user data
   */
    const loginData: any = this.cookieService.getObject('loginResponce');
    if (loginData) {
    request = request.clone({headers: request.headers.set('Authorization', loginData.data.id.toString())});
    }
    return next.handle(request);
  }
}
