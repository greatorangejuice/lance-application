import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const user = this.authService.userValue;
    // @ts-ignore
    const isLoggedIn = user && user.access_token;
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    if (isLoggedIn && isApiUrl) {
      // @ts-ignore
      console.log(user.access_token);
      const clonedReq = request.clone({
        setHeaders: {
          // @ts-ignore
          Authorization: `Bearer ${user.access_token}`,
        },
      });
      return next.handle(clonedReq);
    }
    console.log(request.headers);
    return next.handle(request);
  }
}
