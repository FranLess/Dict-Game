import { Injectable } from '@angular/core';
import { ApiHelperService } from '../helpers/api-helper.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  public uri: string;

  constructor(
    private apiHelper: ApiHelperService,
    private http: HttpClient,
    private router: Router
  ) {
    this.uri = this.apiHelper.uri;
  }

  // LOGIN DE USUARIO
  async login(email: string, password: string) {
    // url a llamar
    const uri = `${this.uri}/api/sanctum/token`;

    // nombre del dispositivo
    const deviceName = await this.apiHelper.getDeviceName();
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('device_name', deviceName);

    await this.http.post(uri, formData).subscribe(
      (data) => {
        this.apiHelper.setToken(data);
      },
      (error) => console.log(error)
    );
  }

  // OBTENER EL USUARIO DE LA BASE DE DATOS
  async getUser() {
    try {
      // URL del endpoint que deseas llamar
      const url = `${this.uri}/api/user`;

      // Token de autenticación
      const token = await this.apiHelper.getToken();

      // parameters
      const parameters = new HttpParams().set('_token', token);

      const formData = new FormData();
      formData.append('_token', token);

      // Realiza la solicitud GET con los parametros
      return new Promise<any>((resolve, reject) => {
        this.http.get(url, { params: parameters }).subscribe(
          (response: any) => resolve(response.data),
          (error) => reject(error)
        );
      });
    } catch (error) {
      console.log(error);
      console.log('Error al obtener el usuario', 'redireccionando a login...');
      this.router.navigate(['/login']);
    }
  }
}
