import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiHelperService } from '../services/helpers/api-helper.service';
import { UserApiService } from '../services/users/user-api.service';
import { PostApiService } from '../services/posts/post-api.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.page.html',
  styleUrls: ['./post-create.page.scss'],
})
export class PostCreatePage implements OnInit {
  public selectedImage: string | ArrayBuffer | null = null;
  public safeSelectedImage: SafeUrl | null = null;

  public title: string = '';
  public content: string = '';
  public image: any;

  constructor(
    private http: HttpClient,
    private apiHelper: ApiHelperService,
    private userService: UserApiService,
    private postService: PostApiService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {}

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

  async create() {
    this.postService.createPost(this.title, this.content, this.image);
  }
}
