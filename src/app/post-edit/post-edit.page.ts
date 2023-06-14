import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostApiService } from '../services/posts/post-api.service';
import { UserApiService } from '../services/users/user-api.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.page.html',
  styleUrls: ['./post-edit.page.scss'],
})
export class PostEditPage implements OnInit {
  public selectedImage: string | ArrayBuffer | null = null;
  public safeSelectedImage: SafeUrl | null = null;
  public image: any;

  public id: number = 1;
  private sub: any;

  public post: any;
  public postLoaded: boolean = false;

  public postLiked: boolean = false;
  public likeId: number = 0;

  public title: string = '';
  public content: string = '';

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private postService: PostApiService,
    private userService: UserApiService
  ) {}

  ngOnInit() {
    this.getPost();
  }

  async getPost() {
    this.sub = this.route.params.subscribe((params) => {
      this.id = +params['id'];
    });
    this.post = await this.postService.getPost(this.id);

    this.title = this.post.title;
    this.content = this.post.content;
    this.selectedImage = this.post.image_source;
    this.image = this.post.image_source;

    console.log(this.post);
    this.postLoaded = true;
  }

  handleFileInput(event: any) {
    this.image = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.selectedImage = reader.result;
      this.safeSelectedImage = this.sanitizer.bypassSecurityTrustUrl(
        this.selectedImage as string
      );
    };

    reader.readAsDataURL(this.image);
  }

  async save() {
    this.postService.updatePost(this.title, this.content, this.image, this.id);
  }
}
