import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../services/users/user-api.service';
import { ApiHelperService } from '../services/helpers/api-helper.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertHelperService } from '../services/helpers/alert/alert-helper.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {
  public profile: any;
  public profileLoaded: boolean = false;
  public dateShow: boolean = false;
  public countries: any;
  public levels: any;
  public sentimentals: any;

  public image: any;
  public sImage: any;
  public safeSImmage: any;

  public imageHeader: any;
  public sImageHeader: any;
  public safeSImmageHeader: any;

  constructor(
    private userService: UserApiService,
    private apiHelper: ApiHelperService,
    private sanitizer: DomSanitizer,
    private alertHelper: AlertHelperService
  ) {}

  ngOnInit() {
    this.getProfileData();
  }

  imageChange(event: any) {
    this.image = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.sImage = reader.result;
      this.safeSImmage = this.sanitizer.bypassSecurityTrustUrl(
        this.sImage as string
      );
    };

    console.log(this.image);
    this.profile.image = this.image;
    reader.readAsDataURL(this.image);
  }

  imageHeaderChange(event: any) {
    this.imageHeader = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.sImageHeader = reader.result;
      this.safeSImmageHeader = this.sanitizer.bypassSecurityTrustUrl(
        this.sImageHeader as string
      );
    };

    this.profile.image_header = this.imageHeader;
    console.log(this.imageHeader);
    reader.readAsDataURL(this.imageHeader);
  }

  async getProfileData() {
    this.profile = await this.userService.getCurrentProfile();
    this.countries = await this.apiHelper.getCountryList();
    this.levels = await this.apiHelper.getLevelList();
    this.sentimentals = await this.apiHelper.getSentimentalList();

    this.profile.country_id = 1;
    this.profile.level_id = 1;
    this.profile.sentimental_id = 1;
    console.log(this.profile);
    this.profileLoaded = true;
  }

  async save() {
    this.userService
      .saveProfile(this.profile)
      .then((res) => {
        this.alertHelper.presentAlert(
          'Guardado',
          '',
          'perfil guardado exitosamente'
        );
      })
      .catch((error) => console.log(error));
    await this.getProfileData();
  }
}
