import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserApiService } from '../services/users/user-api.service';
import { PostApiService } from '../services/posts/post-api.service';
import { FriendApiService } from '../services/friends/friend-api.service';
import { AlertHelperService } from '../services/helpers/alert/alert-helper.service';
import { ConversationApiService } from '../services/converations/conversation-api.service';

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

  public isFriend: any = false;
  public friendRequest: any;

  public userLoaded: boolean = false;
  public userIsPublic: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserApiService,
    private postService: PostApiService,
    private friendService: FriendApiService,
    private alertHelper: AlertHelperService,
    private conversationService: ConversationApiService
  ) {}

  ngOnInit() {
    this.getUser();
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
    this.getFriendRequests();

    this.userLoaded = true;
    console.log(this.userLoaded);
  }

  async getFriendRequests() {
    // se valida que en las solicitudes de amigo haya alguna que coincida con los usuarios y que sea aceptada
    this.isFriend = await this.friendService.isFriend(this.id);

    //se obtiene la coleccion con el unico objeto de la solicitud que coincide en el amigo
    this.friendRequest = await this.friendService.getIsFriendRequest(this.id);

    console.log(this.friendRequest);
    console.log(this.isFriend);
  }

  async addFriend(id: number) {
    await this.friendService.addFriendRequest(id);
  }

  async deleteFriend() {
    this.friendService.deleteRequest(this.friendRequest);
    this.getFriendRequests();
  }

  async showPost(id: any) {
    this.postService.showPost(id);
  }

  async startConversation() {
    this.conversationService.startConversation(this.id);
  }
}
