import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';
import { ApiHelperService } from '../services/helpers/api-helper.service';
import { UserApiService } from '../services/users/user-api.service';
import { RouterService } from '../services/router/router.service';
import { AlertHelperService } from '../services/helpers/alert/alert-helper.service';

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
    private apiHelper: ApiHelperService,
    private menuController: MenuController,
    private userService: UserApiService,
    private routerService: RouterService,
    private alertHelper: AlertHelperService
  ) {
    this.uri = this.apiHelper.uri;
  }

  ngOnInit() {
    this.menuController.enable(false);
  }

  register() {
    this.userService
      .register(
        this.name,
        this.email,
        this.password,
        this.password_confirmation
      )
      .then((res) => this.routerService.goLogin())
      .then((res) =>
        this.alertHelper.presentToast('usuario registrado', 'bottom', 'success')
      )
      .catch((error) => {
        console.log(error);
        this.alertHelper.presentAlert('Error', '', error.error.message);
      });
  }
}
