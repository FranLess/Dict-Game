import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ApiHelperService } from '../services/helpers/api-helper.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public name: string = '';
  public email: string = '';
  public password: string = '';
  public password_confirmation: string = '';
  private uri: string;

  constructor(
    private http: HttpClient,
    private platform: Platform,
    private apiHelper: ApiHelperService
  ) {
    this.uri = this.apiHelper.uri;
  }

  ngOnInit() {}

  register() {
    const formData = new FormData();
    formData.append('name', this.name);
    formData.append('email', this.email);
    formData.append('password', this.password);
    formData.append('password_confirmation', this.password_confirmation);

    this.http.post(`${this.uri}/register`, formData).subscribe(
      (response) => {
        // Manejar la respuesta exitosa
      },
      (error) => {
        // Manejar el error
      }
    );
  }
}
