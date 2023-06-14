import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeamPagePage } from './team-page.page';

const routes: Routes = [
  {
    path: '',
    component: TeamPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamPagePageRoutingModule {}
