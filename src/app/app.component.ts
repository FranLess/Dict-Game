import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'home', url: '/home', icon: 'home' },
    { title: 'login', url: '/login', icon: 'person' },
    { title: 'Create Post', url: '/post-create', icon: 'pencil' },
    { title: 'Conversations', url: '/conversation', icon: 'chatbubbles' },
    { title: 'Profile', url: '/profile', icon: 'person' },
    { title: 'Logout', url: '/logout', icon: 'log-out' },
  ];
  constructor() {}
}
