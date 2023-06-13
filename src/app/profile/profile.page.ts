import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../services/users/user-api.service';
import { PostApiService } from '../services/posts/post-api.service';
import { ApiHelperService } from '../services/helpers/api-helper.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public uri: string;
  public userLoaded: boolean = false;
  public user: any;
  public posts: any;
  public profile: any;

  public image: any;
  public imageHeader: any;

  constructor(
    private apiHelper: ApiHelperService,
    private userService: UserApiService,
    private postService: PostApiService
  ) {
    this.uri = this.apiHelper.uri;
  }

  ngOnInit() {
    this.getUser();
  }

  editar() {}

  addFriend(id: any) {}

  showPost(id: any) {
    this.postService.showPost(id);
  }

  async getUser() {
    const user: any = await this.userService.getUser();
    this.user = user;
    this.profile = user.profile;
    this.posts = user.posts;

    this.userLoaded = true;
    this.image = `${this.uri}/storage/${user.email}/profile/${this.profile.image}`;
    this.imageHeader = `${this.uri}/storage/${user.email}/profile/${this.profile.image_header}`;
    console.log(this.user);
  }
}
