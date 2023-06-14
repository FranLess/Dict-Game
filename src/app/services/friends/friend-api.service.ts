import { Injectable } from '@angular/core';
import { UserApiService } from '../users/user-api.service';
import { ApiHelperService } from '../helpers/api-helper.service';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FriendApiService {
  public uri: string;
  constructor(
    private userService: UserApiService,
    private apiHelper: ApiHelperService,
    private http: HttpClient
  ) {
    this.uri = this.apiHelper.uri;
  }

  async getFriendRequests() {
    const user = await this.userService.getCurrentUser();
    return [...user.friends, ...user.friends_requests];
  }

  async addFriendRequest(id: number) {
    const formData = new FormData();

    // formData.append('level_id', '1');

    // URL del endpoint que deseas llamar
    const url = `${this.uri}/api/friends/`;

    // Token de autenticación
    const token = await this.apiHelper.getToken();

    const user = await this.userService.getCurrentUser();

    // parameters
    formData.append('_token', token);
    formData.append('sender_id', user.id);
    formData.append('receptor_id', id.toString());

    const parameters = new HttpParams().set('_token', token);

    // Realiza la solicitud GET con los parametros
    return new Promise<any>((resolve, reject) => {
      this.http.post(url, formData, { params: parameters }).subscribe(
        (response: any) => resolve(response),
        (error) => reject(error)
      );
    });
  }

  async acceptRequest(request: any) {
    const formData = new FormData();

    // formData.append('level_id', '1');

    // URL del endpoint que deseas llamar
    const url = `${this.uri}/api/friends/update/${request.id}`;

    // Token de autenticación
    const token = await this.apiHelper.getToken();

    // parameters
    formData.append('_token', token);
    formData.append('is_accepted', '1');

    // Realiza la solicitud GET con los parametros
    return new Promise<any>((resolve, reject) => {
      this.http.post(url, formData).subscribe(
        (response: any) => resolve(response),
        (error) => reject(error)
      );
    });
  }

  async deleteRequest(request: any) {
    const formData = new FormData();

    // formData.append('level_id', '1');

    // URL del endpoint que deseas llamar
    const url = `${this.uri}/api/friends/delete/${request.id}`;

    // Token de autenticación
    const token = await this.apiHelper.getToken();

    // parameters
    formData.append('_token', token);

    // Realiza la solicitud GET con los parametros
    return new Promise<any>((resolve, reject) => {
      this.http.post(url, formData).subscribe(
        (response: any) => resolve(response),
        (error) => reject(error)
      );
    });
  }
}
