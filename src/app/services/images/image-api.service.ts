import { Injectable } from '@angular/core';
import { ApiHelperService } from '../helpers/api-helper.service';
import { UserApiService } from '../users/user-api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ImageApiService {
  public uri: string;

  constructor(
    private apiHelper: ApiHelperService,
    private userService: UserApiService,
    private http: HttpClient
  ) {
    this.uri = this.apiHelper.uri;
  }

  async store($image: any) {
    const user = await this.userService.getCurrentUser();
    const uri = `${this.uri}/api/images`;
    const token = await this.apiHelper.getToken();

    const formData = new FormData();
    formData.append('source', $image);
    formData.append('user_id', user.id);
    formData.append('_token', token);

    return this.http.post(uri, formData).subscribe(
      (response) => response,
      (error) => error
    );
  }
}
