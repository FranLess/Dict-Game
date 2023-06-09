import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'home', url: '/home', icon: 'home' },
    { title: 'Create Post', url: '/post-create', icon: 'pencil' },
    { title: 'Conversations', url: '/conversations', icon: 'chatbubbles' },
    { title: 'Amigos', url: '/friends-list', icon: 'people' },
    {
      title: 'Solicitudes de amistad',
      url: '/friends-requests',
      icon: 'person-add',
    },
    { title: 'Perfil', url: '/profile', icon: 'person-circle' },
    { title: 'Usuarios', url: '/users', icon: 'person' },
    { title: 'Logout', url: '/login', icon: 'log-out' },
    { title: 'Sobre Dict Game', url: '/about', icon: 'game-controller' },
  ];
  constructor() {}
}
