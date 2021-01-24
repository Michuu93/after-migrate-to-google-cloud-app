import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {UserService} from "./user/user.service";

@Injectable()
export class AuthorizationInterceptorService implements HttpInterceptor {

  constructor(private userService: UserService) {
  }

  public intercept<T, R>(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<R>> {
    const accessToken = this.userService.getCurrentUser()?.getAuthResponse(true)?.access_token;
    return next.handle(req.clone({
      headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
    }));
  }

}
