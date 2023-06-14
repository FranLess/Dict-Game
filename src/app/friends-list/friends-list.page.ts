import { Component, OnInit } from '@angular/core';
import { FriendApiService } from '../services/friends/friend-api.service';
import { UserApiService } from '../services/users/user-api.service';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.page.html',
  styleUrls: ['./friends-list.page.scss'],
})
export class FriendsListPage implements OnInit {
  public requestsLoaded: boolean = false;
  public friendRequests: any;
  public imSender: boolean = false;

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

    this.friendRequests = friendRequests.map((item: any) => {
      return {
        ...item,
        imSender: item.sender_id === user.id,
      };
    });

    this.friendRequests = this.friendRequests.filter(
      (request: any) => request.is_accepted === 1
    );
    console.log(this.friendRequests);

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
