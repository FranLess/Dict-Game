import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FriendsRequestsPage } from './friends-requests.page';

const routes: Routes = [
  {
    path: '',
    component: FriendsRequestsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FriendsRequestsPageRoutingModule {}
