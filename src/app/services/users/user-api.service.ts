import { Injectable } from '@angular/core';
import { ApiHelperService } from '../helpers/api-helper.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterService } from '../router/router.service';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  public uri: string;

  constructor(
    private apiHelper: ApiHelperService,
    private http: HttpClient,
    private routerService: RouterService
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

    return new Promise<any>((resolve, reject) => {
      this.http.post(uri, formData).subscribe(
        (data) => {
          this.apiHelper.setToken(data);
          // this.routerService.goHome();
          this.createProfile();
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  // CREAR PROFILE DE USUARIO
  async createProfile() {
    // url a llamar
    const uri = `${this.uri}/api/profiles`;
    const token = await this.apiHelper.getToken();
    const user = await this.getUser();

    const formData = new FormData();
    formData.append('user_id', user.id);
    formData.append('level_id', '1');
    formData.append('_token', token);

    this.http.post(uri, formData).subscribe(
      (response) => console.log(response),
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
      this.routerService.goLogin();
    }
  }

  // OBTENER EL PERFIL DEL USUARIO
  async getProfile() {
    const user: any = await this.getUser();
    return user.profile;
  }

  // GUARDAR DATOS DEL PERFIL
  async saveProfile(profile: any) {
    const formData = new FormData();
    for (let key in profile) {
      formData.append(key, profile[key]);
    }

    // formData.append('level_id', '1');

    // URL del endpoint que deseas llamar
    const url = `${this.uri}/api/profiles/update/${profile.user_id}`;

    // Token de autenticación
    const token = await this.apiHelper.getToken();

    // parameters
    formData.append('_token', token);

    const parameters = new HttpParams().set('_token', token);

    // Realiza la solicitud GET con los parametros
    return new Promise<any>((resolve, reject) => {
      this.http.post(url, formData, { params: parameters }).subscribe(
        (response: any) => resolve(response),
        (error) => reject(error)
      );
    });
  }
}
