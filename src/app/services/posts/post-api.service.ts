import { Injectable } from '@angular/core';
import { ApiHelperService } from '../helpers/api-helper.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserApiService } from '../users/user-api.service';
import { AlertHelperService } from '../helpers/alert/alert-helper.service';

@Injectable({
  providedIn: 'root',
})
export class PostApiService {
  public uri: string;
  constructor(
    private apiHelper: ApiHelperService,
    private http: HttpClient,
    private router: Router,
    private userService: UserApiService,
    private userServie: UserApiService,
    private alertHelper: AlertHelperService
  ) {
    this.uri = this.apiHelper.uri;
  }

  showPost(id: any) {
    this.router.navigate(['/post-show', id]);
  }

  editPost(id: any) {
    this.router.navigate(['/post-edit', id]);
  }

  // LIKE POST
  async likePost(id: number) {
    const token = await this.apiHelper.getToken();
    const url = `${this.uri}/api/hearts`;
    const user = await this.userService.getCurrentUser();
    const isTeam = false;
    const receptor = isTeam ? 1 : 2;

    const formData = new FormData();
    formData.append('user_id', user.id);
    formData.append('post_id', id.toString());

    formData.append('_token', token);

    // Realiza la solicitud POST con los parametros
    return new Promise<any>((resolve, reject) => {
      this.http.post(url, formData).subscribe(
        (response) => resolve(response),
        (error) => reject(error)
      );
    });
  }

  // DISLIKE POST
  async dislikePost(id: number) {
    const token = await this.apiHelper.getToken();
    const url = `${this.uri}/api/hearts/delete/${id}`;
    const user = await this.userService.getCurrentUser();
    const isTeam = false;
    const formData = new FormData();
    const receptor = isTeam ? 1 : 2;

    formData.append('_token', token);

    // Realiza la solicitud POST con los parametros
    return new Promise<any>((resolve, reject) => {
      this.http.post(url, formData).subscribe(
        (response) => resolve(response),
        (error) => reject(error)
      );
    });
  }

  // CREAR POST
  async createPost(title: string, content: string, image: File) {
    try {
      const token = await this.apiHelper.getToken();
      const url = `${this.uri}/api/posts`;
      const isTeam = false;
      const user = await this.userService.getCurrentUser();
      const formData = new FormData();
      const receptor = isTeam ? 1 : 2;
      formData.append('title', title);
      formData.append('content', content);
      formData.append('image', image);
      formData.append('user_id', user.id);
      formData.append('level_id', user.profile.level_id);
      formData.append('receptor_type_id', receptor.toString());
      formData.append('team_id', receptor.toString());

      formData.append('_token', token);

      // Realiza la solicitud POST con los parametros
      return new Promise<any>((resolve, reject) => {
        this.http.post(url, formData).subscribe(
          (response) => resolve(response),
          (error) => reject(error)
        );
      });
    } catch (error) {
      console.log(error);
    }
  }

  // UPDATE POST
  async updatePost(
    title: string,
    content: string,
    image: File,
    postId: number
  ) {
    const token = await this.apiHelper.getToken();
    const url = `${this.uri}/api/posts/update/${postId}`;
    const isTeam = false;
    const user = await this.userService.getCurrentUser();
    const formData = new FormData();
    const receptor = isTeam ? 1 : 2;
    formData.append('title', title);
    formData.append('content', content);
    formData.append('image', image);
    formData.append('user_id', user.id);
    formData.append('level_id', user.profile.level_id);
    formData.append('receptor_type_id', receptor.toString());
    formData.append('team_id', receptor.toString());

    formData.append('_token', token);

    // Realiza la solicitud POST con los parametros
    return new Promise<any>((resolve, reject) => {
      this.http.post(url, formData).subscribe(
        (response) => resolve(response),
        (error) => reject(error)
      );
    });
  }

  async deletePost(id: number) {
    const token = await this.apiHelper.getToken();
    const url = `${this.uri}/api/posts/delete/${id}`;
    const formData = new FormData();

    formData.append('_token', token);

    // Realiza la solicitud POST con los parametros
    return new Promise<any>((resolve, reject) => {
      this.http.post(url, formData).subscribe(
        (response) => {
          this.alertHelper.presentAlert('Post Eliminado');
          resolve(response);
        },
        (error) => reject(error)
      );
    });
  }

  // OBTENER UN UNICO POST
  async getPost(id: any) {
    try {
      const url = `${this.uri}/api/posts/${id}`;
      const token = await this.apiHelper.getToken();
      const params = new HttpParams().set('_token', token);

      // Realiza la solicitud GET con los parametros
      return new Promise<any>((resolve, reject) => {
        this.http.get(url, { params: params }).subscribe(
          (response: any) => resolve(response.data),
          (error) => reject(error)
        );
      });
    } catch (error) {
      console.log(error);
      console.log('Error al obtener post', 'redireccionando a login...');
      this.router.navigate(['/login']);
    }
  }

  // OBTENER POSTS DE LA BASE DE DATOS
  async getPosts(page: number) {
    try {
      // URL del endpoint que deseas llamar
      const url = `${this.uri}/api/posts`;

      // Token de autenticación
      const token = await this.apiHelper.getToken();

      // parameters
      let parameters = new HttpParams().set('_token', token);
      parameters = parameters.set('page', page.toString());
      const formData = new FormData();
      formData.append('_token', token);

      // Realiza la solicitud GET con los parametros
      return new Promise<any>((resolve, reject) => {
        this.http.get(url, { params: parameters }).subscribe(
          (response) => resolve(response),
          (error) => reject(error)
        );
      }).catch((error) => {
        console.log(error);
        console.log('Error al obtener posts', 'redireccionando a login...');
        this.router.navigate(['/login']);
      });
    } catch (error) {
      console.log(error);
      console.log('Error al obtener posts', 'redireccionando a login...');
      this.router.navigate(['/login']);
    }
  }

  //  COMMENT
  async addComment(post_id: any, user_id: any, content: string) {
    try {
      const token = await this.apiHelper.getToken();
      const url = `${this.uri}/api/comments`;
      const formData = new FormData();
      formData.append('post_id', post_id);
      formData.append('user_id', user_id);
      formData.append('content', content);
      formData.append('_token', token);

      // Realiza la solicitud POST con los parametros
      return new Promise<any>((resolve, reject) => {
        this.http.post(url, formData).subscribe(
          (response) => resolve(response),
          (error) => reject(error)
        );
      });
    } catch (error) {
      console.log(error);
    }
  }
}
