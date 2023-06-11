import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiHelperService } from '../services/helpers/api-helper.service';
import { RouterService } from '../services/router/router.service';
import { UserApiService } from '../services/users/user-api.service';
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
    private routerService: RouterService
  ) {}

  ngOnInit() {}

  async login() {
    await this.userService.login(this.email, this.password);
    this.routerService.goHome();
  }
}
