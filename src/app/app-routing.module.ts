import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full',
  },
  {
    path: 'folder/:id',
    loadChildren: () =>
      import('./folder/folder.module').then((m) => m.FolderPageModule),
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
    path: 'chat',
    loadChildren: () =>
      import('./chat/chat.module').then((m) => m.ChatPageModule),
  },
  {
    path: 'conversation',
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
    path: 'user-page',
    loadChildren: () =>
      import('./user-page/user-page.module').then((m) => m.UserPagePageModule),
  },
  {
    path: 'team-page',
    loadChildren: () =>
      import('./team-page/team-page.module').then((m) => m.TeamPagePageModule),
  },
  {
    path: 'create-image',
    loadChildren: () => import('./create-image/create-image.module').then( m => m.CreateImagePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
