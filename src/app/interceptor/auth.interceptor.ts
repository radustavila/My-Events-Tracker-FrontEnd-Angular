import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';


const host = environment.apiUrl

const ALLOWED_APIS = [
  `${host}/auth/login`,
  `${host}/auth/register`,
  `${host}/events`,
]


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // const token: string = localStorage.getItem('token');
    // let condition: Boolean = ALLOWED_APIS.some((api) =>
    // request.url.startsWith(api)
    // );

    // if (!condition) {
    //   request = request.clone({
    //     setHeaders: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });
    // }

    // return next.handle(request)
    // .pipe(
      // map((event: HttpEvent<any>) => {
      //   return event;
      // }),

      // catchError((error: HttpErrorResponse) => {
      //   if (error.status === 403) {
      //     console.log("unfortunately i've entered here")
      //     return next.handle(request.clone({
      //       setHeaders: {
      //         Authorization: `Bearer ${token}`,
      //       }}));
      //   }
      //   return throwError(error)
      // }));
   
    const token: string = localStorage.getItem('token');
    // console.log(token)
    if (token) {
      request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
    }

    if (!request.headers.has('Content-Type')) {
      request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    }

    return next.handle(request);
      // ,
      // catchError((error: HttpErrorResponse) => {
      //   let data = {};
      //   data = {
      //       reason: error && error.error && error.error.reason ? error.error.reason : '',
      //       status: error.status
      //   };
      //   console.log(data)
      //   return throwError(error);
      // }
      // )
      // );
}
}
