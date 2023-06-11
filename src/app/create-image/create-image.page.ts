import { Component, OnInit } from '@angular/core';
import { ImageApiService } from '../services/images/image-api.service';

@Component({
  selector: 'app-create-image',
  templateUrl: './create-image.page.html',
  styleUrls: ['./create-image.page.scss'],
})
export class CreateImagePage implements OnInit {
  public image: any;

  constructor(private imageService: ImageApiService) {}

  create() {
    console.log(this.image);
    this.imageService.store(this.image);
  }
  ngOnInit() {}
}
