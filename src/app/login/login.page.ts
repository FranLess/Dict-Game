import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiHelperService } from '../services/helpers/api-helper.service';
import { RouterService } from '../services/router/router.service';
import { UserApiService } from '../services/users/user-api.service';
import { AlertController, MenuController } from '@ionic/angular';
// import { Storage } from '@capacitor/storage';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public email: string = '';
  public password: string = '';

  public data = [];

  constructor(
    private userService: UserApiService,
    private routerService: RouterService,
    private alertController: AlertController,
    private menuController: MenuController
  ) {}

  ngOnInit() {
    this.menuController.enable(false);
  }

  async login() {
    this.userService
      .login(this.email, this.password)
      .then((res) => {
        this.userService.createProfile();
        this.menuController.enable(true);
      })
      .then((res) => this.routerService.goProfile())
      .catch((error: any) => this.presentAlert(error.error));
  }

  async presentAlert(messages: any) {
    let message = '';
    if (messages.errors) {
      // Iterar sobre los errores y mostrar los mensajes
      for (const field in messages.errors) {
        if (messages.errors.hasOwnProperty(field)) {
          let errorMessages: any = messages.errors[field];
          message += `Error en ${field}: ${errorMessages}\n\n    `;
        }
      }
    } else {
      console.error('Error desconocido:', messages.message);
    }
    const alert = await this.alertController.create({
      header: 'Error',
      subHeader: 'Can not login',
      message: `${message}`,
      buttons: ['OK'],
    });

    await alert.present();
  }

  // show an alert to say the login failed
}
