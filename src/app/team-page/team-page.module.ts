import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeamPagePageRoutingModule } from './team-page-routing.module';

import { TeamPagePage } from './team-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeamPagePageRoutingModule
  ],
  declarations: [TeamPagePage]
})
export class TeamPagePageModule {}
