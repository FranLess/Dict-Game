import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../services/users/user-api.service';
import { FriendApiService } from '../services/friends/friend-api.service';

@Component({
  selector: 'app-friends-requests',
  templateUrl: './friends-requests.page.html',
  styleUrls: ['./friends-requests.page.scss'],
})
export class FriendsRequestsPage implements OnInit {
  public requestsLoaded: boolean = false;
  public friendRequests: any;

  constructor(
    private userService: UserApiService,
    private friendService: FriendApiService
  ) {}

  ngOnInit() {
    this.getFriendRequests();
  }

  async getFriendRequests() {
    const friendRequests = await this.friendService.getFriendRequests();
    const user = await this.userService.getCurrentUser();
    console.log(friendRequests);

    this.friendRequests = friendRequests.filter(
      (friend: any) => friend.is_accepted == 0 && friend.receptor_id == user.id
    );

    this.requestsLoaded = true;
  }

  async acceptRequest(request: any) {
    this.friendService.acceptRequest(request);
    this.getFriendRequests();
  }
  async deleteRequest(request: any) {
    this.friendService.deleteRequest(request);
    this.getFriendRequests();
  }

  async showUser(id: number) {
    this.userService.showUser(id);
  }
}
