import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Device } from '@capacitor/device';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

const STORAGE_KEY_TOKEN = 'token';
const STORAGE_KEY_USER = 'user';
// const DEV_URI = 'http://192.168.1.7/dictGameAPI/public';
const DEV_URI = 'http://localhost:8000';
const PROD_URI = 'http://dictgame.000webhostapp.com';
const DEV_STATUS = true;
@Injectable({
  providedIn: 'root',
})
export class ApiHelperService {
  public uri: string = DEV_STATUS ? DEV_URI : PROD_URI;

  constructor(
    private platform: Platform,
    private storage: Storage,
    private http: HttpClient,
    private router: Router
  ) {
    this.init();
  }

  init() {
    this.storage.create();
  }

  // OBTENER EL NOMBRE DEL DISPOSITIVO
  async getDeviceName() {
    const deviceName = (await Device.getInfo()).model;
    return deviceName;
  }

  // GUARDAR EL TOKEN DE AUTENTICACION
  async setToken(token: any) {
    return this.storage.set(STORAGE_KEY_TOKEN, token);
  }

  // LEER EL TOKEN DE AUTENTICACION
  async getToken() {
    return (await this.storage.get(STORAGE_KEY_TOKEN)) || null;
  }

  // GET GENDER LIST
  async getGenderList() {
    const token = await this.getToken();
    const params = new HttpParams().set('token', token);

    const url = `${this.uri}/api/genders`;

    return new Promise<any>((resolve, reject) => {
      this.http.get(url, { params }).subscribe(
        (res: any) => resolve(res.data),
        (error) => reject(error)
      );
    });
  }

  // GET COUNTRY LIST
  async getCountryList() {
    const token = await this.getToken();
    const params = new HttpParams().set('_token', token);

    const url = `${this.uri}/api/countries`;

    return new Promise<any>((resolve, reject) => {
      this.http.get(url, { params: params }).subscribe(
        (res: any) => resolve(res.data),
        (error) => reject(error)
      );
    });
  }
  // GET LEVELS LIST
  async getLevelList() {
    const token = await this.getToken();
    const params = new HttpParams().set('_token', token);

    const url = `${this.uri}/api/levels`;

    return new Promise<any>((resolve, reject) => {
      this.http.get(url, { params: params }).subscribe(
        (res: any) => resolve(res.data),
        (error) => reject(error)
      );
    });
  }

  // GET SENTIMENTALS LIST
  async getSentimentalList() {
    const token = await this.getToken();
    const params = new HttpParams().set('_token', token);

    const url = `${this.uri}/api/sentimentals`;

    return new Promise<any>((resolve, reject) => {
      this.http.get(url, { params: params }).subscribe(
        (res: any) => resolve(res.data),
        (error) => reject(error)
      );
    });
  }
}
