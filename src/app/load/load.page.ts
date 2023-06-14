import { Component, OnInit } from '@angular/core';
import { RouterService } from '../services/router/router.service';

@Component({
  selector: 'app-load',
  templateUrl: './load.page.html',
  styleUrls: ['./load.page.scss'],
})
export class LoadPage implements OnInit {
  constructor(private routerService: RouterService) {}

  ngOnInit() {
    setTimeout(() => {
      this.routerService.goLogin();
    }, 4 * 1000);
  }
}
