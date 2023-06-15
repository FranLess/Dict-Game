import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'load',
    pathMatch: 'full',
  },
  {
    path: 'post-create',
    loadChildren: () =>
      import('./post-create/post-create.module').then(
        (m) => m.PostCreatePageModule
      ),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./register/register.module').then((m) => m.RegisterPageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfilePageModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'conversation/:id',
    loadChildren: () =>
      import('./conversation/conversation.module').then(
        (m) => m.ConversationPageModule
      ),
  },
  {
    path: 'post',
    loadChildren: () =>
      import('./post/post.module').then((m) => m.PostPageModule),
  },
  {
    path: 'user-page/:id',
    loadChildren: () =>
      import('./user-page/user-page.module').then((m) => m.UserPagePageModule),
  },
  {
    path: 'team-page',
    loadChildren: () =>
      import('./team-page/team-page.module').then((m) => m.TeamPagePageModule),
  },
  {
    path: 'post-show/:id',
    loadChildren: () =>
      import('./post-show/post-show.module').then((m) => m.PostShowPageModule),
  },
  {
    path: 'profile-edit',
    loadChildren: () =>
      import('./profile-edit/profile-edit.module').then(
        (m) => m.ProfileEditPageModule
      ),
  },
  {
    path: 'logout',
    loadChildren: () =>
      import('./logout/logout.module').then((m) => m.LogoutPageModule),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersPageModule),
  },
  {
    path: 'friends-list',
    loadChildren: () =>
      import('./friends-list/friends-list.module').then(
        (m) => m.FriendsListPageModule
      ),
  },
  {
    path: 'friends-requests',
    loadChildren: () =>
      import('./friends-requests/friends-requests.module').then(
        (m) => m.FriendsRequestsPageModule
      ),
  },
  {
    path: 'conversations',
    loadChildren: () =>
      import('./conversations/conversations.module').then(
        (m) => m.ConversationsPageModule
      ),
  },
  {
    path: 'post-edit/:id',
    loadChildren: () =>
      import('./post-edit/post-edit.module').then((m) => m.PostEditPageModule),
  },
  {
    path: 'load',
    loadChildren: () =>
      import('./load/load.module').then((m) => m.LoadPageModule),
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./about/about.module').then((m) => m.AboutPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
