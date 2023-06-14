import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../services/users/user-api.service';
import { PostApiService } from '../services/posts/post-api.service';
import { ApiHelperService } from '../services/helpers/api-helper.service';
import { AlertHelperService } from '../services/helpers/alert/alert-helper.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public editMode: boolean = false;
  public classModeEdit: string = 'edit-off';

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
    private postService: PostApiService,
    private alertHelper: AlertHelperService
  ) {
    this.uri = this.apiHelper.uri;
  }

  ngOnInit() {
    setTimeout(() => {
      this.getCurrentUser();
    }, 2 * 1000);
  }

  editar() {}

  addFriend(id: any) {}

  toggleEditMode() {
    this.editMode = !this.editMode;
    this.classModeEdit = this.editMode ? 'edit-on' : 'edit-off';
  }

  showPost(id: any) {
    this.postService.showPost(id);
  }

  editPost(id: number) {
    this.postService.editPost(id);
  }

  async deletePost(id: number) {
    const confirm = await this.alertHelper.presentAlertChoose();
    if (confirm) this.postService.deletePost(id);
  }

  async getCurrentUser() {
    const user: any = await this.userService.getCurrentUser();
    this.user = user;
    this.profile = user.profile;
    this.posts = user.posts;

    this.userLoaded = true;

    console.log(this.user);
  }
}
