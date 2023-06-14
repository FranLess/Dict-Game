import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FriendsRequestsPageRoutingModule } from './friends-requests-routing.module';

import { FriendsRequestsPage } from './friends-requests.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FriendsRequestsPageRoutingModule
  ],
  declarations: [FriendsRequestsPage]
})
export class FriendsRequestsPageModule {}
