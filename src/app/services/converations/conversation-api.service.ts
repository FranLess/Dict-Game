import { Injectable } from '@angular/core';
import { UserApiService } from '../users/user-api.service';
import { ApiHelperService } from '../helpers/api-helper.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { range } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ConversationApiService {
  public uri: string = '';
  public currentUser: any;
  constructor(
    private userService: UserApiService,
    private apiHelper: ApiHelperService,
    private http: HttpClient,
    private router: Router
  ) {
    this.init();
  }

  async init() {
    this.uri = this.apiHelper.uri;
    this.currentUser = await this.userService.getCurrentUser();
  }

  async getConversations() {
    const currentUser = await this.userService.getCurrentUser();
    console.log(currentUser);

    const uniqueIds = new Set();

    const conversations = [
      ...currentUser.sender_conversations,
      ...currentUser.receptor_conversations,
    ].filter((obj) => {
      if (!uniqueIds.has(obj.id)) {
        uniqueIds.add(obj.id);
        return true;
      }
      return false;
    });

    return conversations;
  }

  async getConversation(id: number) {
    // URL del endpoint que deseas llamar
    const url = `${this.uri}/api/conversations/${id}`;

    // Token de autenticación
    const token = await this.apiHelper.getToken();

    // parameters
    const params = new HttpParams().set('_token', token);

    // Realiza la solicitud GET con los parametros
    return new Promise<any>((resolve, reject) => {
      this.http.get(url, { params: params }).subscribe(
        (response: any) => resolve(response.data),
        (error) => reject(error)
      );
    });
  }

  async getMessagesFromConversation(conversation: any) {
    const user = await this.userService.getCurrentUser();
    const messages = conversation.messages;
    return messages.map((item: any) => {
      return {
        ...item,
        imSender: item.user_id == user.id,
        type: item.user_id == user.id ? 'sent' : 'recived',
      };
    });
  }

  async startConversation(userId: number) {
    const currentUser = await this.userService.getCurrentUser();
    const formData = new FormData();

    // URL del endpoint que deseas llamar
    const url = `${this.uri}/api/conversations`;

    // Token de autenticación
    const token = await this.apiHelper.getToken();

    // parameters
    formData.append('_token', token);
    formData.append('sender_id', currentUser.id);
    formData.append('receptor_id', userId.toString());

    // Realiza la solicitud GET con los parametros
    return new Promise<any>((resolve, reject) => {
      this.http.post(url, formData).subscribe(
        (response: any) => {
          this.showConversation(response.id);
          resolve(response);
        },
        (error) => reject(error)
      );
    });
  }

  async startInverseConversation(userId: number) {
    const formData = new FormData();

    // URL del endpoint que deseas llamar
    const url = `${this.uri}/api/conversations`;

    // Token de autenticación
    const token = await this.apiHelper.getToken();

    // parameters
    formData.append('_token', token);
    formData.append('receptor_id', this.currentUser.id);
    formData.append('sender_id', userId.toString());

    // Realiza la solicitud GET con los parametros
    return new Promise<any>((resolve, reject) => {
      this.http.post(url, formData).subscribe(
        (response: any) => resolve(response),
        (error) => reject(error)
      );
    });
  }

  async showConversation(id: number) {
    this.router.navigate(['/conversation', id]);
  }

  async deleteConvesation(id: number) {
    const formData = new FormData();

    // URL del endpoint que deseas llamar
    const url = `${this.uri}/api/conversations/delete/${id}`;

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
