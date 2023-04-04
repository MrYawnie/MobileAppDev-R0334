import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { AvatarService } from '../services/avatar.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  profile: any;

  constructor(
    private auth: AuthService,
    private router: Router,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private avatar: AvatarService
  ) {
    this.avatar.getUserProfile().subscribe(data => {
      this.profile = data;
    });
  }

  async logout() {
    const loading = await this.loadingCtrl.create();
    await loading.present();

    await this.auth.logout();
    await loading.dismiss();

    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  async changeImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos,
    });
    console.log(image);
    
    if (image) {
      const loading = await this.loadingCtrl.create();
      await loading.present();

      const result = await this.avatar.uploadImage(image);
      await loading.dismiss();

      if (!result) {
        const alert = await this.alertCtrl.create({
          header: 'Upload failed',
          message: 'Please try again.',
          buttons: ['OK']
        });
        await alert.present();
      }
    }
  }

}
