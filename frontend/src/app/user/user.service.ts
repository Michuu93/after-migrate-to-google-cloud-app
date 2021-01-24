import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import GoogleUser = gapi.auth2.GoogleUser;

@Injectable()
export class UserService {
  private user: Subject<GoogleUser> = new Subject<GoogleUser>();
  private currentUser: GoogleUser;
  user$: Observable<GoogleUser> = this.user.asObservable();

  setUser(user: GoogleUser): void {
    this.user.next(user);
    this.currentUser = user;
  }

  getCurrentUser(): GoogleUser {
    return this.currentUser;
  }
}
