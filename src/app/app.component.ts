import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'user-login', url: '/user-login', icon: 'person' },
    { title: 'post-create', url: '/post-create', icon: 'pen' },
  ];
  constructor() {}
}
