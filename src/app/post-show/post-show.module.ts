import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostShowPageRoutingModule } from './post-show-routing.module';

import { PostShowPage } from './post-show.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostShowPageRoutingModule
  ],
  declarations: [PostShowPage]
})
export class PostShowPageModule {}
