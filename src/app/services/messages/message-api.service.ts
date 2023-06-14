import { Injectable } from '@angular/core';
import { UserApiService } from '../users/user-api.service';
import { ApiHelperService } from '../helpers/api-helper.service';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MessageApiService {
  public uri: string;
  constructor(
    private userService: UserApiService,
    private apiHelper: ApiHelperService,
    private http: HttpClient
  ) {
    this.uri = apiHelper.uri;
  }

  async sendMessage(content: string, conversationId: number) {
    const currentUser = await this.userService.getCurrentUser();
    const formData = new FormData();

    // URL del endpoint que deseas llamar
    const url = `${this.uri}/api/messages`;

    // Token de autenticación
    const token = await this.apiHelper.getToken();

    // parameters
    formData.append('_token', token);
    formData.append('user_id', currentUser.id);
    formData.append('content', content);
    formData.append('conversation_id', conversationId.toString());

    // Realiza la solicitud GET con los parametros
    return new Promise<any>((resolve, reject) => {
      this.http.post(url, formData).subscribe(
        (response: any) => resolve(response),
        (error) => reject(error)
      );
    });
  }
}
