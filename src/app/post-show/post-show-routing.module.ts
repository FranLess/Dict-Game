import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostShowPage } from './post-show.page';

const routes: Routes = [
  {
    path: '',
    component: PostShowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostShowPageRoutingModule {}
