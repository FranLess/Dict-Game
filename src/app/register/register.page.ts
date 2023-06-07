import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

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

  constructor(private http: HttpClient, private platform: Platform) {
    this.platform.is('mobile')
      ? (this.uri = 'http://dictgame.000webhostapp.com')
      : (this.uri = 'http://127.0.0.1:8000');
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

  profiles() {
    this.http.get(`${this.uri}/api/profiles`).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }

  home() {
    this.http.get(`${this.uri}`).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }
}
