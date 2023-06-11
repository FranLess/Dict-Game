import { Injectable } from '@angular/core';
import { ApiHelperService } from '../helpers/api-helper.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PostApiService {
  public uri: string;
  constructor(
    private apiHelper: ApiHelperService,
    private http: HttpClient,
    private router: Router
  ) {
    this.uri = this.apiHelper.uri;
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
      });
    } catch (error) {
      console.log(error);
      console.log('Error al obtener posts', 'redireccionando a login...');
      this.router.navigate(['/login']);
    }
  }
}
