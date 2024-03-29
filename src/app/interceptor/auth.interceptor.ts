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
import { catchError, map } from 'rxjs/operators';
import { UtilsService } from '../services/utils.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private utilsService: UtilsService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token: string = localStorage.getItem('token');
    const lastModified: string = localStorage.getItem('last-modified') ? localStorage.getItem('last-modified') : "0"

    if (token && token !== '') {
      request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
    }

    if (!request.headers.has('Content-Type')) {
      request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    }

    request = request.clone({ headers: request.headers.set('X-If-Modified-Since', lastModified) });

    return next.handle(request)
      .pipe(
        map((event: HttpEvent<any>) => {
          // if (event instanceof HttpResponse) {
          //   console.log('event--->>>', event);
          // }
          return event;
        }),
        catchError((error: HttpErrorResponse) => {
          let data = {};
          data = {
            reason: error && error.error && error.error.reason ? error.error.reason : '',
            status: error.status
          };
          // console.log(data)
          if (error.status !== 304) {
            this.utilsService.openFailSnackBar("Request failed!")
          }
          return throwError(error);
        })
      );
  }
}
