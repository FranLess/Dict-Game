import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/home']);
  }

  goLogin() {
    this.router.navigate(['/login']);
  }

  goProfile() {
    this.router.navigate(['/profile']);
  }

  goRegister() {
    this.router.navigate(['/register']);
  }

  goPost(id: number) {
    this.router.navigate(['/post', id]);
  }
}
