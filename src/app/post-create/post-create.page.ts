import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiHelperService } from '../services/helpers/api-helper.service';
import { UserApiService } from '../services/users/user-api.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.page.html',
  styleUrls: ['./post-create.page.scss'],
})
export class PostCreatePage implements OnInit {
  public uri: string;

  constructor(
    private http: HttpClient,
    private apiHelper: ApiHelperService,
    private userService: UserApiService
  ) {
    this.uri = this.apiHelper.uri;
  }

  public title: string = '';
  public content: string = '';

  ngOnInit() {}

  async create(title: string, content: string) {
    const user = await this.userService.getUser();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('user_id', user.id);

    // 'title' => 'required|string|max:255',
    // 'content' => 'required|string',
    // 'user_id' => 'required|integer',
    // 'level_id' => 'required|integer',
    // 'receptor_type_id' => 'required|integer',
    // 'team_id' => 'integer',

    const uri = `${this.uri}/api/posts`;
    this.http.post(uri, { title, content }).subscribe((res) => {
      console.log(res);
    });
  }
}
