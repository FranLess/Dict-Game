import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserApiService } from '../services/users/user-api.service';
import { PostApiService } from '../services/posts/post-api.service';
import { FriendApiService } from '../services/friends/friend-api.service';
import { AlertHelperService } from '../services/helpers/alert/alert-helper.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.page.html',
  styleUrls: ['./user-page.page.scss'],
})
export class UserPagePage implements OnInit {
  public id: number = 0;
  public sub: any;
  public user: any;
  public profile: any;
  public posts: any;

  public isFriend: boolean = false;
  public friendRequest: any;

  public userLoaded: boolean = false;
  public userIsPublic: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserApiService,
    private postService: PostApiService,
    private friendService: FriendApiService,
    private alertHelper: AlertHelperService
  ) {}

  ngOnInit() {
    this.getUser();
    this.getFriendRequests();
  }

  async getFriendRequests() {
    const requests = await this.friendService.getFriendRequests();

    const user = await this.userService.getCurrentUser();

    this.isFriend = requests.some(
      (request: any) =>
        (request.sender_id === this.id || request.sender_id === user.id) &&
        request.is_accepted === 1
    );

    this.friendRequest = requests.filter(
      (request: any) =>
        (request.sender_id === this.id || request.sender_id === user.id) &&
        request.is_accepted === 1
    );

    console.log(this.friendRequest[0]);
    console.log(this.isFriend);
  }

  async getUser() {
    this.sub = this.route.params.subscribe((params) => {
      this.id = +params['id'];
    });
    const data = await this.userService.getUser(this.id);
    this.user = data.data;
    this.userIsPublic = this.user.profile.level_id == 2;
    this.profile = this.user.profile;
    this.posts = this.user.posts;

    console.log(data, this.user, this.profile, this.posts);

    // const likes = this.user.hearts;

    // this.postLiked = likes.some((like: any) => like.user_id === user.id);

    // if (this.postLiked) {
    //   this.likeId = likes.find((like: any) => like.user_id === user.id).id;
    // }

    // console.log(likes);
    // console.log(this.post);
    // this.postLoaded = true;
    this.userLoaded = true;
    console.log(this.userLoaded);
  }

  addFriend(id: number) {
    this.friendService
      .addFriendRequest(id)
      .then((res) => this.alertHelper.presentAlert('Solicitud enviada', '', ''))
      .catch((error) =>
        this.alertHelper.presentAlert(
          'Solicitud enviada',
          '',
          'Ya has enviado una solicitud a este usuario'
        )
      );
  }

  async deleteFriend() {
    this.friendService.deleteRequest(this.friendRequest[0]);
    this.getFriendRequests();
  }

  async showPost(id: any) {
    this.postService.showPost(id);
  }
}
