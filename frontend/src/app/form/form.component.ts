import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {FormService} from "./form.service";
import {Data} from "./data";
import {Subscription} from 'rxjs';
import {UserService} from "../user/user.service";

@Component({
  selector: 'app-form',
  template: `
    <ng-container *ngIf="accessToken">
      <mat-card class="card-content">
        <form class="form">
          <mat-form-field floatLabel="always">
            <input matInput placeholder="manufacturer" name="manufacturer" [(ngModel)]="data.manufacturer">
          </mat-form-field>
          <mat-form-field floatLabel="always">
            <input matInput placeholder="model" name="model" [(ngModel)]="data.model">
          </mat-form-field>
        </form>
        <div>Data to send:
          <pre>{{ data | json }}</pre>
        </div>
        <div *ngIf="saveResponse">Response:
          <pre>{{ saveResponse | json }}</pre>
        </div>
        <div class="rightButton">
          <button (click)="sendData()" color="primary" mat-raised-button>Send</button>
        </div>
      </mat-card>
      <mat-card class="card-content">
        <form class="form">
          <mat-form-field floatLabel="always">
            <input matInput placeholder="uuid" name="uuid" [(ngModel)]="uuid" class="uuid">
          </mat-form-field>
        </form>
        <div *ngIf="findByUuidResponse">Response:
          <pre>{{ findByUuidResponse | json }}</pre>
        </div>
        <div class="rightButton">
          <button *ngIf="saveResponse && saveResponse['uuid']" (click)="copyUuid()" color="secondary" mat-raised-button>
            Copy
            UUID
          </button>
          <button (click)="findByUuid()" color="primary" mat-raised-button>Find</button>
        </div>
      </mat-card>
      <mat-card class="card-content">
        <div *ngIf="findAllResponse">Response:
          <pre>{{ findAllResponse | json }}</pre>
        </div>
        <div class="rightButton">
          <button (click)="findAll()" color="primary" mat-raised-button>Find All</button>
        </div>
      </mat-card>
      <mat-card class="card-content">
        <div *ngIf="deleteAllResponse">Response:
          <pre>{{ deleteAllResponse | json }}</pre>
        </div>
        <div class="centerButton">
          <button (click)="deleteAll()" color="warn" mat-raised-button>Delete All</button>
        </div>
      </mat-card>
    </ng-container>
  `,
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnDestroy {
  data: Data = {manufacturer: '', model: ''};
  uuid: string;
  saveResponse: Object;
  findByUuidResponse: Object;
  findAllResponse: Object;
  deleteAllResponse: Object;
  accessToken: string;
  userSubscription: Subscription;

  constructor(private cdRef: ChangeDetectorRef, private formService: FormService, private userService: UserService) {
    this.userSubscription = this.userService.user$.subscribe(user => {
      this.accessToken = user?.getAuthResponse(true)?.access_token;
      this.saveResponse = undefined;
      this.data = {manufacturer: '', model: ''};
      this.cdRef.detectChanges();
    });
  }

  sendData(): void {
    this.formService.upsertData(this.data).subscribe(response => {
      this.saveResponse = response;
      this.cdRef.detectChanges();
    }, error => {
      this.saveResponse = error;
      this.cdRef.detectChanges();
    });
  }

  findByUuid(): void {
    this.formService.findByUuid(this.uuid).subscribe(
      response => this.findByUuidResponse = response,
      error => {
        this.findByUuidResponse = {
          httpStatus: error.error.error.code,
          message: error.error.error.status
        }
      });
  }

  copyUuid(): void {
    this.uuid = this.saveResponse['uuid'];
  }

  findAll(): void {
    this.formService.findAll().subscribe(
      response => this.findAllResponse = response,
      error => this.findAllResponse = error
    );
  }

  deleteAll(): void {
    this.formService.deleteAll().subscribe(
      response => this.deleteAllResponse = response,
      error => this.deleteAllResponse = {
        httpStatus: error.status,
        message: error.error
      });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
