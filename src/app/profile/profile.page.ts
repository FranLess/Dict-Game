import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../services/users/user-api.service';
import { PostApiService } from '../services/posts/post-api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public userLoaded: boolean = false;
  public user: any;
  public posts: any;
  public profile: any;

  constructor(
    private userService: UserApiService,
    private postService: PostApiService
  ) {}

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
    console.log(this.user);
  }
}
