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
    { title: 'Amigos', url: '/friends-list', icon: 'people' },
    {
      title: 'Solicitudes de amistad',
      url: '/friends-requests',
      icon: 'person-add',
    },
    { title: 'Perfil', url: '/profile', icon: 'person-circle' },
    { title: 'Usuarios', url: '/users', icon: 'person' },
    { title: 'Logout', url: '/logout', icon: 'log-out' },
  ];
  constructor() {}
}
