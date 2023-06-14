import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../services/users/user-api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  public users: any;
  public usersLoaded: boolean = false;

  public lastPage: any;
  public page: any;

  constructor(private userService: UserApiService) {}

  ngOnInit() {
    this.getUsers();
  }

  async getUsers() {
    const data = await this.userService.getUsers();
    this.users = data.data;
    this.lastPage = data.meta.last_page;

    console.log(data);
    this.usersLoaded = true;
  }

  async showUser(id: number) {
    this.userService.showUser(id);
  }

  nextPage() {
    if (this.page < this.lastPage) {
      this.page++;
      this.getUsers();
    }
  }
  backPage() {
    if (this.page > 1) {
      this.page--;
      this.getUsers();
    }
  }
}
