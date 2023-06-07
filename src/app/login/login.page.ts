import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public email: string = 'francisco@gmail.com';
  public password: string = 'francisco123';

  constructor(private http: HttpClient) {}

  login() {
    const formData = new FormData();
    formData.append('email', this.email);
    formData.append('password', this.password);

    fetch('http://dictgame.000webhostapp.com/login', {
      method: 'POST',
      headers: {
        // 'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: formData,
    });
  }

  // login() {
  //   const url = 'http://dictgame.000webhostapp.com/login';
  //   const body = {
  //     email: this.email,
  //     password: this.password,
  //   };

  //   this.http
  //     .post(url, body, {
  //       headers: {
  //         Accept: 'application/json',
  //         'Keep-Alive': 'timeout=560',
  //       },
  //     })
  //     .subscribe(
  //       (response) => {
  //         // Manejar la respuesta aquí
  //       },
  //       (error) => {
  //         // Manejar el error aquí
  //       }
  //     );
  // }

  // const url = 'http://dictgame.000webhostapp.com/login';
  // const headers = new HttpHeaders({
  //   'Access-Control-Allow-Origin': '*',
  // });

  // this.http.post(url, {}, { headers }).subscribe(
  //   (response) => {
  //     console.log(response);
  //     // Manejar la respuesta aquí
  //   },
  //   (error) => {
  //     console.log(error);
  //     // Manejar el error aquí
  //   }
  // );

  getUser() {
    this.http.get('http://dictgame.000webhostapp.com/api/user').subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }

  confirmPassword() {
    this.http
      .post('http://dictgame.000webhostapp.com/user/confirm-password', {
        password: this.password,
      })
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  }

  ngOnInit() {}
}
