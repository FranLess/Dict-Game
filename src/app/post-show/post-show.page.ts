import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostApiService } from '../services/posts/post-api.service';
import { UserApiService } from '../services/users/user-api.service';

@Component({
  selector: 'app-post-show',
  templateUrl: './post-show.page.html',
  styleUrls: ['./post-show.page.scss'],
})
export class PostShowPage implements OnInit {
  id: number = 1;
  private sub: any;

  public post: any;
  public postLoaded: boolean = false;

  public postLiked: boolean = false;
  public likeId: number = 0;

  public newComment: string = '';
  constructor(
    private route: ActivatedRoute,
    private postService: PostApiService,
    private userService: UserApiService
  ) {}

  ngOnInit() {
    this.getPost();
  }

  async likePost() {
    await this.postService.likePost(this.id);

    this.postLiked = true;
    this.getPost();
  }

  async dislikePost() {
    await this.postService.dislikePost(this.likeId);
    this.postLiked = false;
    this.getPost();
  }

  async getPost() {
    this.sub = this.route.params.subscribe((params) => {
      this.id = +params['id'];
    });
    this.post = await this.postService.getPost(this.id);

    const user = await this.userService.getCurrentUser();

    const likes = this.post.hearts;

    this.postLiked = likes.some((like: any) => like.user_id === user.id);

    if (this.postLiked) {
      this.likeId = likes.find((like: any) => like.user_id === user.id).id;
    }

    console.log(likes);
    console.log(this.post);
    this.postLoaded = true;
  }

  async addComment() {
    const user = await this.userService.getCurrentUser();
    this.postService
      .addComment(this.id, user.id, this.newComment)
      .then((res) => this.getPost());
    this.newComment = '';
  }

  showUser(id: number) {
    this.userService.showUser(id);
  }
}
