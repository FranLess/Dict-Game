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
    private routerService: RouterService,
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

    return new Promise<any>((resolve, reject) => {
      this.http.post(uri, formData).subscribe(
        (data) => {
          this.apiHelper.setToken(data);
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  // REGISTER
  register(
    name: string,
    email: string,
    password: string,
    password_confirmation: string
  ) {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('password_confirmation', password_confirmation);

    return new Promise<any>((resolve, reject) => {
      this.http.post(`${this.uri}/register`, formData).subscribe(
        (response) => resolve(response),
        (error) => reject(error)
      );
    });
  }

  // CREAR PROFILE DE USUARIO
  async createProfile() {
    // url a llamar
    const uri = `${this.uri}/api/profiles`;
    const token = await this.apiHelper.getToken();
    const user = await this.getCurrentUser();

    const formData = new FormData();
    formData.append('user_id', user.id);
    formData.append('level_id', '2');
    formData.append('country_id', '1');
    formData.append('sentimental_id', '1');
    formData.append('_token', token);

    this.http.post(uri, formData).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }

  // OBTENER EL USUARIO DE LA BASE DE DATOS
  async getCurrentUser() {
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

  // MOSTRAR EL USUARIO
  async showUser(id: number) {
    this.router.navigate(['/user-page', id]);
  }

  //Obtener perfil de usuario con id
  async getUser(id: number) {
    // URL del endpoint que deseas llamar
    const url = `${this.uri}/api/user/${id}`;

    // Token de autenticación
    const token = await this.apiHelper.getToken();

    // parameters
    const parameters = new HttpParams().set('_token', token);

    const formData = new FormData();
    formData.append('_token', token);

    // Realiza la solicitud GET con los parametros
    return new Promise<any>((resolve, reject) => {
      this.http.get(url, { params: parameters }).subscribe(
        (response: any) => resolve(response),
        (error) => reject(error)
      );
    });
  }

  // OBTENER LOS USUARIOS DE LA BD
  async getUsers() {
    // URL del endpoint que deseas llamar
    const url = `${this.uri}/api/user/all`;

    // Token de autenticación
    const token = await this.apiHelper.getToken();

    // parameters
    const parameters = new HttpParams().set('_token', token);

    const formData = new FormData();
    formData.append('_token', token);

    // Realiza la solicitud GET con los parametros
    return new Promise<any>((resolve, reject) => {
      this.http.get(url, { params: parameters }).subscribe(
        (response: any) => resolve(response),
        (error) => reject(error)
      );
    });
  }

  // OBTENER EL PERFIL DEL USUARIO
  async getProfile() {
    const user: any = await this.getCurrentUser();
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
    const url = `${this.uri}/api/profiles/update/${profile.id}`;

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

  async getFriendRequests() {
    const user = await this.getCurrentUser();
    return user.friends;
  }
}
