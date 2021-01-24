import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-auth-button></app-auth-button>
    <app-form></app-form>
  `
})
export class AppComponent {
  title = 'frontend-app';
}
