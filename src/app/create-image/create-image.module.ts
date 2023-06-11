import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateImagePageRoutingModule } from './create-image-routing.module';

import { CreateImagePage } from './create-image.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateImagePageRoutingModule
  ],
  declarations: [CreateImagePage]
})
export class CreateImagePageModule {}
