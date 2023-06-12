import { Component, OnInit } from '@angular/core';
import { ApiHelperService } from '../services/helpers/api-helper.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PostApiService } from '../services/posts/post-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  protected uri: string;
  public data = [];
  public posts: any;
  public postsLoaded: boolean = false;
  public page: number = 1;
  public lastPage: number = 1;

  constructor(
    private http: HttpClient,
    private apiHelper: ApiHelperService,
    private postsService: PostApiService
  ) {
    this.uri = this.apiHelper.uri;

    // console.log(this.user);
  }

  async getPosts() {
    // se obtienen los datos de los posts junto con los datos de paginacion
    const data: any = await this.postsService.getPosts(this.page);

    this.posts = data.data;
    console.log(this.posts);

    this.lastPage = data.meta.last_page;

    this.postsLoaded = true;

    console.log(data);
  }

  nextPage() {
    if (this.page < this.lastPage) {
      this.page++;
      this.getPosts();
    }
  }
  backPage() {
    if (this.page > 1) {
      this.page--;
      this.getPosts();
    }
  }

  ngOnInit() {
    this.getPosts();
  }
}
