import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@core/security/authentication/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.auth.token.token//this.auth.tokenValue;
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.token.token}`,
          Accept: 'application/json',
        },
      });
    }
    return next.handle(request);
  }
}
