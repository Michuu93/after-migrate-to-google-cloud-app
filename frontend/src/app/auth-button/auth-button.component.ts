import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../user/user.service";
import {Subscription} from "rxjs";
import {environment} from "../../environments/environment";
import GoogleUser = gapi.auth2.GoogleUser;

@Component({
  selector: 'app-auth-button',
  template: `
    <mat-card class="card-content">
      <div class="centerButton">
        <button (click)="authenticate()" *ngIf="!user" color="primary" mat-raised-button>Login
        </button>
      </div>
      <ng-container *ngIf="user">
        <div class="userProfile">
          <img [src]="user.getBasicProfile().getImageUrl()" alt="userPhoto" class="userImg"/>
          <div class="userName">{{user?.getBasicProfile()?.getName()}}</div>
          <div class="centerButton">
            <button (click)="logout()" color="accent" mat-raised-button>Logout</button>
          </div>
        </div>
        <mat-form-field class="tokenText" floatLabel="always">
          <input matInput placeholder="Access Token" name="accessToken" readonly
                 [ngModel]="user.getAuthResponse(true).access_token">
        </mat-form-field>
      </ng-container>
    </mat-card>
  `,
  styleUrls: ['./auth-button.component.scss']
})
export class AuthButtonComponent implements OnInit, OnDestroy {
  gapiSetup: boolean = false;
  authInstance: gapi.auth2.GoogleAuth;
  user: GoogleUser;
  userSubscription: Subscription;

  constructor(private cdRef: ChangeDetectorRef, private userService: UserService) {
    this.userSubscription = this.userService.user$.subscribe(user => {
      this.user = user;
      this.cdRef.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  async ngOnInit() {
    if (await this.checkIfUserAuthenticated()) {
      this.userService.setUser(this.authInstance.currentUser.get());
    }
  }

  async initGoogleAuth(): Promise<void> {
    const pload = new Promise((resolve) => {
      gapi.load('auth2', resolve);
    });

    return pload.then(async () => {
      await gapi.auth2
        .init({
          client_id: environment.clientId,
          scope: 'https://www.googleapis.com/auth/pubsub https://www.googleapis.com/auth/datastore'
        })
        .then(auth => {
          this.gapiSetup = true;
          this.authInstance = auth;
        });
    });
  }

  async authenticate(): Promise<gapi.auth2.GoogleUser> {
    if (!this.gapiSetup) {
      await this.initGoogleAuth();
    }

    return new Promise(async () => {
      this.userService.setUser(await this.authInstance.signIn());
    });
  }

  async checkIfUserAuthenticated(): Promise<boolean> {
    if (!this.gapiSetup) {
      await this.initGoogleAuth();
    }

    return this.authInstance.isSignedIn.get();
  }

  logout(): void {
    this.authInstance.signOut().then(() => {
      this.userService.setUser(undefined);
      this.authInstance.disconnect();
      this.cdRef.detectChanges();
    });
  }

}
