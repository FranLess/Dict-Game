import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
interface colorInterface {
  color:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'light'
    | 'medium'
    | 'dark';
}
@Injectable({
  providedIn: 'root',
})
export class AlertHelperService {
  constructor(
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  async presentAlert(header: string, subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
  async presentToast(
    message: string,
    position: 'top' | 'middle' | 'bottom',
    color: colorInterface['color']
  ) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: position,
      color: color,
    });

    await toast.present();
  }
}
